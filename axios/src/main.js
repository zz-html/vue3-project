import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import request from './utils/request';

const app = createApp(App);
app.config.globalProperties.$api = request;

app.mount('#app')
