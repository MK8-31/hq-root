const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: "http://localhost:3030",
    port: 3000,
  },
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "./src/styles/common/common.scss";',
      },
    },
  },
});
