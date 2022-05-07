<template>
  <v-app>
    <AppHeader />
    <v-main>
      <router-view></router-view>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
  import AppHeader from "./components/AppHeader.vue";
  import AppFooter from "./components/AppFooter.vue";
  /*
  作りたいページ
  ホームページ
  新規登録ページ
  ログインページ
  ヘルプページ

  作りたい部品
  ヘッダー
  フッター

  */

  export default {
    components: {
      AppHeader,
      AppFooter,
    },
    created() {
      const accessToken = this.$cookies.get("access-token");
      const client = this.$cookies.get("client");
      const uid = this.$cookies.get("uid");
      if (accessToken && client && uid) {
        this.$store.commit(
          "setRequestHeadersRequiredToMaintainLoginStatus",
          accessToken,
          client,
          uid
        );
        this.$store.commit("setLoggedIn", true);
      } else {
        this.$router.push("/login");
      }
    },
  };
</script>
