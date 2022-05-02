import { shallowMount } from "@vue/test-utils";
// Libraries
import Vuetify from "vuetify";

// Utilities
import { createLocalVue, mount } from "@vue/test-utils";
import Login from "@/components/LoginPage.vue";

describe("Login", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });
  it("mount render a child component", () => {
    // mount は全体テスト用（子コンポーネントも含めてテストしたい場合など）
    const wrapper = mount(Login, {
      localVue,
      vuetify,
    });
    expect(wrapper.html()).toContain("ログイン");
  });
  it("mount render a child component", () => {
    // shallowMount は単体テスト用
    const wrapper = shallowMount(Login, {
      localVue,
      vuetify,
    });
    expect(wrapper.html()).toContain("ログイン");
  });
});
