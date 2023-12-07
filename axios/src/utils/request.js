import axios from 'axios';
// import { ElMessage, ElMessageBox } from 'element-plus';
// import store from '@/store';
// import { localStorage } from '@/utils/storage';

const service = axios.create({
	timeout: 8000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // if (!config.headers) {
    //   throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    // }
    // const { isLogin, tokenObj } = toRefs(store.user.useUserStore());
    // if (isLogin.value) {
    //   config.headers[tokenObj.value.tokenName] = tokenObj.value.tokenValue;
    //   config.headers['TENANT_ID'] = '1';
    //   config.headers['appId'] = localStorage.get('appId');
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log("response",response);
    // const res = response.data;
    // const { code, msg } = res;
    if (response.status === 200) {
      return response;
    } else {
      // token过期
      // if (code === -1) {
      //   handleError();
      // } else {
      //   ElMessage({
      //     message: msg || '系统出错',
      //     type: 'error',
      //     duration: 5 * 1000,
      //   });
      // }
      return Promise.reject(new Error(msg || 'Error'));
    }
  },
  (error) => {
    console.log('请求异常：', error);
    // const { msg } = error.response.data;
    // if (error.response.status === 401) {
    //   handleError();
    // } else {
    //   ElMessage({
    //     message: '网络异常，请稍后再试!',
    //     type: 'error',
    //     duration: 5 * 1000,
    //   });
    //   return Promise.reject(new Error(msg || 'Error'));
    // }
  },
);

// 统一处理请求响应异常
function handleError() {
  // const { isLogin, logout } = store.user.useUserStore();
  // if (isLogin) {
  //   ElMessageBox.confirm('您的登录账号已失效，请重新登录', {
  //     confirmButtonText: '再次登录',
  //     cancelButtonText: '取消',
  //     type: 'warning',
  //   }).then(() => {
  //     logout();
  //   });
  // }
}

// 导出实例
export default service;