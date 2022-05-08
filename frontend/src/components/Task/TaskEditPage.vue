<template>
  <div>
    <h1 class="text-center mt-5 mb-5">タスク編集</h1>
    <v-card class="mx-auto px-5 py-5" max-width="500">
      <v-alert id="error-message" v-if="errorMessage" type="error">{{
        errorMessage
      }}</v-alert>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form ref="form" width="400">
          <validation-provider
            v-slot="{ errors }"
            name="タスク名"
            rules="required|max:30"
          >
            <v-text-field
              id="taskName"
              v-model="taskName"
              label="タスク名"
              required
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>

          <v-btn
            id="updateTask"
            color="primary"
            class="mr-4"
            @click="updateTask"
            :disabled="(isSameTaskName || invalid)"
          >
            <v-icon>mdi-cached</v-icon>更新
          </v-btn>
          <v-btn id="deleteTask" color="error" @click="deleteDialog = true"
            ><v-icon>mdi-delete</v-icon>削除</v-btn
          >
          <br />
          <v-btn
            id="back"
            link
            class="mt-5 mr-4"
            color="info"
            :to="'/task/' + taskId"
            >戻る</v-btn
          >
          <v-btn id="backToList" link class="mt-5" color="info" to="/task_list"
            >リストに戻る</v-btn
          >
        </v-form>
      </validation-observer>
    </v-card>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>
          <div>タスク削除</div>
        </v-card-title>
        <v-card-text>
          <p>タスク名: {{ task.name }} を削除しますか？</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn id="cancel" color="primary" @click="deleteDialog = false"
            >Cancel</v-btn
          >
          <v-btn id="ok" color="error" @click="deleteTask()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import axios from "axios";
  import {
    extend,
    ValidationObserver,
    ValidationProvider,
    localize,
  } from "vee-validate";
  import { max } from "vee-validate/dist/rules";
  import ja from "vee-validate/dist/locale/ja";

  localize("ja", ja);
  extend("max", max);

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      taskId: 0,
      task: {},
      taskName: "",
      errorMessage: "",
      deleteDialog: false,
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
        this.taskName = this.task.name;
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
          .then(() => {
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
          .then(() => {
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
