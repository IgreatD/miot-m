/**
 * vite 配置文件
 * 官网：https://cn.vitejs.dev/config/
 */
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImport from 'unplugin-auto-import/vite';
let uniPlugin = uni();

export default defineConfig({
  // 代理
  server: {
    proxy: {
      '/baseService': {
        target: 'http://172.16.50.51:3100/baseService',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/baseService/, ''),
      },
    },
  },

  plugins: [
    uniPlugin,
    AutoImport({
      imports: ['vue', 'pinia', 'uni-app'],
      vueTemplate: false,
      dts: 'auto-imports.d.ts',
      eslintrc: {
        enabled: false,
      },
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
