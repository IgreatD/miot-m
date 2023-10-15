// 引入 luch-request
import luchRequest from 'luch-request';
import { getRefreshToken, getToken, getUser, getProject, setRefreshToken, setToken } from '../auth';
// 引入 uploadFile
import { uploadFile } from './upload';
// 引入 appConfig
import { appConfig } from '@/config/config';
//不需要userId的白名单
const noUserWhiteList = [
  '/repair/task/all',
  '/repair/task/list',
  // '/repair/maintainTask/handle/transfer',
  '/device/device/deviceTree',
  '/repair/maintainTask/list',
];
const whiteList = [
  '/system/defTenant/all',
  '/system/baseProject/projects',
  '/system/defUser/username',
  '/system/defUser/password',
  '/system/defUser/userImg',
  '/system/projectRole/user/resIds',
  '/repair/phone/latest',
];
// 创建请求实例
const http = new luchRequest();

// 配置请求实例
http.setConfig((config) => {
  // 配置请求根路径
  config.baseURL = appConfig.baseUrl + '/baseService';
  // #ifdef H5
  config.baseURL = '/baseService';
  // #endif
  // 配置timeout
  config.timeout = 10000;
  // 配置自定义参数
  config.custom = {
    loading: true,
    // 自定义解析数据
    parse: false,
  };
  return config;
});

// 配置请求拦截器
http.interceptors.request.use(
  (config) => {
    // 添加token
    const token = getToken();
    if (token) {
      config.header.token = token;

      if (whiteList.includes(config.url)) {
        delete config.header.projectId;
        delete config.header.tenant;
      } else {
        config.header.tenant = getProject().tenantCode;
        config.header.projectId = getProject().id;
      }
      // console.log('config',config)

      // 获取用户信息
      const userInfo = getUser();
      if (userInfo) {
        const userId = noUserWhiteList.includes(config.url) ? null : userInfo.userId;
        // get 请求添加参数
        if (config.method === 'GET') {
          config.params = {
            ...config.params,
            userId,
          };
        } else if (config.method === 'POST') {
          // post 请求添加参数
          config.data = {
            ...config.data,
            userId,
          };
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//
let noToastUrls = ['/repair/phone/latest'];

// 配置响应拦截器
http.interceptors.response.use(
  (response) => {
    // 是否自定义解析数据
    if (response.config.custom.parse) {
      return response.data;
    }
    // 返回响应结果
    const data = response.data;
    // 根据返回的code值来做不同的处理（和后端约定）
    if (data.code == 0) {
      return data.data;
    } else if (response.statusCode == 401) {
      return errorHandle(data);
    } else {
      if (noToastUrls.some((e) => e !== response.config.url) && [-1, -9].includes(data.code)) {
        uni.showToast({
          title: data.msg,
          icon: 'none',
        });
      }
      console.log(data);
      return Promise.reject(data);
    }
  },
  (error) => {
    console.log(error);
    return errorHandle(error);
  },
);

// 定义是否处于刷新token状态
let isRefreshing = false;
// 定义刷新token的请求队列
let failedQueue = [];

// 处理刷新token的请求队列
function processQueue(error) {
  failedQueue.forEach((cb) => cb(error));
  failedQueue = [];
}

// 请求失败后的错误统一处理
async function errorHandle(error) {
  // 是否处于刷新token状态
  if (isRefreshing) {
    // 将请求添加到队列中
    return new Promise((resolve) => {
      failedQueue.push(() => {
        resolve(http.request(error.config));
      });
    });
  }

  // 获取refresh_token
  const refreshToken = getRefreshToken();
  // 判断refresh_token是否存在
  if (!refreshToken) {
    // 不存在，跳转到登录页面
    showConfirm();
    return Promise.reject(error);
  }

  isRefreshing = true;
  // 处理刷新token
  return new Promise((resolve) => {
    http
      .post('/system/defUser/login', {
        refreshToken,
        grantType: 'REFRESH_TOKEN',
      })
      .then((res) => {
        // 刷新token成功后，将所有请求队列中的请求重新发出
        setRefreshToken(res.refreshToken);
        setToken(`Bearer ${res.token}`);
        processQueue(res);
        resolve(res);
      })
      .catch((err) => {
        // 刷新token失败，将所有请求队列中的请求重新发出
        processQueue(err);
        resolve(err);
      })
      .finally(() => {
        isRefreshing = false;
      });
  });
}

// 导航到登录页面确认弹窗
function showConfirm() {
  // 判断是否已经在登录页面
  // if (uni.getPages().some((page) => page.route === 'pages/login/login')) {
  //   return;
  // }
  // 判断是否已经弹出过登录确认弹窗
  if (!showConfirm.isShow) {
    showConfirm.isShow = true;
    uni.showModal({
      title: '提示',
      content: '登录失效，请重新登录',
      showCancel: false,
      success: (res) => {
        if (res.confirm) {
          // 跳转到登录页面
          uni.navigateTo({
            url: '/pages/login/login',
          });
        }
      },
      complete: () => {
        showConfirm.isShow = false;
      },
    });
  }
}

// uni实例挂载
uni.$http = http;

uni.$upload = uploadFile;

// Vue实例挂载
const install = (app) => {
  app.config.globalProperties.$http = http;
};

// 导出请求实例
export default {
  install,
};
