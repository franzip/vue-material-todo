export default {
  namespaced: true,
  state: {
    searchTerm: "",
    statuses: []
  },
  getters: {
    statuses(state) {
      return state.statuses;
    }
  },
  mutations: {
    updateSearchTerm(state, term) {
      state.searchTerm = term;
    },
    addStatusFilter(state, status) {
      if (!state.statuses.includes(status)) {
        state.statuses.push(status);
      }
    },
    removeStatusFilter(state, status) {
      const index = state.statuses.findIndex(el => el === status);
      state.statuses.splice(index, 1);
    }
  }
};
