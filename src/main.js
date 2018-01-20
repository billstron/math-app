// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';

import router from './router';

Vue.use(VueRouter);
Vue.use(VueCookie);

const app = new Vue({
  router
}).$mount('#app');
