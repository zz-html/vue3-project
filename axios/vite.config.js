import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 局域网别人也可访问
    port: 5000,    
    proxy: {
      // 配置反向代理
      '/remote-server': {
        target: 'http://ruijie.asia:18080', // 后端 API 地址
        changeOrigin: true,
        pathRewrite: {
          '^/remote-server': '/remote-server', 
        },
      },
    },  
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },   
})
