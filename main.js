import App from './App';
// 引入 http 模块
import http from './utils/http';
import * as Pinia from 'pinia';
// 引入 uview-ui
import uView from '/uni_modules/uview-ui/index.js';
import './utils';
import './service';

import { createSSRApp } from 'vue';
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  // 挂载 http 模块
  app.use(http);
  // 挂载 uview-ui
  app.use(uView);
  return {
    app,
    Pinia, // 挂载 pinia
  };
}
