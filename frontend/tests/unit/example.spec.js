import { shallowMount } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import TodoList from "@/components/TodoList.vue";

describe("TodoList.vue", () => {
  test("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = mount(TodoList);
    expect(wrapper.text()).toMatch("TodoList");
    console.log(wrapper.text());
  });
  test("two plus two is four", () => {
    expect(2 + 2).toBe(4);
  });
});
