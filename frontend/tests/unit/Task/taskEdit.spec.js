import flushPromises from "flush-promises";
import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
const { required } = require("vee-validate/dist/rules.umd");
extend("required", required);
import axios from "axios";
import TaskEditPage from "@/components/Task/TaskEditPage";
import { config } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

const response = {
  data: {
    status: "SUCCESS",
    data: {
      id: 26,
      name: "筋トレをする",
      day: 0,
      week: 0,
      days_a_week: 0,
      running_days: 0,
      running_weeks: 0,
      last_time: null,
      user_id: 23,
      created_at: "2022-05-06T10:09:43.082Z",
      updated_at: "2022-05-06T10:09:43.082Z",
    },
  },
  status: 200,
  statusText: "OK",
  headers: {
    "access-token": "6M6TYIyPUpzF5kbqFVlltg",
    "cache-control": "max-age=0, private, must-revalidate",
    client: "pg3sLFumGAD4m53gfghc8w",
    "content-type": "application/json; charset=utf-8",
    expiry: "1653041180",
    "token-type": "Bearer",
    uid: "a@a.com",
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "access-token": "6M6TYIyPUpzF5kbqFVlltg",
      client: "pg3sLFumGAD4m53gfghc8w",
      uid: "a@a.com",
    },
    baseURL: "http://localhost:3030",
    method: "post",
    url: "/api/v1/tasks",
    data: '{"task":{"name":"筋トレをする"}}',
  },
  request: {},
};

jest.mock("axios");
axios.put.mockResolvedValue(response);
axios.delete.mockResolvedValue(response);

