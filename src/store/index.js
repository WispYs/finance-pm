import Vue  from 'vue';
import Vuex from 'vuex';

import actions   from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebarCollapse: false,
    user: null
  },
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
});
