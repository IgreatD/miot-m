/**
 * 获取文件仓库列表
 * @param {string} keyword 搜索关键字
 */
export const getFileStorageList = (keyword) => {
  return uni.$http.get("/fileStorage/list", {
    params: { keyword },
  });
};

/**
 * 获取文件目录列表
 * @param {string} keyword 搜索关键字
 * @param {string} parentId 目录id
 * @param {string} storageId 存储id
 */
export const getFileDirectoryList = ({ keyword, parentId, storageId }) => {
  return uni.$http.get("/fileDirectory/tree", {
    params: { keyword, parentId, storageId },
  });
};

/**
 * 获取绝对路径
 * @param {string} keyword 搜索关键字
 * @param {string} directoryId 目录id
 * @param {string} storageId 存储id
 */
export const getPathByDirectory = ({ keyword, directoryId, storageId }) => {
  return uni.$http.get("/fileDirectory/path/absolute", {
    params: { keyword, directoryId, storageId },
  });
};
