import TaskListPage from "@/components/Task/TaskListPage";
import flushPromises from "flush-promises";
import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";
import axios from "axios";
import { config } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

const response = {
  data: {
    status: "SUCCESS",
    message: "Loaded tasks",
    data: [
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
  },
  status: 200,
  statusText: "OK",
  headers: {
    "access-token": "I9NJr8jDeN6dl73y99ApVQ",
    "cache-control": "max-age=0, private, must-revalidate",
    client: "mGD-3wBskTzLbEEUyu1XuA",
    "content-type": "application/json; charset=utf-8",
    expiry: "1653010652",
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
      "access-token": "I9NJr8jDeN6dl73y99ApVQ",
      client: "mGD-3wBskTzLbEEUyu1XuA",
      uid: "a@a.com",
    },
    baseURL: "http://localhost:3030",
    method: "get",
    url: "/api/v1/tasks",
  },
  request: {},
};

jest.mock("axios");
axios.get.mockResolvedValue(response);

describe("TaskListPage", () => {
  const localVue = createLocalVue();
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

  it("タスクリストにタスクが表示されている", async () => {
    const wrapper = mount(TaskListPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();

    const itemTitles = wrapper.findAll(".v-list-item__title");
    // 表示するタスクの数はpageSizeによって異なる
    expect(itemTitles.length).toBe(7);
  });

  it("タスクリストにタスク作成ボタンがある", async () => {
    const wrapper = mount(TaskListPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();

    const createTaskBtn = wrapper.find("#createTask");

    expect(createTaskBtn.text()).toBe("タスク作成");
  });

  it("タスク作成ボタンをクリックするとTaskCreatePageに遷移", async () => {
    const wrapper = mount(TaskListPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();

    const createTaskBtn = wrapper.find("#createTask");

    createTaskBtn.trigger("click");
    await flushPromises();
    // console.log(wrapper.vm.$route.path);
    expect(wrapper.vm.$route.path).toBe("/task_create");
  });

  it("ページネーションのページ数が正常", async () => {
    const wrapper = mount(TaskListPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();
    expect(wrapper.vm.$data.length).toBe(2);
  });

  it("ページネーション機能が正常", async () => {
    const wrapper = mount(TaskListPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();
    // console.log(wrapper.html());

    // pagenationの番号が振ってあるボタンをすべて取得 < 1 2 >
    const pagenationNumberBtn = wrapper.findAll(".v-pagination__item");
    expect(pagenationNumberBtn.length).toBe(2);
  });

  it("タスクをクリックするとTaskPageに遷移", async () => {
    const wrapper = mount(TaskListPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();

    // 表示されている最初のタスクを取得（axiosモックにより取得したタスクのIdは6）
    const task = wrapper.find(".v-list-item");

    task.trigger("click");

    await flushPromises();

    expect(wrapper.vm.$route.path).toBe("/task/6");
  });
});
