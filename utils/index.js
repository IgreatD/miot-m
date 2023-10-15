import * as dateUtils from './date';
import * as uniUtils from './uni';

uni.$dateUtils = dateUtils;
uni.$uniUtils = uniUtils;

// Vue实例挂载
const install = (app) => {
  app.config.globalProperties.$dateUtils = dateUtils;
  app.config.globalProperties.$uniUtils = uniUtils;
};

export default {
  install,
};

// 对象是否包含某个属性
export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
