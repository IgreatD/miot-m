/**
 * 提交或更新任务
 * @param {*} data
 */
export function saveTask(data) {
  return uni.$http.post('/repair/task/add', data);
}

/**
 * 获取任务类型列表
 */
export function getTaskTypeList() {
  return uni.$http.get('/repair/taskType/list');
}

/**
 * 获取责任区域列表
 */
export function getTaskAreaList() {
  return uni.$http.get('/repair/taskLiabilityArea/list');
}

/**
 * 通过责任区域id和任务类型id获取责任人列表
 * @param {*} params { areaId: 责任区域id, taskTypeId: 任务类型id }
 */
export function getTaskPersonList(params) {
  return uni.$http.get('/repair/taskAreaUser/list', { params });
}

/**
 * 获取任务列表
 */
export function getTaskList(params) {
  return uni.$http.get('/repair/task/list', { params });
}

/**
 * 接单
 * @param {*} id 任务id
 * @param {*} handlePersonId 用户id
 */
export function acceptTask({ id, handlePersonId }) {
  return uni.$http.post('/repair/task/confirm', {
    id,
    handlePersonId,
  });
}

/**
 * 转单
 * @param {*} sourceTaskId 原任务单id
 * @param {*} targetHandlerId 新处理人员id
 * @param {*} areaId 区域id
 */
export function transferTask({ sourceTaskId, targetHandlerId, areaId }) {
  return uni.$http.get('/repair/task/transfer', {
    params: { sourceTaskId, targetHandlerId, areaId },
  });
}

/**
 * 撤销
 * @param {*} id 任务id
 */
export function revokeTask({ id }) {
  return uni.$http.get('/repair/task/revoke', {
    params: { id },
  });
}

/**
 * 删除
 * @param {*} id 任务id
 */
export function deleteTask(id) {
  return uni.$http.delete(
    '/repair/task/handle',
    {},
    {
      params: { id },
    },
  );
}

/**
 * 驳回
 * @param {*} id 任务id
 * @param {*} isSuccess 是否完成
 * @param {*} handleScore 处理分数
 * @param {*} handleComment 处理意见
 */
export function rejectTask({ id, isSuccess = false, handleScore = 0, handleComment }) {
  return uni.$http.post('/repair/task/score', {
    id,
    isSuccess,
    handleScore: handleScore + '',
    handleComment,
  });
}

/**
 * 上报
 * @param {*} id 任务id
 * @param {*} handlePersonId 用户id
 * @param {*} handleImage 处理图片
 * @param {*} handleDesc 处理意见
 * @param {*} totalTime 总耗时
 */
export function reportTask({ id, handlePersonId, totalTime, handleImage, handleDesc }) {
  return uni.$http.post('/repair/task/success/commit', {
    id,
    handleImage,
    handleDesc,
    totalTime,
    handlePersonId,
  });
}

/**
 * 确认
 * @param {*} id 任务id
 * @param {*} isSuccess 是否完成
 * @param {*} handleScore 处理分数
 * @param {*} handleComment 处理意见
 */
export function confirmTask({ id, isSuccess, handleScore, handleComment }) {
  return uni.$http.post('/repair/task/score', {
    id,
    isSuccess,
    handleScore: handleScore + '',
    handleComment,
  });
}

/**
 * 获取任务详情
 * @param {*} id 任务id
 */
export function getTaskDetail(id) {
  return uni.$http.get('/repair/task/detail', { params: { id } });
}

/**
 * 获取未处理的任务列表
 * @param {*} pageNum 页码
 * @param {*} size 每页条数
 */
export function getUnhandleTaskList({ pageNum, size }) {
  return uni.$http.get('repair/task/noProcess', {
    params: { pageNum, size },
  });
}

/**
 * 获取已处理的任务列表
 * @param {*} pageNum 页码
 * @param {*} size 每页条数
 */
export function getHandledTaskList({ pageNum, size }) {
  return uni.$http.get('/repair/task/process', {
    params: { pageNum, size },
  });
}

/**
 * 获取工单列表
 * @param {*} pageNum 页码
 * @param {*} size 每页条数
 */
export function getWorkOrderList({ pageNum, pageSize, taskStatus }) {
  // return uni.$http.get("/repair/task/all", {
  //   params: { pageNum, size ,taskStatus},
  // });
  return uni.$http.post('/repair/task/list', { pageNum, pageSize, taskStatus });
}

/**
 * 获取创建记录列表
 * @param {*} pageNum 页码
 * @param {*} size 每页条数
 */
export function getCreateList({ pageNum, size }) {
  return uni.$http.get('/repair/task/create', {
    params: { pageNum, size },
  });
}
