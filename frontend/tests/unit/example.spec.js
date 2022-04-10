import { shallowMount } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import Login from "@/components/LoginPage.vue";

describe("Login", () => {
  it("mount render a child component", () => {
    // mount は全体テスト用（子コンポーネントも含めてテストしたい場合など）
    const wrapper = mount(Login);
    expect(wrapper.html()).toContain("Login");
  });
  it("mount render a child component", () => {
    // shallowMount は単体テスト用
    const wrapper = shallowMount(Login);
    expect(wrapper.html()).toContain("Login");
  });
});
