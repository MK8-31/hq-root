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
    computed: {},
    methods: {},
  };
</script>
