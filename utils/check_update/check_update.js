const PACKAGE_INFO_KEY = '__package_info__';

import { appConfig } from '@/config/config';

import callCheckVersion from './call_check_version';
import compareVersion from './compare_version';

const downloadUrl = (url) => appConfig.baseUrl + '/file/' + url;

export default function () {
  return new Promise((resolve, reject) => {
    callCheckVersion()
      .then((e) => {
        const result = compareVersion(e.runtimeVersion, e.versionName);
        if (result === -1) {
          const packageInfo = {
            title: e.title,
            contents: e.content,
            is_mandatory: e.mandatory,
            platform: e.type ? [e.type.code] : [],
            url: downloadUrl(e.url),
            version: e.versionName,
            isWGT: !e.completeRelease,
          };
          console.log(packageInfo);
          uni.setStorageSync(PACKAGE_INFO_KEY, packageInfo);
          uni.navigateTo({
            url: `/pages/upgrade-popup?local_storage_key=${PACKAGE_INFO_KEY}`,
            fail: (err) => {
              console.error('更新弹框跳转失败', err);
              uni.removeStorageSync(PACKAGE_INFO_KEY);
            },
          });
          resolve(packageInfo);
        } else {
          // 已经是最新版本了
          reject({
            message: '已经是最新版本了',
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
