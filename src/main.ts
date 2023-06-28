import { createApp } from 'vue'
import './assets/style/index.css'
import App from './App.vue'
import { pinia } from './stores';

const app = createApp(App);

app
  .use(pinia)
  .mount('#app')
