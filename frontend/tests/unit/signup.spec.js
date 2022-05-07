import flushPromises from "flush-promises";
import SignUp from "@/components/SignUpPage.vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
const { required } = require("vee-validate/dist/rules.umd");
extend("required", required);
import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";

jest.mock("axios", () => ({
  post: jest.fn((_url, _body) => {
    // console.log(_url, _body);
    if (
      _body.nickname == "test" &&
      _body.email == "test@example.com" &&
      _body.password == "password"
    ) {
      return Promise.resolve({
        data: {
          status: "success",
          data: {
            id: 6,
            provider: "email",
            uid: "test@example.com",
            allow_password_change: false,
            name: null,
            nickname: "test",
            image: null,
            email: "test@example.com",
            created_at: "2022-05-02T07:09:16.102Z",
            updated_at: "2022-05-02T07:09:16.165Z",
          },
        },
        status: 200,
        statusText: "OK",
        headers: {
          "access-token": "JgUSNOd70XufGrxkIpF94Q",
          "cache-control": "max-age=0, private, must-revalidate",
          client: "N9Fy56gpPu-E2Va52oFibg",
          "content-type": "application/json; charset=utf-8",
          expiry: "1652684956",
          "token-type": "Bearer",
          uid: "test@example.com",
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
          url: "/api/v1/auth",
          data:
            '{"nickname":"test","email":"test@example.com","password":"password"}',
        },
        request: {},
      });
    } else {
      return Promise.reject({
        response: {
          data: {
            status: "error",
            data: {
              id: null,
              provider: "email",
              uid: "",
              allow_password_change: false,
              name: null,
              nickname: "a",
              image: null,
              email: "a@a.com",
              created_at: null,
              updated_at: null,
            },
            errors: {
              email: ["は既に使用されています。"],
              nickname: ["はすでに存在します"],
              full_messages: ["メールアドレスは既に使用されています。"],
            },
          },
          status: 422,
          statusText: "Unprocessable Entity",
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
            url: "/api/v1/auth",
            data: '{"nickname":"a","email":"a@a.com","password":"aaaaaa"}',
          },
          request: {},
        },
      });
    }
  }),
}));

