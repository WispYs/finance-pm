
import api from '@/api/api'

export default {
  SET_SIDEBAR_COLLAPSE(state, { collapse }) {
    state.sidebarCollapse = collapse;
  },

  SET_USER(state, { user }) {
    state.user = user;
  },

};
