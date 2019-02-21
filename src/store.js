import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    endpointurl: null,
    query: null,
    variables: [],
    bindings: []
  },
  getters: {
    endpointurl(state) {
      return state.endpointurl;
    },
    query(state) {
      return state.query;
    },
    /*
    variables(state, getters) {
      var query = getters.query;
      if (query == '') {
        return [];
      }
      var regexp = /(\?\S*?)[\s\)\.]/g;
      var match;
      var matchSet = new Set();

      while ((match = regexp.exec(query)) != null) {
        matchSet.add(match[1]);
      }

      return [...matchSet];
    },
    */
    variables(state) {
      return state.variables;
    },
    bindings(state) {
      return state.bindings;
    }
  },
  mutations: {
    endpointurl(state, endpointurl) {
      state.endpointurl = endpointurl;
    },
    query(state, query) {
      state.query = query;
    },
    variables(state, variables){
      state.variables = variables;
    },
    bindings(state, bindings) {
      state.bindings = bindings;
    }
  },
  actions: {
    // query execution should go here
  }
});
