import { createApp } from 'vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faPlus, faMinus, faTimes, faCheck, faClock, faHashtag, faEquals } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faPlus, faMinus, faTimes, faCheck, faClock, faHashtag, faEquals);

import App from './App.vue'
import router from './router';

const app = createApp(App);

app.component('fa-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');
