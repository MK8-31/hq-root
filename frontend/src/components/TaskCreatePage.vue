<template>
  <div>
    <h1 class="text-center mt-5 mb-5">タスク作成</h1>
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
              v-model="taskName"
              label="タスク名"
              required
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>

          <v-btn
            color="primary"
            class="mr-4"
            @click="createTask"
            :disabled="invalid"
          >
            <v-icon>mdi-plus</v-icon>作成
          </v-btn>
          <br />
          <v-btn link class="mt-5" color="info" to="/task_list"
            >リストに戻る</v-btn
          >
        </v-form>
      </validation-observer>
    </v-card>
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
      taskName: "",
      errorMessage: "",
    }),
    methods: {
      /**
       * タスクを作成するための関数です
       */
      async createTask() {
        await axios
          .post(
            "/api/v1/tasks",
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
            console.log(response);
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
