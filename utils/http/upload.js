import { appConfig } from '@/config/config';
import { getProject, getToken } from '@/utils/auth';
export function uploadFile(filePath, option = {}) {
  return new Promise((res, rej) => {
    const uploadUrl = '/datashare/file/upload';
    const uploadTask = uni.uploadFile({
      // #ifdef APP-PLUS
      url: appConfig.baseUrl + uploadUrl,
      // #endif
      header: {
        tenant: getProject()?.tenantCode || '',
        projectId: getProject()?.id || '',
        token: getToken(),
      },
      // #ifdef H5
      // eslint-disable-next-line no-dupe-keys
      url: '/baseService' + uploadUrl,
      // #endif
      filePath: filePath,
      name: 'uploadFile',
      success: async (uploadFileRes) => {
        console.log(uploadFileRes);
        if (uploadFileRes.statusCode == 200) {
          const payload = JSON.parse(uploadFileRes.data);
          if (payload.code == 0) {
            if (option.success) {
              option.success(payload.data);
            }
            res(payload.data);
          } else {
            rej({
              message: '上传失败',
            });
          }
        } else {
          rej({
            message: '上传失败',
          });
        }
      },
      fail: (err) => {
        console.log(err);
        if (option.fail) {
          option.fail(err);
        }
        rej(err);
      },
    });
    uploadTask.onProgressUpdate((res) => {
      if (typeof option.onUploadProgress === 'function') {
        option.onUploadProgress(res.progress);
      }
    });
  });
}
