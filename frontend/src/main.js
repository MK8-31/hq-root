import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Axios from "axios";
import VueCookies from "vue-cookies";
import store from "./store/store";
// この書き方じゃないとエラー
import * as VeeValidate from "vee-validate";
import ja from "vee-validate/dist/locale/ja";
import { localize } from "vee-validate";
import router from "./router/router";

Vue.config.productionTip = false;
localize("ja", ja);
Vue.use(VeeValidate, { locale: ja });

Vue.use(VueCookies);

// 開発環境と本番環境で接続先を変更する
Axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "http://backend.habituation-quest.tk"
    : "http://localhost:3030";

router.beforeEach((to, from, next) => {
  // ログインに必要なトークンがあるかどうか確認
  const accessToken = VueCookies.get("access-token");
  const client = VueCookies.get("client");
  const uid = VueCookies.get("uid");
  if (accessToken && client && uid) {
    store.commit(
      "setRequestHeadersRequiredToMaintainLoginStatus",
      accessToken,
      client,
      uid
    );
    store.commit("setLoggedIn", true);
  }
  // isPublic でない場合(=認証が必要な場合)、かつ、ログインしていない場合
  if (
    to.matched.some((record) => !record.meta.isPublic) &&
    !store.getters.getLoggedIn
  ) {
    // queryはログイン後の遷移などに使用できる
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

new Vue({
  vuetify,
  render: (h) => h(App),
  router: router,
  store,
}).$mount("#app");
