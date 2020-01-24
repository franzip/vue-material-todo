import Vue from "vue";
import api from "../../api/todos";

export default {
  namespaced: true,
  state: {
    all: [],
    fetching: false
  },
  mutations: {
    markStatus(state, { todo, status }) {
      Vue.set(
        state.all.find(t => t.id === todo.id),
        "status",
        status
      );
    },
    remove(state, todo) {
      state.all = state.all.filter(t => t.id !== todo.id);
    },
    setTodos(state, todos) {
      state.all = todos;
    },
    setFetching(state, fetching) {
      state.fetching = fetching;
    },
    addTodo(state, todo) {
      state.all.unshift({
        ...todo,
        status: "pending"
      });
    }
  },
  actions: {
    getInitialTodos({ state, commit }) {
      if (state.all.length) {
        commit("setTodos", state.all);
        return;
      }

      commit("setFetching", true);
      api
        .getTodos()
        .then(response => {
          setTimeout(() => {
            commit(
              "setTodos",
              response.data
                .slice(0, 20)
                .filter(todo => !todo.completed)
                .map(todo => ({
                  id: todo.id,
                  title: todo.title,
                  status: "pending"
                }))
            );
            commit("setFetching", false);
          }, 1500);
        })
        .catch(e => {
          console.log(e);
          commit("setFetching", false);
        });
    }
  },
  getters: {
    pending(state, getters) {
      console.log("triggered");
      return getters.visibleTodos.filter(todo => todo.status === "pending");
    },
    urgent(state, getters) {
      return getters.visibleTodos.filter(todo => todo.status === "urgent");
    },
    completed(state, getters) {
      return getters.visibleTodos.filter(todo => todo.status === "completed");
    },
    fetching(state) {
      return state.fetching;
    },
    visibleTodos(state, getters, rootState) {
      const { statuses, searchTerm } = rootState.filters;

      return state.all.filter(
        ({ status, title, remarks }) =>
          (!statuses.length || statuses.includes(status)) &&
          (!searchTerm.length ||
            (title + remarks).match(new RegExp(searchTerm, "ig")))
      );
    }
  }
};
