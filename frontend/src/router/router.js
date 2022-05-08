import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "@/components/HomePage.vue";
import LoginPage from "@/components/LoginPage.vue";
import LogoutPage from "@/components/LogoutPage.vue";
import SignUpPage from "@/components/SignUpPage.vue";
import HelpPage from "@/components/HelpPage.vue";
import AccountPage from "@/components/AccountPage.vue";
import RecordPage from "@/components/Record/RecordPage.vue";
import ShowRecordPage from "@/components/ShowRecordPage.vue";
import ClassChangePage from "@/components/ClassChangePage.vue";
import TaskListPage from "@/components/Task/TaskListPage.vue";
import TaskPage from "@/components/Task/TaskPage.vue";
import TaskCreatePage from "@/components/Task/TaskCreatePage.vue";
import TaskEditPage from "@/components/Task/TaskEditPage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage, meta: { isPublic: true } },
  { path: "/login", component: LoginPage, meta: { isPublic: true } },
  { path: "/logout", component: LogoutPage },
  { path: "/signup", component: SignUpPage, meta: { isPublic: true } },
  { path: "/help", component: HelpPage, meta: { isPublic: true } },
  { path: "/account", component: AccountPage },
  { path: "/record", component: RecordPage },
  { path: "/show_record", component: ShowRecordPage },
  { path: "/class_change", component: ClassChangePage },
  { path: "/task_list", component: TaskListPage },
  { path: "/task/:id", component: TaskPage },
  { path: "/task_create", component: TaskCreatePage },
  { path: "/task_edit/:id", component: TaskEditPage },
];

export default new VueRouter({
  mode: "history",
  routes,
});
