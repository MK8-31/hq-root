<template>
  <div>
    <header>
      <v-app-bar app dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>HabituationQuest</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tabs right>
          <v-tab link to="/record">
            <v-btn icon class="right">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
          </v-tab>
          <v-tab link to="/show_record">
            <v-btn icon class="right">
              <v-icon>mdi-book-open-page-variant-outline</v-icon>
            </v-btn>
          </v-tab>
          <v-tab link to="/show_record">
            <div class="text-center">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon class="right" dark v-bind="attrs" v-on="on">
                    <v-icon>mdi-information</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item link v-for="(item, index) in items" :key="index">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-tab>
          <v-tab link to="/help">
            <v-btn icon class="right">
              <v-icon>mdi-help</v-icon>
            </v-btn>
          </v-tab>
          <v-tab link to="/class_change">
            <v-btn icon class="right">
              <v-icon>mdi-account-switch</v-icon>
            </v-btn>
          </v-tab>
          <v-tab link to="/account">
            <v-btn icon class="right">
              <v-icon>mdi-account</v-icon>
            </v-btn></v-tab
          >
        </v-tabs>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" fixed temporary>
        <v-list nav dense>
          <v-list-item-group v-if="isLoggedIn">
            <v-list-item
              link
              :to="menuItem.url"
              v-for="(menuItem, index) in menuItems"
              :key="index"
            >
              <v-list-item-icon>
                <v-icon>{{ menuItem.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-list-item-group>
            <v-list-item v-if="!isLoggedIn" link to="signup">
              <v-list-item-icon>
                <v-icon>mdi-signup</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>SignUp</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="!isLoggedIn" link to="/login">
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="isLoggedIn" @click="logout_dialog = true">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>
    <v-dialog v-model="logout_dialog" max-width="400">
      <v-card>
        <v-card-title>
          <div>ログアウト</div>
        </v-card-title>
        <v-card-text>
          <p>ログアウトしますか？</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="logout_dialog = false">閉じる</v-btn>
          <v-btn color="primary" @click="logout()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import constants from "@/common/constants";
  import axios from "axios";

  export default {
    data() {
      return {
        drawer: false,
        settings: false,
        menuItems: constants.menuItems,
        items: [
          { title: "Click Me" },
          { title: "Click Me" },
          { title: "Click Me" },
          { title: "Click Me 2" },
        ],
        logout_dialog: false,
      };
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      },
    },
    mounted() {
      this.$store.commit(
        "setIsLoggedIn",
        this.$cookies.get("access-token") ? true : false
      );
      console.log(
        this.$store.state.isLoggedIn,
        this.$cookies.get("access-token")
      );
    },
    methods: {
      async logout() {
        console.log({
          uid: decodeURIComponent(this.$cookies.get("uid")),
          "access-token": this.$cookies.get("access-token"),
          client: this.$cookies.get("client"),
        });
        await axios
          .delete("/api/v1/auth/sign_out", {
            data: {
              uid: decodeURIComponent(this.$cookies.get("uid")),
              "access-token": this.$cookies.get("access-token"),
              client: this.$cookies.get("client"),
            },
          })
          .then((response) => {
            console.log(response);
            this.logout_dialog = false;
            this.$store.commit("setIsLoggedIn", false);
            this.$cookies.remove("uid");
            this.$cookies.remove("access-token");
            this.$cookies.remove("client");
            if (this.$router.path !== "/") {
              this.$router.puth("/");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      },
    },
  };
</script>
<style lang="scss" scoped>
  /* scoped属性をつけることで、styleをそのコンポーネント内のみ適用 */
  .v-toolbar__title {
    overflow: visible !important;
    margin-right: 50px !important;
  }
  // .v-app-bar__nav-icon {
  //   @include display_pc {
  //     display: none !important;
  //   }
  // }
  // .v-toolbar {
  //   .v-btn.right {
  //     display: none;

  //     @include display_pc {
  //       display: block !important;
  //     }
  //   }
  // }
  .v-tab {
    display: none;

    @include display_pc {
      display: block !important;
    }
  }
  .bar-icon {
    margin-right: 10px !important;
  }
</style>
