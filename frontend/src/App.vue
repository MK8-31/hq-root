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
  };
</script>
