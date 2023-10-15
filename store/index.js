import { reactive, computed } from 'vue';

import { defineStore } from 'pinia';
import { getConfig, ips, setConfig } from '@/config/config';
import { useUserStore } from '@/store/modules/user';

const handleLogout = () => {
  useUserStore().logout();
};

/**
 * 应用配置
 */
export const useAppStore = defineStore('app', () => {
  const appConfig = ref(getConfig());

  // 计算属性，获取应用的基础地址
  const appBaseUrl = computed(() => appConfig.value.baseUrl);

  // 是否内网环境
  const isInner = computed(() => {
    return ips[1] === appConfig.value.baseUrl;
  });

  const setIpIndex = (index) => {
    uni.showModal({
      title: '提示',
      content: '切换内外网后，需要重新登录',
      success: (res) => {
        if (res.confirm) {
          appConfig.value.baseUrl = ips[index];
          setConfig(appConfig.value);
          appConfig.value = getConfig();
          // 跳转到登录页面
          handleLogout();
        }
      },
    });
  };

  return {
    appConfig,
    appBaseUrl,
    setIpIndex,
    isInner,
  };
});
