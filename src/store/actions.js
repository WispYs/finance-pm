import api from '@/api/api';

export default {
  TOGGLE_SIDEBAR({ commit }, collapse) {
    commit('SET_SIDEBAR_COLLAPSE', { collapse });
  },

  SAVE_USER({ commit }, user) {
    commit('SET_USER', { user });
  },

  LOGIN({ commit }) {
    const token = localStorage.getItem('FINANCE_TOKEN');
    api.fetchUserLogin({ token })
      .then(rep => {
        let user = rep.data;
        console.log(rep.data)
        if(user) {
          commit('SET_USER', { user });
        }

      })
      .catch(err => console.log(err))

  }
};
