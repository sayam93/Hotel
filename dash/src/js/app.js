import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store.js';
import VueFullscreen from 'vue-fullscreen'


const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueFullscreen)

app.mount('#app');