<template>
  <div>
    <h1 class="text-center mt-5 mb-5">記録</h1>

    <v-card class="mx-auto pb-5 mb-5" max-width="1200">
      <v-row>
        <v-col
          v-for="(task, i) in displayList"
          :key="i"
          align="center"
          cols="12"
          sm="12"
          md="6"
          lg="6"
        >
          <v-card
            hover
            :loading="loading[String(i)]"
            @click="complete[String(i)] ? '' : record(i, task.id)"
            outlined
            min-width="240"
            min-height="240"
            max-width="500"
            height="100%"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-card-title class="justify-center" v-text="task.name" />
            <v-spacer />
            <p v-if="!complete[String(i)]" class="text-center">
              Click me
            </p>
            <v-icon
              v-if="complete[String(i)]"
              x-large
              color="success"
              class="mb-5"
              >mdi-check-circle-outline</v-icon
            >
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        :disabled="nowLoading"
        v-model="page"
        :length="length"
        @input="pageChange"
      ></v-pagination>
    </v-card>
    <v-dialog v-model="showResult" max-width="400">
      <v-card>
        <v-card-title>
          <div>経験値獲得</div>
        </v-card-title>
        <v-card-text v-if="isLevelUp" class="text-center mt-5 mb-5">
          <h1 class="primary--text">Level Up!</h1>
        </v-card-text>
        <v-card-text class="text-center mb-5">
          <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="15"
            :value="lv"
            color="primary"
            class="justify-center"
          >
            Lv: {{ lv }}
          </v-progress-circular>
        </v-card-text>
        <v-card-text>
          <v-progress-linear
            color="light-blue"
            height="20"
            :value="rate"
            striped
          >
            Exp: {{ nowLvExp }} / {{ nowLvMaxExp }}
          </v-progress-linear>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showResult = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import axios from "axios";
  import moment from "moment";

  export default {
    data: () => ({
      /**
       * @type {number} ページネーションのページを指定
       */
      page: 1,
      /**
       * @type {number} ページネーションの一ページあたりに入れるタスクの数を指定
       */
      pageSize: 6,
      /**
       * @type {number} ページネーションのページ数を指定
       */
      length: 0,
      /**
       * @type {Array} ユーザのすべてのタスクを格納
       */
      tasks: [],
      /**
       * @type {String} エラーメッセージを格納
       */
      errorMessage: "",
      /**
       * @type {Array} 表示するタスクのリストを格納
       */
      displayList: [],
      loading: {
        "0": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
      },
      nowLoading: false,
      complete: {
        "0": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
      },
      showResult: false,
      lv: 1,
      exp: 0,
      rate: 0,
      nowLvExp: 0,
      nowLvMaxExp: 0,
      isLevelUp: false,
    }),
    async mounted() {
      await this.getTasks();
      this.length = Math.ceil(this.tasks.length / this.pageSize);
      this.displayList = this.tasks.slice(0, this.pageSize);

      this.isDisplayTasksCompeted();
      console.log(this.displayList);
    },
    methods: {
      /**
       * すべてのタスクを取得する関数
       */
      async getTasks() {
        await axios
          .get("/api/v1/tasks", {
            headers: {
              "access-token": this.$cookies.get("access-token"),
              client: this.$cookies.get("client"),
              uid: this.$cookies.get("uid"),
            },
          })
          .then((response) => {
            console.log(response);
            this.tasks = response.data.data;
            this.$store.commit("setTasks", response.data.data);
            // // console.log(this.tasks);
          })
          .catch((error) => {
            console.error(error);
            console.error(error.response);
            this.errorMessage = error.response.data.errors[0];
            console.error(this.errorMessage);
          });
      },
      pageChange(pageNumber) {
        this.displayList = this.tasks.slice(
          this.pageSize * (pageNumber - 1),
          this.pageSize * pageNumber
        );
        this.isDisplayTasksCompeted();
      },
      /**
       * タスク達成を記録する関数
       */
      async record(i, taskId) {
        this.loading[String(i)] = true;
        this.nowLoading = true;

        await axios
          .post(
            "/api/v1/task_records",
            {
              task: {
                id: taskId,
              },
            },
            {
              headers: {
                "access-token": this.$cookies.get("access-token"),
                client: this.$cookies.get("client"),
                uid: this.$cookies.get("uid"),
              },
            }
          )
          .then((response) => {
            this.displayList[i].last_time = moment().format("YYYY-MM-DD");
            console.log(response);
            // 今のレベル
            const lv = response.data.data.level;
            // 累計経験値
            const exp = response.data.data.exp;
            // レベルアップに必要な経験値
            this.nowLvMaxExp = Math.round(12 * 1.5 ** (lv - 1));
            // 今のレベルになってからの経験値
            this.nowLvExp =
              exp - Math.round(12 * ((1 - 1.5 ** (lv - 1)) / (1 - 1.5)));
            this.isLevelUp = response.data.is_level_up;

            this.showResult = true;
            setTimeout(() => {
              this.lv = lv;
              this.exp = exp;
              this.rate = (this.nowLvExp / this.nowLvMaxExp) * 100;
            }, 500);

            this.complete[String(i)] = true;
          })
          .catch((error) => {
            console.error(error);
            console.error(error.response);
            this.errorMessage = error.response.data.errors[0];
            console.error(this.errorMessage);
          });

        this.loading[String(i)] = false;
        this.nowLoading = false;
      },
      /**
       * 表示されているタスクが達成済みかどうかを判断する
       */
      isDisplayTasksCompeted() {
        Object.keys(this.complete).forEach((key) => {
          if (this.displayList[key] === undefined) {
            return;
          }
          const time = moment(this.displayList[key].last_time);

          // taskのlast_timeがnullでない かつ 前回の記録日の日付が今日の日付と同じかどうか
          if (time.isValid() && time.isSame(moment(), "day")) {
            this.complete[key] = true;
          } else {
            this.complete[key] = false;
          }
        });
      },
    },
  };
</script>
<style>
  .v-card--hover {
    margin: 0;
  }
</style>
