import flushPromises from "flush-promises";
import RecordPage from "@/components/Record/RecordPage.vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
const { required } = require("vee-validate/dist/rules.umd");
extend("required", required);
import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";

jest.mock("axios", () => ({
  post: jest.fn((url, body) => {
    // console.log(url, body);
    if (body.email == "test@example.com" && body.password == "password") {
      return Promise.resolve({
        data: {
          data: {
            email: "test@example.com",
            id: 4,
            uid: "test@example.com",
            provider: "email",
            allow_password_change: false,
            name: null,
            nickname: "test",
            image: null,
          },
        },
        status: 200,
        statusText: "OK",
        headers: {
          "access-token": "Q2lbYDSN7KgBrmQQ2WiOAQ",
          "cache-control": "max-age=0, private, must-revalidate",
          client: "3MFitDOQahmt1VrNNCBCQQ",
          "content-type": "application/json; charset=utf-8",
          expiry: "1652671700",
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
          },
          baseURL: "http://localhost:3030",
          method: "post",
          url: "/api/v1/auth/sign_in",
          data: '{"email":"test@example.com","password":"password"}',
        },
        request: {},
      });
    } else {
      return Promise.reject({
        response: {
          data: {
            success: false,
            errors: [
              "ログイン用の認証情報が正しくありません。再度お試しください。",
            ],
          },
          status: 401,
          statusText: "Unauthorized",
          headers: {
            "cache-control": "no-cache",
            "content-type": "application/json; charset=utf-8",
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
            },
            baseURL: "http://localhost:3030",
            method: "post",
            url: "/api/v1/auth/sign_in",
            data: '{"email":"sdes@oia.com","password":"zzzzzzzz"}',
          },
          request: {},
        },
      });
    }
  }),
}));

