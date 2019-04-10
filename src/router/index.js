import routes from './routes';

import Vue       from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({ 
  mode: 'history',
  routes: routes,
  scrollBehavior: () => ({ x: 0, y: 0 }) 
});
