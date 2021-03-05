import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import globalStore, { GlobalStoreKey } from '@/store';

createApp(App)
  .provide(GlobalStoreKey, globalStore())
  .use(router)
  .mount('#app');
