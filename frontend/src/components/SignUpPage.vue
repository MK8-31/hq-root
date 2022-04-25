<template>
  <v-card width="400px" class="mx-auto mt-5">
    <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
    <v-card-title>
      <h1 class="display-1">ユーザー登録</h1>
    </v-card-title>
    <v-card-text>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form>
          <ValidationProvider
            ref="observer"
            v-slot="{ errors }"
            rules="required"
            name="ニックネーム"
          >
            <v-text-field
              v-model="nickname"
              prepend-icon="mdi-card-account-details-outline"
              type="email"
              label="ニックネーム"
              required
              :error-messages="errors"
            />
          </ValidationProvider>
          <ValidationProvider
            ref="observer"
            v-slot="{ errors }"
            rules="required|email"
            name="メールアドレス"
          >
            <v-text-field
              v-model="email"
              prepend-icon="mdi-email"
              type="email"
              label="メールアドレス"
              required
              :error-messages="errors"
            />
          </ValidationProvider>
          <ValidationProvider
            ref="observer"
            v-slot="{ errors }"
            rules="required|min:6|max:30"
            name="パスワード"
          >
            <v-text-field
              v-model="password"
              @click:append="showPassword = !showPassword"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="パスワード"
              required
              :error-messages="errors"
            />
          </ValidationProvider>
          <v-card-actions>
            <v-btn class="info" @click="submit()" :disabled="invalid"
              >登録</v-btn
            >
          </v-card-actions>
        </v-form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
  import axios from "axios";
  import {
    extend,
    ValidationObserver,
    ValidationProvider,
    localize,
  } from "vee-validate";
  import { max, min, required, email } from "vee-validate/dist/rules";
  import ja from "vee-validate/dist/locale/ja";

  localize("ja", ja);
  extend("max", max);
  extend("min", min);
  extend("required", required);
  extend("email", email);

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      showPassword: false,
      nickname: "",
      email: "",
      password: "",
      invalid: false,
      errorMessage: "",
    }),
    methods: {
      async submit() {
        console.log(this.nickname, this.email, this.password);
        await axios
          .post("/api/v1/auth", {
            nickname: this.nickname,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            console.log(response);
            this.$cookies.set("access-token", response.headers["access-token"]);
            this.$cookies.set("client", response.headers["client"]);
            this.$cookies.set("uid", decodeURI(response.headers["uid"]));
            this.$router.push("/");
          })
          .catch((error) => {
            this.errorMessage = "";
            console.error(error);
            console.error(error.response);
            error.response.data.errors.forEach((error) => {
              console.error(error);
            });
            error.response.data.errors.forEach((error) => {
              this.errorMessage += error;
              this.errorMessage += "\n";
            });
          });
      },
    },
  };
</script>
