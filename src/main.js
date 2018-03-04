
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import routerConfig from './router-config';

Vue.config.productionTip = false;
Vue.use(VueRouter);
const router = new VueRouter({
  routes:routerConfig
});
new Vue({
  el: '#app',
  router,
   render: h => h(App),
})
