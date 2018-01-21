import VueRouter from 'vue-router';

import Home from './module/home/index.vue';
import Challenge from './module/challenge/index.vue';
import ChallengeResult from './module/challenge-result/index.vue';

const routes = [{
  path: '/',
  component: Home,
}, {
  path: '/challenge/:mathType',
  component: Challenge,
}, {
  path: '/challenge/:mathType/result',
  component: ChallengeResult,
},];


const router = new VueRouter({ routes });

export default router;
