import { createApp } from 'vue'
import './assets/style/index.css'
import App from './App.vue'
import { pinia } from './stores';
import { router } from './router';

const app = createApp(App);

app
  .use(pinia)
  .use(router)
  .mount('#app')
