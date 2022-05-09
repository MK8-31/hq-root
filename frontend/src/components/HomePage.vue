<template>
  <div>
    <section id="hero">
      <v-row no-gutters>
        <v-img
          :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
          src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
        >
          <v-theme-provider dark>
            <v-container fill-height>
              <v-row
                align="center"
                class="white--text mx-auto"
                justify="center"
              >
                <v-col class="white--text text-center" cols="12" tag="h1">
                  <span
                    :class="[
                      $vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2',
                    ]"
                    class="font-weight-light"
                  >
                    WELCOME TO
                  </span>

                  <br />

                  <span
                    :class="[
                      $vuetify.breakpoint.smAndDown ? 'display-2' : 'display-4',
                    ]"
                    class="font-weight-black"
                  >
                    習慣化クエスト
                  </span>
                </v-col>
                <v-col class="text-center" cols="12">
                  <v-btn
                    v-if="!loggedIn"
                    class="align-self-end"
                    fab
                    outlined
                    @click="$vuetify.goTo('#about-me')"
                  >
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-btn>
                </v-col>
                <v-col class="text-right" cols="6">
                  <v-btn
                    v-if="loggedIn"
                    color="white"
                    class="black--text mt-5 mr-4 mr-md-5"
                    to="/record"
                    large
                  >
                    <span class="font-weight-bold">
                      記録する
                    </span>
                  </v-btn>
                </v-col>
                <v-col class="text-left" cols="6">
                  <v-btn
                    v-if="loggedIn"
                    class="black--text mt-5"
                    color="white"
                    to="/task_list"
                    large
                  >
                    <span class="font-weight-bold">
                      Task
                    </span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-theme-provider>
        </v-img>
      </v-row>
    </section>

    <section id="about-me">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">ABOUT</h2>

        <v-responsive class="mx-auto mb-8" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive
          class="mx-auto title font-weight-light mb-8"
          max-width="720"
        >
          習慣と複利の力で最強に！<br />
          アニメやラノベ主人公のように強くなってみませんか？このアプリならそれが可能です！！<br />
          タスクを設定し、それを毎日こなすことで習慣化することができ、それを繰り返すうちに気がつけば最強に...
        </v-responsive>

        <v-avatar class="elevation-12 mb-12" size="120">
          <v-img src="@/assets/img/sword.jpeg"></v-img>
        </v-avatar>

        <div></div>

        <v-btn
          v-if="!loggedIn"
          class="mr-4 mr-md-5"
          color="grey"
          to="/signup"
          outlined
          large
        >
          <span class="grey--text text--darken-1 font-weight-bold">
            登録する
          </span>
        </v-btn>
        <v-btn v-if="!loggedIn" color="grey" to="/login" outlined large>
          <span class="grey--text text--darken-1 font-weight-bold">
            ログイン
          </span>
        </v-btn>

        <v-btn
          v-if="loggedIn"
          color="white"
          class="black--text mr-4 mr-md-5"
          to="/record"
          large
        >
          <span class="font-weight-bold">
            記録する
          </span>
        </v-btn>
        <v-btn
          v-if="loggedIn"
          class="black--text"
          color="white"
          to="/task_list"
          large
        >
          <span class="font-weight-bold">
            Task
          </span>
        </v-btn>
      </v-container>

      <div class="py-12"></div>
    </section>

    <section id="features" class="grey lighten-3">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">FEATURES</h2>

        <v-responsive class="mx-auto mb-12" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-row>
          <v-col
            v-for="({ icon, title, text }, i) in features"
            :key="i"
            cols="12"
            md="4"
          >
            <v-card class="py-12 px-4" color="grey lighten-5" flat>
              <v-theme-provider dark>
                <div>
                  <v-avatar color="primary" size="88">
                    <v-icon large v-text="icon"></v-icon>
                  </v-avatar>
                </div>
              </v-theme-provider>

              <v-card-title
                class="justify-center font-weight-black text-uppercase"
                v-text="title"
              ></v-card-title>

              <v-card-text class="subtitle-1" v-text="text"> </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <div class="py-12"></div>
    </section>

    <section id="stats">
      <v-parallax
        :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
        src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
      >
        <v-container fill-height>
          <v-row class="mx-auto">
            <v-col
              v-for="[value, title] of stats"
              :key="title"
              cols="12"
              md="3"
            >
              <div class="text-center">
                <div
                  class="display-3 font-weight-black mb-4"
                  v-text="value"
                ></div>

                <div
                  class="title font-weight-regular text-uppercase"
                  v-text="title"
                ></div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </section>

    <section id="howToUse">
      <div class="py-12"></div>

      <v-container>
        <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">
          How to Use
        </h2>

        <v-responsive class="mx-auto mb-12" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-row>
          <v-col
            v-for="({ src, text, title, to }, i) in howToUse"
            :key="i"
            cols="12"
            md="4"
          >
            <v-img
              :src="src"
              class="mb-4"
              height="275"
              max-width="100%"
            ></v-img>

            <h3
              class="font-weight-black mb-4 text-uppercase"
              v-text="title"
            ></h3>

            <div class="title font-weight-light mb-5" v-text="text"></div>

            <v-btn class="ml-n4 font-weight-black" text :to="to">
              Continue
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <div class="py-12"></div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        howToUse: [
          {
            src:
              "https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            title: "タスクを登録",
            text:
              "習慣化したいことをタスクとして登録します。例えば、腹筋10回のように具体的なタスクを登録します。",
            to: "/task_list",
          },
          {
            src:
              "https://images.unsplash.com/photo-1475938476802-32a7e851dad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            title: "記録",
            text: "タスクを達成したら記録します。ワンタップでOK。",
            to: "/record",
          },
          {
            src:
              "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1892&q=80",
            title: "経験値・レベル確認",
            text:
              "記録をすると経験値がたまり、一定以上貯まるとレベルアップします。自分の努力を見て成長を感じることで挫折を防ぐことができます。",
            to: "/show_record",
          },
        ],
        features: [
          {
            icon: "mdi-clipboard-minus-outline",
            title: "簡単な記録",
            text:
              "ワンタップで記録するができます。簡単に記録することができるので、記録の継続は簡単です。",
          },
          {
            icon: "mdi-arrow-top-right-thick",
            title: "経験値・レベル",
            text:
              "経験値とレベルシステムによりあなたの努力や継続を可視化します。",
          },
          {
            icon: "mdi-human-handsup",
            title: "楽しく習慣化",
            text:
              "毎日の努力が見える化されるので楽しく習慣化に取り組むことができます。楽しんでいるうちにいずれ最強。。。",
          },
        ],
        stats: [
          ["∞", "tasks"],
          ["99", "maxLv"],
          ["3", "Job"],
          ["∞", "probability"],
        ],
      };
    },
    computed: {
      loggedIn() {
        return this.$store.getters.getLoggedIn;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
