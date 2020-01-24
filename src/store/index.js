import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import filters from "./modules/filters";
import todos from "./modules/todos";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "material-todo",
  storage: window.localStorage,
  modules: ["todos"]
});

export default new Vuex.Store({
  modules: {
    filters,
    todos
  },
  plugins: [vuexLocal.plugin]
});
