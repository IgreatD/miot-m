import { appConfig } from '@/config/config';

/**
 * 跳转视频播放
 * @param {String} url 视频地址
 * @param {String} title 视频标题
 */
export const jumpVideo = ({ url, title }) => {
  uni.setStorageSync('video', { url, title });
  // uni.navigateTo({
  //   url: `/pages/media-preview/video-preview?key=video`,
  //   complete: () => {
  //     //
  //   },
  // });
};

/**
 * 预览文件
 * @param {String} url 文件地址
 * @param {String} title 文件标题
 * @param {String} type 文件类型
 */
export const previewFile = ({ url, title, type }) => {
  url = appConfig.baseUrl + '/file/' + url;
  switch (type) {
    case 'VIDEO':
      jumpVideo({ url, title });
      break;
    case 'IMAGE':
      uni.previewImage({
        current: url,
        urls: [url],
      });
      break;
    default:
      // 下载文件
      // #ifdef H5
      window.open(url);
      // #endif
      // #ifdef APP-PLUS
      uni.showLoading({
        title: '文件加载中...',
      });
      uni.downloadFile({
        url: url,
        success: (res) => {
          console.log('打开文件成功：', res);
          if (res.statusCode === 200) {
            plus.runtime.openFile(res.tempFilePath);
          }
        },
        complete: () => {
          uni.hideLoading();
        },
      });
      // #endif
      break;
  }
};

/**
 * 根据 fileCategory 获取文件图标
 * @param {String} fileCategory 文件类型
 */
export const getFileIcon = (fileCategory) => {
  let icon = '';
  let color = '';
  switch (fileCategory) {
    case 'VIDEO':
      icon = 'mp4';
      color = '9053ff';
      break;
    case 'IMAGE':
      icon = 'png';
      color = 'f7b51c';
      break;
    case 'WORD':
      icon = 'word';
      color = '5487ff';
      break;
    case 'EXCEL':
      icon = 'exel';
      color = '62c558';
      break;
    case 'PDF':
      icon = 'pdf';
      color = 'f78132';
      break;
    default:
      icon = 'a-1';
      color = 'dbdbdb';
      break;
  }
  return { icon, color: '#' + color };
};