describe("LoginPage", () => {
  const localVue = createLocalVue();
  localVue.component("ValidationObserver", ValidationObserver);
  localVue.component("ValidationProvider", ValidationProvider);
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("ページタイトルがある", () => {
    const wrapper = mount(RecordPage, {
      localVue,
      vuetify,
    });
    expect(wrapper.html()).toContain("記録");
  });

  // it("タスクが正しく表示されている", async () => {
  //   const wrapper = mount(RecordPage, {
  //     data() {
  //       return {
  //         tasks: [
  //           {
  //             id: 72,
  //             name: "飽くまでもなんべいけいけんしゃ。",
  //             day: 6,
  //             week: 0,
  //             days_a_week: 3,
  //             running_days: 0,
  //             running_weeks: 0,
  //             last_time: "2022-06-19",
  //             user_id: 23,
  //             created_at: "2022-06-13T16:58:07.759+09:00",
  //             updated_at: "2022-06-19T18:16:19.267+09:00",
  //           },
  //           {
  //             id: 73,
  //             name: "おきゃくさんへいがいつなひき。",
  //             day: 6,
  //             week: 0,
  //             days_a_week: 2,
  //             running_days: 0,
  //             running_weeks: 0,
  //             last_time: "2022-06-19",
  //             user_id: 23,
  //             created_at: "2022-06-13T16:58:07.765+09:00",
  //             updated_at: "2022-06-19T18:16:23.708+09:00",
  //           },
  //           {
  //             id: 74,
  //             name: "おきゃくさんおどろく撃つ。",
  //             day: 6,
  //             week: 0,
  //             days_a_week: 2,
  //             running_days: 0,
  //             running_weeks: 0,
  //             last_time: "2022-06-19",
  //             user_id: 23,
  //             created_at: "2022-06-13T16:58:07.770+09:00",
  //             updated_at: "2022-06-19T18:16:31.677+09:00",
  //           },
  //           {
  //             id: 75,
  //             name: "希望する自宅どろ。",
  //             day: 6,
  //             week: 0,
  //             days_a_week: 2,
  //             running_days: 0,
  //             running_weeks: 0,
  //             last_time: "2022-06-19",
  //             user_id: 23,
  //             created_at: "2022-06-13T16:58:07.776+09:00",
  //             updated_at: "2022-06-19T18:16:34.382+09:00",
  //           },
  //           {
  //             id: 76,
  //             name: "ぶんつく遮断。",
  //             day: 6,
  //             week: 0,
  //             days_a_week: 2,
  //             running_days: 0,
  //             running_weeks: 0,
  //             last_time: "2022-06-19",
  //             user_id: 23,
  //             created_at: "2022-06-13T16:58:07.782+09:00",
  //             updated_at: "2022-06-19T18:16:36.772+09:00",
  //           },
  //           {
  //             id: 77,
  //             name: "浸すじぎするきょうふ。",
  //             day: 6,
  //             week: 0,
  //             days_a_week: 2,
  //             running_days: 0,
  //             running_weeks: 0,
  //             last_time: "2022-06-19",
  //             user_id: 23,
  //             created_at: "2022-06-13T16:58:07.787+09:00",
  //             updated_at: "2022-06-19T18:16:41.870+09:00",
  //           },
  //           {
  //             id: 78,
  //             name: "しょうじょう好き備える。",
  //             day: 6,
  //             week: 0,
  //             days_a_week: 2,
  //             running_days: 0,
  //             running_weeks: 0,
  //             last_time: "2022-06-19",
  //             user_id: 23,
  //             created_at: "2022-06-13T16:58:07.793+09:00",
  //             updated_at: "2022-06-19T18:17:37.096+09:00",
  //           },
  //           {
  //             id: 79,
  //             name: "こくふくする隆起漠然。",
  //             day: 1,
  //             week: 0,
  //             days_a_week: 1,
  //             running_days: 0,
  //             running_weeks: 0,
  //             last_time: "2022-06-14",
  //             user_id: 23,
  //             created_at: "2022-06-13T16:58:07.799+09:00",
  //             updated_at: "2022-06-14T10:57:27.876+09:00",
  //           },
  //           {
  //             id: 80,
  //             name: "フランス語検査間隔。",
  //             day: 6,
  //             week: 0,
  //             days_a_week: 2,
  //             running_days: 0,
  //             running_weeks: 0,
  //             last_time: "2022-06-19",
  //             user_id: 23,
  //             created_at: "2022-06-13T16:58:07.807+09:00",
  //             updated_at: "2022-06-19T18:26:02.965+09:00",
  //           },
  //           {
  //             id: 81,
  //             name: "ごうけんせっぷく乗せる。",
  //             day: 6,
  //             week: 0,
  //             days_a_week: 2,
  //             running_days: 0,
  //             running_weeks: 0,
  //             last_time: "2022-06-19",
  //             user_id: 23,
  //             created_at: "2022-06-13T16:58:07.814+09:00",
  //             updated_at: "2022-06-19T18:25:30.740+09:00",
  //           },
  //         ],
  //       };
  //     },
  //     localVue,
  //     vuetify,
  //   });

  //   await flushPromises();
  //   console.log(wrapper.html());
  //   const data = wrapper.vm.$data;
  //   console.log(data);
  //   console.log(data.tasks);
  //   expect(wrapper.vm.displayList.length).toBe(6);
  // });
  const answer = [
    12,
    18,
    27,
    41,
    61,
    91,
    137,
    205,
    308,
    461,
    692,
    1038,
    1557,
    2335,
    3503,
    5255,
    7882,
    11823,
    17735,
    26602,
    39903,
    59855,
    89782,
    134673,
    202009,
    303014,
    454521,
    681782,
    1022672,
    1534008,
    2301013,
    3451519,
    5177279,
    7765918,
    11648877,
    17473315,
    26209973,
    39314959,
    58972439,
    88458659,
  ];
  for (let i = 1; i <= 40; i++) {
    // lv 40の時に１ずれる
    it(`レベルアップに必要な経験値が正しいか level: ${i}`, () => {
      expect(Math.round(12 * 1.5 ** (i - 1))).toBe(answer[i - 1]);
    });
  }
});
