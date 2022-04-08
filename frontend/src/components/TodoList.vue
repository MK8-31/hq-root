<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar color="pink" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>TodoList</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list v-for="item in items" :key="item.id" cols="12">
      <v-list-item-group>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox
              :input-value="item.done"
              @click="done(item.id)"
            ></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.id }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>{{ item.task }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="deleteTask(item.id)" icon>
              <v-icon>
                mdi-backspace
              </v-icon></v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-col cols="12" class="d-flex">
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form @submit.prevent="submit">
          <v-list-item-content>
            <ValidationProvider
              ref="observer"
              v-slot="{ errors }"
              rules="required|min:3|max:7"
              name="addTodo"
            >
              <v-text-field
                v-model="todo"
                label="AddTodo"
                required
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn class="btn-plus" icon type="submit" :disabled="invalid">
              <v-icon>
                mdi-plus-circle
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-form>
      </validation-observer>
    </v-col>
  </v-card>
</template>

<script>
  import axios from "axios";
  // eslint-disable-next-line
  import {
    extend,
    ValidationObserver,
    ValidationProvider,
    localize,
  } from "vee-validate";
  import { max, min, required } from "vee-validate/dist/rules";
  import ja from "vee-validate/dist/locale/ja";

  // eslint-disable-next-line
  localize("ja", ja);

  extend("max", max);
  extend("min", min);
  extend("required", required);

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      selected: [2],
      items: [
        // {
        //   id: 1,
        //   task: "Vuetifyを勉強する",
        //   done: true,
        // },
        // {
        //   id: 2,
        //   task: "JSを勉強する",
        //   done: false,
        // },
      ],
      todo: "",
      invalid: false,
    }),
    created() {
      this.getTasks();
      console.log(process.env.NODE_ENV);
    },
    methods: {
      done(id) {
        this.items[id - 1].done = !this.items[id - 1].done;
        console.log(this.items[id - 1].done);
      },
      deleteTask(id) {
        this.items = this.items.filter((item) => item.id !== id);
      },
      addTask(todo) {
        let id = this.items.length + 1;
        this.items.push({ id: id, task: todo, done: false });
      },
      async getTasks() {
        const response = await axios.get("http://localhost:3030/api/v1/tasks");
        this.items = response.data.tasks.map((task) => {
          return { id: task.id, task: task.task, done: task.done };
        });
      },
      submit() {
        if (!this.$refs.observer.validate()) return;
        this.addTask(this.todo);
      },
    },
  };
</script>
