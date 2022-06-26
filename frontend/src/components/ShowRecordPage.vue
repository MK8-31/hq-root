<template>
  <div>
    <h1 class="text-center mt-5 mb-5">記録を見る</h1>
    <h2 class="text-center mt-5 mb-5">レベル</h2>
    <v-card elevation="0" class="mt-2 mb-6 mx-1 text-center">
      <v-progress-circular
        :rotate="-90"
        :size="140"
        :width="11"
        :value="this.lvRate"
        color="primary"
      >
        <div class="d-flex flex-column black--text">
          <p
            class="pb-0 ma-0 text-h7 black--text text-center text--secondary font-weight-bold"
          >
            Lv:
          </p>
          <div class="d-flex pt-2 pl-2">
            <p class="text-h5 text--primary mt-auto mb-0 pb-0">
              {{ this.lv }}
            </p>
            <p class="mt-auto mb-0 pb-0">/99</p>
          </div>
        </div>
      </v-progress-circular>
    </v-card>

    <h2 class="text-center mt-5 mb-5">経験値</h2>

    <v-card elevation="0" class="mt-2 mb-6 mx-1 text-center">
      <v-progress-linear
        :value="expRate"
        rounded
        disabled
        height="35"
        color="#4ECDC4"
        background-color="grey lighten-3"
      >
        <div class="grey--text text--darken-2">
          Exp: {{ nowLvExp }} / {{ nowLvMaxExp }}
        </div>
      </v-progress-linear>
    </v-card>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data: () => ({
      lv: 1,
      lvRate: 0,
      nowLvExp: 0,
      nowLvMaxExp: 0,
      expRate: 0,
    }),
    async mounted() {
      await this.getRecord();
    },
    methods: {
      /**
       * すべてのタスクを取得する関数
       */
      async getRecord() {
        await axios
          .get("/api/v1/records/show", {
            headers: {
              "access-token": this.$cookies.get("access-token"),
              client: this.$cookies.get("client"),
              uid: this.$cookies.get("uid"),
            },
          })
          .then((response) => {
            // console.log(response);
            const lv = response.data.data.level;
            const exp = response.data.data.exp;

            this.lv = lv;
            this.lvRate = (this.lv / 99) * 100;
            // レベルアップに必要な経験値
            this.nowLvMaxExp = Math.round(12 * 1.5 ** (lv - 1));
            // 今のレベルになってからの経験値
            this.nowLvExp =
              exp - Math.round(12 * ((1 - 1.5 ** (lv - 1)) / (1 - 1.5)));
            this.expRate = (this.nowLvExp / this.nowLvMaxExp) * 100;
            console.log(this.expRate, this.nowLvExp, this.nowLvMaxExp);
          })
          .catch((error) => {
            console.error(error);
            console.error(error.response);
            this.errorMessage = error.response.data.errors[0];
            console.error(this.errorMessage);
          });
      },
    },
  };
</script>
<style>
  .v-card--hover {
    margin: 0;
  }
</style>
