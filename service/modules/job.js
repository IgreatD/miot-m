/**
 * 获取未完成巡检任务列表
 * @returns
 */
export const getUnHandleJobList = () => {
  return uni.$http.get('/repair/jobTask/listTasksByUserId');
};

/**
 * 获取已完成巡检任务列表
 */
export const getHandledJobList = ({ pageNum = 1, pageSize = 10, jobTaskStatus = 'FINISH' }) => {
  return uni.$http.post('/repair/jobTask/list', {
    pageNum,
    pageSize,
    jobTaskStatus,
  });
};

/**
 * 转单
 * @param {String} taskId 巡检任务id
 * @param {String} userId 转单人id
 * @param {String} receiveId 接单人id
 */
export const transferJob = ({ taskId, userId, receiveId }) => {
  return uni.$http.post('/repair/jobTask/transfer', {
    taskId,
    userId,
    receiveId,
  });
};

/**
 * 同步巡检任务
 */
export const syncJob = (params) => {
  return uni.$http.post('/repair/jobTask/commit', params);
};
