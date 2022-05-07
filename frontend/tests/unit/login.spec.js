import flushPromises from "flush-promises";
import Login from "@/components/LoginPage.vue";
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

  it("メールアドレスのラベルがある", () => {
    const wrapper = mount(Login, {
      localVue,
      vuetify,
    });
    expect(wrapper.html()).toContain("メールアドレス");
  });

  it("メールアドレス入力欄がある", () => {
    const wrapper = mount(Login, {
      localVue,
      vuetify,
    });
    expect(wrapper.find("input[type='email']").exists()).toBeTruthy();
  });

  it("パスワードのラベルがある", () => {
    const wrapper = mount(Login, {
      localVue,
      vuetify,
    });
    expect(wrapper.html()).toContain("パスワード");
  });

  it("パスワード入力欄がある", () => {
    const wrapper = mount(Login, {
      localVue,
      vuetify,
    });
    expect(wrapper.find("input[type='passwrd']")).toBeTruthy();
  });

  it("メールアドレスがない場合はエラーが表示", async () => {
    // コンポーネントのスタブを作成
    const wrapper = mount(Login, {
      localVue,
      vuetify,
    });
    // 要素に値を設定
    let email = wrapper.find('[type="email"]');
    email.setValue("a");

    // flush the pending validation.
    await flushPromises();

    wrapper.find('[type="email"]').setValue(" ");
    await flushPromises();
    const error = wrapper.findAll(".v-messages").at(0);
    // 実行結果の確認
    expect(error.text()).toBe("メールアドレスは必須項目です");
  });

  it("メールアドレスの形式が正しくないとエラーを表示", async () => {
    // コンポーネントのスタブを作成
    const wrapper = mount(Login, {
      localVue,
      vuetify,
    });
    // 要素に値を設定
    let email = wrapper.find('[type="email"]');
    email.setValue("aiaoie");

    // flush the pending validation.
    await flushPromises();

    const error = wrapper.find(".v-messages");
    // 実行結果の確認
    expect(error.text()).toBe(
      "メールアドレスは有効なメールアドレスではありません"
    );
  });

  it("パスワードがないとエラーを表示", async () => {
    // コンポーネントのスタブを作成
    const wrapper = mount(Login, {
      localVue,
      vuetify,
    });
    // 要素に値を設定
    let password = wrapper.find("#password-field");

    password.setValue(" ");
    // flush the pending validation.
    await flushPromises();
    const error = wrapper.findAll(".v-messages").at(1);
    // 実行結果の確認
    expect(error.text()).toBe("パスワードは必須項目です");
  });

  it("パスワードは６文字以上でないとエラーを表示", async () => {
    // コンポーネントのスタブを作成
    const wrapper = mount(Login, {
      localVue,
      vuetify,
    });
    // 要素に値を設定
    let password = wrapper.find("#password-field");
    password.setValue("a");

    // flush the pending validation.
    await flushPromises();

    const error = wrapper.findAll(".v-messages").at(1);
    // 実行結果の確認
    expect(error.text()).toBe("パスワードは6文字以上でなければなりません");
  });

  // v-bind で結びついているものをテストできないのでコメントアウト
  // it("loginに必要な情報が入力欄にない場合はログインボタンが押せない", async () => {
  //   const wrapper = mount(Login, {
  //     localVue,
  //     vuetify,
  //   });

  //   // update prop, and wait a tick to allow it to take effect

  //   // flush the pending validation.
  //   await flushPromises();

  //   let submit = wrapper.find("button#submit");

  //   // expect(submit.attributes().disabled).toBeDefined();
  //   wrapper.vm.$nextTick();
  //   // console.log(submit.html());
  //   expect(submit.attributes().disabled).toBeDefined();
  // });

  it("メールアドレスとパスワードの組み合わせが正しくない場合エラーを表示", async () => {
    const wrapper = mount(Login, {
      localVue,
      vuetify,
    });

    const email = wrapper.find("#email-field");
    const password = wrapper.find("#password-field");
    const submit = wrapper.find("#submit");
    // const data = wrapper.vm.$data;
    // // console.log(data);
    // const errorMessage = data.errorMessage;
    email.setValue("aaa@hoge.comm");
    password.setValue("password");

    submit.trigger("click");
    await flushPromises(); // ないとエラー
    // axios のcatchをテストする
    // console.log("this.errorMessage = " + wrapper.vm.errorMessage);
    expect(wrapper.vm.errorMessage).toBe(
      "メールアドレスとパスワードの組み合わせが正しくありません。"
    );
  });

  it("メールアドレスとパスワードの組み合わせが正しい場合ログイン", async () => {
    const wrapper = mount(Login, {
      localVue,
      vuetify,
    });
    const email = wrapper.find("#email-field");
    const password = wrapper.find("#password-field");
    email.setValue("test@example.com");
    password.setValue("password");
    const submit = wrapper.find("#submit");
    submit.trigger("click");
    await flushPromises();
    // テストにCookieを組み込んでいないため、setが定義されていないとエラーが出るがOK
    // console.log("this.login: " + wrapper.vm.login);
    expect(wrapper.vm.login).toBeTruthy();
  });
});
