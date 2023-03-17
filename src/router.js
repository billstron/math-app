import { createRouter, createWebHashHistory } from 'vue-router';

import ChallengeSelection from './module/challenge-selection/index.vue';
import Challenge from './module/challenge/index.vue';
import ChallengeResult from './module/challenge-result/index.vue';

const routes = [{
  path: '/',
  component: ChallengeSelection,
  name: 'Selection',
}, {
  path: '/challenge/:mathType',
  component: Challenge,
  name: 'Challenge',
}, {
  path: '/challenge/:mathType/result',
  component: ChallengeResult,
  name: 'Results',
},];

const router = createRouter({
  history : createWebHashHistory(),
  routes,
});

export default router;
