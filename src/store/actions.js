import api from '@/api/api';
import router from '@/router'

export default {
  TOGGLE_SIDEBAR({ commit }, collapse) {
    commit('SET_SIDEBAR_COLLAPSE', { collapse });
  },

  SAVE_USER({ commit }, user) {
    commit('SET_USER', { user });
  },

  LOGIN({ commit }) {
    const token = localStorage.getItem('FINANCE_TOKEN');
    if(token) {
      api.fetchUserLogin({ token })
      .then(rep => {
        let user = rep.data;
        if(user) {
          commit('SET_USER', { user });
        }

      })
      .catch(err => this.$message.error(err))
    }else {
      console.log('-------no token------')
      router.push({ name: 'login' })
    }


  }
};
