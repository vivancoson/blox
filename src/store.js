import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    yamlViewerOpen: false,
  },
  mutations: {
    switchViewerOpen(state) {
      state.yamlViewerOpen = !state.yamlViewerOpen;
    },
    setViewerOpen(state, boolean) {
      state.yamlViewerOpen = boolean;
    },
  },
  actions: {},
});
