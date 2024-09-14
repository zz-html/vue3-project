import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 局域网别人也可访问
    port: 5000,    
    proxy: {
      // 配置反向代理
      '/v1/traces': {
        target: 'http://zzdev.asia:4318', // 后端 API 地址
        changeOrigin: true,
        pathRewrite: {
          '^/v1/traces': '/v1/traces'
        }
      },
      '/demo': {
        target: 'http://127.0.0.1:8080', // 后端 API 地址
        changeOrigin: true,
        pathRewrite: {
          '^/demo': '/demo'
        }
      },
    },  
  }
})
