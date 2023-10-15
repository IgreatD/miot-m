// 存储一些全局配置，比如接口地址等
let getStorage = false;
const config_key = 'config';

const ips = ['http://117.158.214.190:19281', 'http://172.16.50.51:3100'];

// 默认配置
const appConfig = {
  baseUrl: ips[1], // 服务器地址
  fileUrl: 'http://172.16.50.221:8000/file/',
  appName: '兮睿 | MIOT', // 应用名称
  appDesc: '数字孪生应用平台', // 应用描述
};

// 把配置存储到 storage 中
function setConfig(config) {
  // 把config对应的属性值，赋值给appConfig
  Object.assign(appConfig, config);

  uni.setStorageSync(config_key, config);
}

// 从 storage 中获取配置
function getConfig() {
  const config = uni.getStorageSync(config_key);
  if (config) {
    return config;
  }
  return appConfig;
}

export { appConfig, setConfig, getConfig, ips };
