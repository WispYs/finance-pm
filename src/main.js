import Vue    from 'vue';
import App    from './App';
import router from './router';
import store  from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('FINANCE_TOKEN');
  if(to.path === '/') {
    // 登出时删除本地用户记录
    localStorage.removeItem('FINANCE_TOKEN');
    localStorage.removeItem('FINANCE_USERID');
    next();
  }else {
    if(token) {
      next();
    }else {
      next({
        path:'/'
      })
    }
  }
});

store.dispatch('LOGIN');

