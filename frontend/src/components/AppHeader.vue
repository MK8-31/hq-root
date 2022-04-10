<template>
  <header>
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>HabituationQuest</v-toolbar-title>
      <v-spacer></v-spacer>
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
      <v-btn icon class="right">
        <v-icon>mdi-help</v-icon>
      </v-btn>

      <v-btn icon class="right" @click="settings = true">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>

      <v-btn icon class="right">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group>
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
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
  import constants from "@/common/constants";

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
      };
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
  .v-toolbar {
    .v-btn.right {
      display: none;

      @include display_pc {
        display: block !important;
      }
    }
  }
  .bar-icon {
    margin-right: 10px !important;
  }
</style>
