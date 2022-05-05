import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * ログインをしているかどうか
     */
    isLoggedIn: false,
    /**
     * ユーザのすべてのタスクを格納
     */
    tasks: [],
    /**
     * ログイン状態の保持に必要なリクエストヘッダー
     */
    requestHeadersRequiredToMaintainLoginStatus: {
      /**
       * ログイン状態の確認に必要なアクセストークン
       */
      accessToken: "",
      /**
       * ログイン状態の確認に必要なクライアント
       */
      client: "",
      /**
       * ログイン状態の確認に必要なuid
       */
      uid: "",
    },
  },
  getters: {
    /**
     * tasks配列からidを使用して目的のタスクを見つける関数
     * @param {Object} state state
     * @param {Number} task_id 目的のタスクのid
     * @return {Object} task 目的のタスク
     */
    getTaskFromId: (state) => (task_id) => {
      let targetTask = {};
      state.tasks.forEach((task) => {
        if (task.id === task_id) {
          console.log(true);
          targetTask = task;
        }
      });

      return targetTask;
    },
    /**
     * すべてのタスクを返す関数
     * @param {Object} state state
     * @return {Object} すべてのタスク配列
     */
    getTasks(state) {
      return state.tasks;
    },
  },
  mutations: {
    setIsLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setTasks(state, value) {
      state.tasks = value;
    },
    setRequestHeadersRequiredToMaintainLoginStatus(
      state,
      accessToken,
      client,
      uid
    ) {
      state.requestHeadersRequiredToMaintainLoginStatus.accessToken = accessToken;
      state.requestHeadersRequiredToMaintainLoginStatus.client = client;
      state.requestHeadersRequiredToMaintainLoginStatus.uid = uid;
    },
  },
});
