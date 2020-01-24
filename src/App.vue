<template>
  <div id="app">
    <AddTodoForm />
    <Filters />
    <Todos />
  </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
import VueMaterial from "vue-material";
import AddTodoForm from "./components/AddTodoForm";
import Todos from "./components/Todos";
import Filters from "./components/Filters";
import store from "./store";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(Vuelidate);
Vue.use(VueMaterial);

export default {
  name: "app",
  store,
  components: {
    AddTodoForm,
    Filters,
    Todos
  }
};
</script>

<style>
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
