import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import './style.css'
import './opentelemetry'; // 引入 OpenTelemetry 配置

const app = createApp(App);
// 将 axios 挂载到全局
app.config.globalProperties.$axios = axios;
app.mount('#app');

