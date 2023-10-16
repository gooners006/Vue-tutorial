import './assets/main.css';
import 'vue-toastification/dist/index.css';

import { createPinia } from 'pinia';
import { createApp, watch } from 'vue';
import Toast, { type PluginOptions } from 'vue-toastification';

import App from './App.vue';
import router from './router';

const options: PluginOptions = {
  // You can set your default options here
};

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Toast, options);
app.mount('#app');

watch(
  pinia.state.value.userData,
  (state) => {
    // persist the whole state to the local storage whenever it changes
    const userData = state.userData;
    localStorage.setItem('userData', JSON.stringify(userData));
  },
  { deep: true },
);