describe("TaskEditPage", () => {
  const localVue = createLocalVue();
  localVue.component("ValidationObserver", ValidationObserver);
  localVue.component("ValidationProvider", ValidationProvider);
  localVue.use(Vuex);
  localVue.use(VueRouter);
  let vuetify;
  let store;
  let state;
  let getters;
  let mutations;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    config.mocks["$cookies"] = {
      get: jest.fn().mockReturnValue("access-token-etc"),
    };
    state = {
      tasks: [
        {
          id: 6,
          name: "にるじょうだんたいやく。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 6,
          created_at: "2022-05-03T22:46:32.960Z",
          updated_at: "2022-05-03T22:46:32.960Z",
        },
        {
          id: 7,
          name: "芸者殻たくす。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 7,
          created_at: "2022-05-03T22:46:32.968Z",
          updated_at: "2022-05-03T22:46:32.968Z",
        },
        {
          id: 9,
          name: "魔術絹糸原油。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 9,
          created_at: "2022-05-03T22:46:32.984Z",
          updated_at: "2022-05-03T22:46:32.984Z",
        },
        {
          id: 10,
          name: "めいし手作り勇気。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 10,
          created_at: "2022-05-03T22:46:32.991Z",
          updated_at: "2022-05-03T22:46:32.991Z",
        },
        {
          id: 11,
          name: "さいぼう揺さぶるとめる。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 11,
          created_at: "2022-05-03T22:46:32.998Z",
          updated_at: "2022-05-03T22:46:32.998Z",
        },
        {
          id: 12,
          name: "ふそく評価白菊。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 12,
          created_at: "2022-05-03T22:46:33.007Z",
          updated_at: "2022-05-03T22:46:33.007Z",
        },
        {
          id: 13,
          name: "にるじょうだんたいやく。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 6,
          created_at: "2022-05-03T22:46:32.960Z",
          updated_at: "2022-05-03T22:46:32.960Z",
        },
        {
          id: 14,
          name: "芸者殻たくす。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 7,
          created_at: "2022-05-03T22:46:32.968Z",
          updated_at: "2022-05-03T22:46:32.968Z",
        },
        {
          id: 15,
          name: "魔術絹糸原油。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 9,
          created_at: "2022-05-03T22:46:32.984Z",
          updated_at: "2022-05-03T22:46:32.984Z",
        },
        {
          id: 16,
          name: "めいし手作り勇気。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 10,
          created_at: "2022-05-03T22:46:32.991Z",
          updated_at: "2022-05-03T22:46:32.991Z",
        },
        {
          id: 17,
          name: "さいぼう揺さぶるとめる。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 11,
          created_at: "2022-05-03T22:46:32.998Z",
          updated_at: "2022-05-03T22:46:32.998Z",
        },
        {
          id: 18,
          name: "ふそく評価白菊。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 12,
          created_at: "2022-05-03T22:46:33.007Z",
          updated_at: "2022-05-03T22:46:33.007Z",
        },
      ],
    };
    getters = {
      getTaskFromId: (state) => (task_id) => {
        let targetTask = {};
        state.tasks.forEach((task) => {
          if (task.id === task_id) {
            // console.log(true);
            targetTask = task;
          }
        });

        return targetTask;
      },
      getTasks(state) {
        return state.tasks;
      },
    };
    mutations = {
      setTasks(state, value) {
        state.tasks = value;
      },
    };
    store = new Vuex.Store({
      state,
      getters,
      mutations,
    });
    router = new VueRouter({
      routes: [
        {
          name: "taskEdit",
          path: "/task_edit/:id",
          component: TaskEditPage,
        },
      ],
    });
    router.push({ name: "taskEdit", params: { id: 7 } });
  });

  it("タスク名がある", async () => {
    const wrapper = mount(TaskEditPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();

    expect(wrapper.vm.$data.taskName).toBe("芸者殻たくす。");
  });

  it("タスク名を入力する欄がある", async () => {
    const wrapper = mount(TaskEditPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();

    const taskNameInput = wrapper.find("#taskName");

    // console.log(taskNameInput.element.value);

    expect(taskNameInput.element.value).toBe("芸者殻たくす。");
  });

  it("タスク名がない場合にエラー表示", async () => {
    const wrapper = mount(TaskEditPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    const taskNameInput = wrapper.find("#taskName");

    taskNameInput.setValue("");

    await flushPromises();

    await flushPromises();
    const error = wrapper.findAll(".v-messages").at(0);

    expect(error.text()).toBe("タスク名は必須項目です");
  });

  it("タスク名を変更して更新ボタンをクリックするとタスクを更新し、TaskListPageに遷移", async () => {
    const wrapper = mount(TaskEditPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();

    const taskNameInput = wrapper.find("#taskName");

    taskNameInput.setValue("筋トレをする");
    await flushPromises();
    const updateTask = wrapper.find("#updateTask");
    updateTask.trigger("click");

    await flushPromises();

    expect(wrapper.vm.$route.path).toBe("/task_list");
  });

  it("削除ボタンをクリックしてOKをクリックするとタスクを削除し、TaskListPageに遷移", async () => {
    const wrapper = mount(TaskEditPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();

    const taskNameInput = wrapper.find("#taskName");
    const deleteTask = wrapper.find("#deleteTask");

    taskNameInput.setValue("筋トレをする");
    deleteTask.trigger("click");

    await flushPromises();

    const ok = wrapper.find("#ok");
    ok.trigger("click");

    await flushPromises();

    expect(wrapper.vm.$route.path).toBe("/task_list");
  });

  it("戻るボタンをクリックするとTaskPageに遷移", async () => {
    const wrapper = mount(TaskEditPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();

    const backBtn = wrapper.find("#back");
    backBtn.trigger("click");
    await flushPromises();
    expect(wrapper.vm.$route.path).toBe("/task/7");
  });

  it("リストに戻るボタンをクリックするとTaskListPageに遷移", async () => {
    const wrapper = mount(TaskEditPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    const backToListBtn = wrapper.find("#backToList");
    backToListBtn.trigger("click");
    await flushPromises();
    expect(wrapper.vm.$route.path).toBe("/task_list");
  });
});
