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
            @click="reserve(i)"
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
            <p v-if="!complete[String(i)]" class="text-center">Click me</p>
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
    }),
    async mounted() {
      await this.getTasks();
      this.length = Math.ceil(this.tasks.length / this.pageSize);
      this.displayList = this.tasks.slice(0, this.pageSize);

      this.isDisplayTasksCompeted();
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
      async reserve(i) {
        this.loading[String(i)] = true;
        this.nowLoading = true;
        const time = new Date().getTime() / 1000;
        console.log(time);
        this.complete[String(i)] = true;

        // await axios
        //   .put(
        //     "/api/v1/tasks/",
        //     {
        //       task: {
        //         last_time: time,
        //       },
        //     },
        //     {
        //       headers: {
        //         "access-token": this.$cookies.get("access-token"),
        //         client: this.$cookies.get("client"),
        //         uid: this.$cookies.get("uid"),
        //       },
        //     }
        //   )
        //   .then((response) => {
        //     console.log(response);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //     console.error(error.response);
        //     this.errorMessage = error.response.data.errors[0];
        //     console.error(this.errorMessage);
        //   });

        setTimeout(() => (this.loading[String(i)] = false), 2000);
        setTimeout(() => (this.nowLoading = false), 2000);
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
