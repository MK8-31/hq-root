<template>
  <div>
    <h1 class="text-center mt-5 mb-5">タスク</h1>
    <v-card class="mx-auto px-5 py-5" max-width="500">
      <h2 id="taskName">{{ task.name }}</h2>

      <v-btn
        id="updateOrDelete"
        class="mt-5 mr-4"
        color="primary"
        link
        :to="'/task_edit/' + taskId"
      >
        <v-icon>mdi-cached</v-icon>更新 or <v-icon>mdi-delete</v-icon>削除
      </v-btn>
      <v-btn id="backToList" class="mt-5" link color="info" to="/task_list"
        >リストに戻る</v-btn
      >
    </v-card>
  </div>
</template>

<script>
  import axios from "axios";

  // taskのパラメータを表示したりする
  // 継続日数など

  export default {
    data: () => ({
      task: {},
      taskId: 0,
    }),
    mounted() {
      if (
        this.$store.getters.getTasks.length == 0 ||
        !this.$route.params["id"]
      ) {
        this.$router.push("/task_list");
      } else {
        // paramからタスクのIDを取得(文字列であることに注意)
        this.taskId = Number(this.$route.params["id"]);
        // vuexのストアからタスクIDでタスクを取得する
        this.task = this.$store.getters.getTaskFromId(this.taskId);
        // console.log(this.task);
      }
    },
    computed: {
      isSameTaskName() {
        return this.task.name === this.taskName;
      },
    },
    methods: {
      /**
       * タスクを編集するための関数です
       */
      async updateTask() {
        await axios
          .put(
            `/api/v1/tasks/${this.task.id}`,
            {
              task: {
                name: this.taskName,
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
            // console.log(response);
            this.$router.push("/task_list");
          })
          .catch((error) => {
            console.error(error);
            console.error(error.response);
            this.errorMessage = error.response.data.errors[0];
            console.error(this.errorMessage);
          });
      },
      /**
       * タスクを削除するための関数です
       */
      async deleteTask() {
        await axios
          .delete(`/api/v1/tasks/${this.task.id}`, {
            headers: {
              "access-token": this.$cookies.get("access-token"),
              client: this.$cookies.get("client"),
              uid: this.$cookies.get("uid"),
            },
          })
          .then((response) => {
            // console.log(response);
            this.$router.push("/task_list");
          })
          .catch((error) => {
            console.error(error);
            console.error(error.response);
            this.errorMessage = error.response.data.errors[0];
            console.error(this.errorMessage);
          });
      },
    },
  };
</script>
