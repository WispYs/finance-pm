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
  if (token) { // 判断当前的token是否存在 ； 登录存入的token
    next();
  }
  else {
    if(to.path === '/'){
      next();
    }else {
      next({
        path:'/'
      })
    }

  }
});
store.dispatch('LOGIN');

