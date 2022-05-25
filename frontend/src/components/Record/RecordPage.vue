<template>
  <div>
    <h1 class="text-center mt-5 mb-5">記録</h1>

    <v-card class="mx-auto pb-5 mb-5" max-width="1200">
      <v-row>
        <!-- 右の隙間の原因2 -->

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
            @click="
              complete[String(i)]
                ? ((cancel.dialog = true),
                  (cancel.taskId = task.id),
                  (cancel.index = i))
                : record(i, task.id)
            "
            outlined
            min-width="240"
            min-height="240"
            max-width="500"
            height="100%"
            class="d-flex flex-column"
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
            <!-- 右の隙間の原因１ -->
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
    <v-dialog v-model="cancel.dialog" max-width="400">
      <v-card>
        <v-alert id="error-message" v-if="errorMessage" type="error">{{
          errorMessage
        }}</v-alert>
        <v-card-title>
          <div>記録取り消し</div>
        </v-card-title>
        <v-card-text>
          <p>記録を取り消しますか？</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel.dialog = false">閉じる</v-btn>
          <v-btn color="error" @click="cancelRecord()">OK</v-btn>
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
      cancel: {
        dialog: false,
        taskId: 0,
        index: 0,
      },
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
            console.log(response);

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
      async cancelRecord() {
        this.loading[String(this.cancel.index)] = true;
        this.nowLoading = true;

        console.log(this.cancel.taskId, this.cancel.index);

        await axios
          .delete(`/api/v1/task_records/${this.cancel.taskId}`, {
            headers: {
              "access-token": this.$cookies.get("access-token"),
              client: this.$cookies.get("client"),
              uid: this.$cookies.get("uid"),
            },
          })
          .then((response) => {
            console.log(response);
            this.cancel.dialog = false;

            this.complete[String(this.cancel.index)] = false;
          })
          .catch((error) => {
            console.error(error);
            console.error(error.response);
            this.errorMessage = error.response.data.errors
              ? error.response.data.errors[0]
              : error.response.data.message;
            console.error(this.errorMessage);
          });

        this.loading[String(this.cancel.index)] = false;
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
