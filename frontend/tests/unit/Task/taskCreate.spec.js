import flushPromises from "flush-promises";
import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
const { required } = require("vee-validate/dist/rules.umd");
extend("required", required);
import axios from "axios";
import TaskCreatePage from "@/components/Task/TaskCreatePage";
import { config } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

// jest.mock("axios", () => {
//   get: jest.fn((url, body) => {

//   })
// })

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
axios.post.mockResolvedValue(response);

const cookies = jest.mock("vue-cookies", () => {
  get: jest.fn((key) => {
    if (key === "access-token") {
      return "access-token";
    }
    if (key === "client") {
      return "client";
    }

    if (key === "uid") {
      return "uid";
    }
  });
});

describe("TaskCreatePage", () => {
  const localVue = createLocalVue();
  localVue.component("ValidationObserver", ValidationObserver);
  localVue.component("ValidationProvider", ValidationProvider);
  localVue.use(Vuex);
  localVue.use(VueRouter);
  let vuetify;
  let store;
  let mutations;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    config.mocks["$cookies"] = {
      get: jest.fn().mockReturnValue("access-token-etc"),
    };
    mutations = {
      setTasks(state, value) {
        state.tasks = value;
      },
    };
    store = new Vuex.Store({
      mutations,
    });
    router = new VueRouter();
  });

  it("タスク名を入力する欄がある", async () => {
    const wrapper = mount(TaskCreatePage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();

    const taskNameInput = wrapper.find("#taskName");

    taskNameInput.setValue("英語の勉強");

    expect(wrapper.vm.$data.taskName).toBe("英語の勉強");
  });

  it("タスク名がない場合にエラー表示", async () => {
    const wrapper = mount(TaskCreatePage, {
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

  it("タスク名を入力して作成ボタンをクリックするとタスクを作成し、TaskListPageに遷移", async () => {
    const wrapper = mount(TaskCreatePage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();

    const taskNameInput = wrapper.find("#taskName");
    const submit = wrapper.find("#submit");

    taskNameInput.setValue("筋トレをする");
    submit.trigger("click");

    await flushPromises();

    expect(wrapper.vm.$route.path).toBe("/task_list");
  });

  it("リストに戻るボタンをクリックするとTaskListPageに遷移", async () => {
    const wrapper = mount(TaskCreatePage, {
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
