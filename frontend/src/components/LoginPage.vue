<template>
  <v-card width="400px" class="mx-auto mt-5">
    <v-alert id="error-message" v-if="errorMessage" type="error">{{
      errorMessage
    }}</v-alert>
    <v-card-title>
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form>
          <ValidationProvider
            id="email-error"
            ref="observer"
            v-slot="{ errors }"
            rules="required|email"
            name="メールアドレス"
          >
            <v-text-field
              id="email-field"
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
              id="password-field"
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
            <v-btn
              id="submit"
              class="info"
              @click="submit()"
              :disabled="invalid"
              >ログイン</v-btn
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
      email: "",
      password: "",
      invalid: true,
      errorMessage: "",
      login: false,
    }),
    computed: {
      loggedIn() {
        return this.$store.getters.getLoggedIn;
      },
    },
    methods: {
      /**
       * ログインをする関数
       */
      async submit() {
        // console.log(this.email, this.password);
        await axios
          .post("/api/v1/auth/sign_in", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.login = true;
            // console.log("ログイン成功");
            // console.log(response);
            // クッキーにログイン保持に必要なヘッダー情報を保存
            this.$cookies.set("access-token", response.headers["access-token"]);
            this.$cookies.set("client", response.headers["client"]);
            this.$cookies.set("uid", decodeURI(response.headers["uid"]));
            // vuexにログイン保持に必要なヘッダー情報を保存
            this.$store.commit(
              "setRequestHeadersRequiredToMaintainLoginStatus",
              response.headers["access-token"],
              response.headers["client"],
              decodeURI(response.headers["uid"])
            );
            this.$store.commit("setLoggedIn", true);
            this.$router.push("/");
          })
          .catch((error) => {
            this.errorMessage =
              "メールアドレスとパスワードの組み合わせが正しくありません。";
            console.error(error);
            console.error(error.response);
            error.response.data.errors.forEach((error) => {
              console.error(error);
            });
          });
      },
    },
  };
</script>
