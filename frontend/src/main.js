import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Axios from "axios";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";
import Vuex from "vuex";
import store from "./store/store";

Vue.use(Vuex);

Vue.use(VueCookies);

import HomePage from "@/components/HomePage.vue";
import LoginPage from "@/components/LoginPage.vue";
import LogoutPage from "@/components/LogoutPage.vue";
import SignUpPage from "@/components/SignUpPage.vue";
import HelpPage from "@/components/HelpPage.vue";
import AccountPage from "@/components/AccountPage.vue";
import RecordPage from "@/components/RecordPage.vue";
import ShowRecordPage from "@/components/ShowRecordPage.vue";
import ClassChangePage from "@/components/ClassChangePage.vue";

Axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "http://backend.habituation-quest.tk"
    : "http://localhost:3030";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/logout", component: LogoutPage },
  { path: "/signup", component: SignUpPage },
  { path: "/help", component: HelpPage },
  { path: "/account", component: AccountPage },
  { path: "/record", component: RecordPage },
  { path: "/show_record", component: ShowRecordPage },
  { path: "/class_change", component: ClassChangePage },
];

const router = new VueRouter({
  routes,
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
  router: router,
  store,
}).$mount("#app");
