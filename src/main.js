import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus, faMinus, faTimes, faCheck, faClock, faHashtag, faEquals, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import App from './App.vue'
import router from './router';
import store from './store';

library.add(faPlus, faMinus, faTimes, faCheck, faClock, faHashtag, faEquals, faChevronLeft);

const app = createApp(App);

app.component('fa-icon', FontAwesomeIcon);
app.use(router);
app.use(store);
app.mount('#app');
