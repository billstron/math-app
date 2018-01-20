import VueRouter from 'vue-router';

import Home from './module/home/index.vue';
import MultiChallenge from './module/multiplication-challenge/index.vue';
import MultiChallengeResult from './module/multiplication-challenge-result/index.vue';

const routes = [{
  path: '/',
  component: Home,
}, {
  path: '/multiplication/challenge',
  component: MultiChallenge,
}, {
  path: '/multiplication/challenge/result',
  component: MultiChallengeResult,
},];


const router = new VueRouter({ routes });

export default router;
