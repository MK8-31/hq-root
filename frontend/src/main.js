import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Axios from "axios";
import VueRouter from "vue-router";

import HomePage from "@/components/HomePage.vue";
import LoginPage from "@/components/LoginPage.vue";

Axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "http://backend.habituation-quest.tk"
    : "http://localhost:3030";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
];

const router = new VueRouter({
  routes,
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
  router: router,
}).$mount("#app");
