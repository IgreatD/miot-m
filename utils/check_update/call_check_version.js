export default function callCheckVersion() {
  // #ifdef APP-PLUS
  return new Promise((resolve, reject) => {
    plus.runtime.getProperty(plus.runtime.appid, function (widgetInfo) {
      console.log(widgetInfo);
      uni.$http
        .get(`/repair/phone/latest`, {
          params: {
            phoneType: plus.os.name.toUpperCase() === 'IOS' ? 'IOS' : 'APK',
            versionName: widgetInfo.version,
          },
        })
        .then((res) => {
          resolve({
            ...res,
            runtimeVersion: widgetInfo.version,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
  // #endif
  // #ifndef APP-PLUS
  // eslint-disable-next-line no-unreachable
  return new Promise((resolve, reject) => {
    uni.$http
      .get(`/repair/phone/latest`, {
        params: {
          phoneType: 'APK',
          versionName: '1.0.1',
        },
      })
      .then((res) => {
        resolve({
          ...res,
          runtimeVersion: '1.0.1',
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  // #endif
}
