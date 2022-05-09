import flushPromises from "flush-promises";
import AppHeader from "@/components/AppHeader.vue";
import constants from "@/common/constants";
import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";
import { config } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vue from "vue";

describe("AppHeaderPage", () => {
  const localVue = createLocalVue();
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
      loggedIn: false,
    };
    getters = {
      getLoggedIn(state) {
        return state.loggedIn;
      },
    };
    store = new Vuex.Store({
      state,
      getters,
      mutations,
    });
    router = new VueRouter();
  });

  it("Homeへのボタンがある", async () => {
    const wrapper = mount(AppHeader, {
      localVue,
      vuetify,
      store,
      router,
    });
    await flushPromises();
    const home = wrapper.find("#home");
    expect(home.text()).toBe("Home");
  });

  it("Loginへのボタンがある", async () => {
    const wrapper = mount(AppHeader, {
      localVue,
      vuetify,
      store,
      router,
    });
    await flushPromises();
    const signup = wrapper.find("#signup");
    expect(signup.text()).toBe("SignUp");
  });

  it("Signupへのボタンがある", async () => {
    const wrapper = mount(AppHeader, {
      localVue,
      vuetify,
      store,
      router,
    });
    await flushPromises();
    const login = wrapper.find("#login");
    expect(login.text()).toBe("Login");
  });
});
