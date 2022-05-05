<template>
  <div>
    <h1 class="text-center mt-5 mb-5">タスクリスト</h1>

    <v-card class="mx-auto" max-width="500">
      <v-btn class="mt-5 mb-5 ml-5" color="primary" link to="/task_create">
        <v-icon>mdi-plus</v-icon> タスク作成</v-btn
      >

      <v-list flat outline>
        <v-list-item-group>
          <v-list-item
            v-for="(task, i) in displayList"
            :key="i"
            link
            :to="'task/' + task.id"
          >
            <v-list-item-icon>
              <v-icon>mdi-clipboard-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="task.name"></v-list-item-title>
            </v-list-item-content>
            <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-pagination
        v-model="page"
        :length="length"
        @input="pageChange"
      ></v-pagination>
    </v-card>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data: () => ({
      /**
       * @type {number} ページネーションのページを指定
       */
      page: 1,
      /**
       * @type {number} ページネーションの一ページあたりに入れるタスクの数を指定
       */
      pageSize: 7,
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
    }),
    async mounted() {
      await this.getTasks();
      this.length = Math.ceil(this.tasks.length / this.pageSize);
      this.displayList = this.tasks.slice(0, this.pageSize);
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
            // console.log(response);
            this.tasks = response.data.data;
            this.$store.commit("setTasks", response.data.data);
            // console.log(this.tasks);
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
      },
    },
  };
</script>