describe("SignUpPage", () => {
  const localVue = createLocalVue();
  localVue.component("ValidationObserver", ValidationObserver);
  localVue.component("ValidationProvider", ValidationProvider);
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("ニックネームのラベルがある", () => {
    const wrapper = mount(SignUp, {
      localVue,
      vuetify,
    });
    expect(wrapper.html()).toContain("ニックネーム");
  });

  it("ニックネーム入力欄がある", () => {
    const wrapper = mount(SignUp, {
      localVue,
      vuetify,
    });
    expect(wrapper.find("#nickname-field").exists()).toBeTruthy();
  });

  it("メールアドレスのラベルがある", () => {
    const wrapper = mount(SignUp, {
      localVue,
      vuetify,
    });
    expect(wrapper.html()).toContain("メールアドレス");
  });

  it("メールアドレス入力欄がある", () => {
    const wrapper = mount(SignUp, {
      localVue,
      vuetify,
    });
    expect(wrapper.find("#email-field").exists()).toBeTruthy();
  });

  it("パスワードのラベルがある", () => {
    const wrapper = mount(SignUp, {
      localVue,
      vuetify,
    });
    expect(wrapper.html()).toContain("パスワード");
  });

  it("パスワード入力欄がある", () => {
    const wrapper = mount(SignUp, {
      localVue,
      vuetify,
    });
    expect(wrapper.find("#password-field")).toBeTruthy();
  });

  it("ニックネームがない場合はエラーが表示", async () => {
    // コンポーネントのスタブを作成
    const wrapper = mount(SignUp, {
      localVue,
      vuetify,
    });
    // 要素に値を設定
    const nickname = wrapper.find("#nickname-field");

    nickname.setValue(" ");
    await flushPromises();

    const error = wrapper.findAll(".v-messages").at(0);
    // 実行結果の確認
    expect(error.text()).toBe("ニックネームは必須項目です");
  });

  it("メールアドレスがない場合はエラーが表示", async () => {
    // コンポーネントのスタブを作成
    const wrapper = mount(SignUp, {
      localVue,
      vuetify,
    });
    // 要素に値を設定
    const email = wrapper.find("#email-field");

    email.setValue(" ");
    await flushPromises();

    const error = wrapper.findAll(".v-messages").at(1);
    // 実行結果の確認
    expect(error.text()).toBe("メールアドレスは必須項目です");
  });

  it("メールアドレスの形式が正しくないとエラーを表示", async () => {
    // コンポーネントのスタブを作成
    const wrapper = mount(SignUp, {
      localVue,
      vuetify,
    });
    // 要素に値を設定
    const email = wrapper.find("#email-field");
    email.setValue("aiaoie");

    // flush the pending validation.
    await flushPromises();

    const error = wrapper.findAll(".v-messages").at(1);
    // 実行結果の確認
    expect(error.text()).toBe(
      "メールアドレスは有効なメールアドレスではありません"
    );
  });

  it("パスワードがないとエラーを表示", async () => {
    // コンポーネントのスタブを作成
    const wrapper = mount(SignUp, {
      localVue,
      vuetify,
    });
    // 要素に値を設定
    let password = wrapper.find("#password-field");

    password.setValue(" ");
    // flush the pending validation.
    await flushPromises();
    const error = wrapper.findAll(".v-messages").at(2);
    // 実行結果の確認
    expect(error.text()).toBe("パスワードは必須項目です");
  });

  it("パスワードは６文字以上でないとエラーを表示", async () => {
    // コンポーネントのスタブを作成
    const wrapper = mount(SignUp, {
      localVue,
      vuetify,
    });
    // 要素に値を設定
    let password = wrapper.find("#password-field");
    password.setValue("a");

    // flush the pending validation.
    await flushPromises();

    const error = wrapper.findAll(".v-messages").at(2);
    // 実行結果の確認
    expect(error.text()).toBe("パスワードは6文字以上でなければなりません");
  });

  //   // v-bind で結びついているものをテストできないのでコメントアウト
  //   // it("SignUpに必要な情報が入力欄にない場合はログインボタンが押せない", async () => {
  //   //   const wrapper = mount(SignUp, {
  //   //     localVue,
  //   //     vuetify,
  //   //   });

  //   //   // update prop, and wait a tick to allow it to take effect

  //   //   // flush the pending validation.
  //   //   await flushPromises();

  //   //   let submit = wrapper.find("button#submit");

  //   //   // expect(submit.attributes().disabled).toBeDefined();
  //   //   wrapper.vm.$nextTick();
  //   //   // console.log(submit.html());
  //   //   expect(submit.attributes().disabled).toBeDefined();
  //   // });

  it("登録内容に不備がある場合ユーザ登録失敗でエラーを表示", async () => {
    // axios のcatchをテストする
    const wrapper = mount(SignUp, {
      localVue,
      vuetify,
    });

    const nickname = wrapper.find("#nickname-field");
    const email = wrapper.find("#email-field");
    const password = wrapper.find("#password-field");
    const submit = wrapper.find("#submit");
    // const data = wrapper.vm.$data;
    // // console.log(data);
    // const errorMessage = data.errorMessage;
    nickname.setValue("a");
    email.setValue("a@a.com");
    password.setValue("password");

    submit.trigger("click");
    await flushPromises(); // ないとエラー

    // console.log("this.errorMessage = " + wrapper.vm.errorMessage);
    expect(wrapper.vm.errorMessages).toEqual(
      expect.arrayContaining(["メールアドレスは既に使用されています。"])
    );
  });

  it("登録内容が正常な場合ユーザ登録成功", async () => {
    const wrapper = mount(SignUp, {
      localVue,
      vuetify,
    });
    const nickname = wrapper.find("#nickname-field");
    const email = wrapper.find("#email-field");
    const password = wrapper.find("#password-field");
    nickname.setValue("test");
    email.setValue("test@example.com");
    password.setValue("password");
    const submit = wrapper.find("#submit");
    submit.trigger("click");
    await flushPromises();
    // テストにCookieを組み込んでいないため、setが定義されていないとエラーが出るがOK
    // console.log("this.signup: " + wrapper.vm.signup);
    expect(wrapper.vm.signup).toBeTruthy();
  });
});
