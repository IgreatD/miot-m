/**
 * 获取设备树
 */
export function getDeviceTree() {
  return uni.$http.get('/device/device/deviceTree')
}


/**
 * 获取设备属性
 */
export function getDeviceProperty() {
  // FIXME: 设备id写死
  return uni.$http.get(
    "/device/attribute?id=6c5de35a-07b6-46ed-a796-df4ce2730092-0018e952"
  );
}

/**
 * 获取设备资料
 * @param {string} id 设备id
 * @param {string} bizType 业务类型
 */
export function getDeviceData(id, bizType = "MODEL_ATTACHMENT") {
  // FIXME: 业务类型和设备id写死
  return uni.$http.get("/file/list", {
    params: { bizType, bizId: "00a7a05a-c58d-478a-a8c3-aa4795e7f95e-0016218c" },
  });
}

/**
 * 获取历史例保工单
 * @param {*} pageNum 页码
 * @param {*} size 每页条数
 * @param {*} virtualId 虚拟id
 */
export function getHistoryWorkOrderList({ pageNum, size, deviceId }) {
  return uni.$http.get("/repair/maintainTask/device", {
    params: { pageNum, size, deviceId },
  });
}

/**
 * 获取历史维修工单
 * @param {*} pageNum 页码
 * @param {*} size 每页条数
 * @param {*} virtualId 虚拟id
 */
export function getHistoryWorkOrderListRepaire({ pageNum, size, deviceId }) {
  return uni.$http.get("/repair/repairTask/device", {
    params: { pageNum, size, deviceId },
  });
}
/**
 *获取设备属性值
 * @export
 * @param {*} deviceId
 * @return {*} 
 */
export function getDeviceRealTimeData(deviceId) {
  return uni.$http.get("/device/device/device/telemetryValues", { params: { deviceId } });
}
/**
 *deviceId
 *fileType
 * keyword
 * @export
 * @param {*} requst
 * @return {*} 
 */
export function getDeviceFileData({deviceId,fileType='DRAWING_DOCUMENT',keyword=''}) {
  return uni.$http.post("/device/device/files", {deviceId,fileType,keyword});

} 
/**
 * 获取设备监控统计数据
 */
export function queryMonitoringStatistics() {
  return uni.$http.get("/device/deviceMonitor/getDeviceAlarmStatistic");
}

/**
 * 获取设备监控点统计数据
 */
export function queryMonitoringPointStatistics() {
  return uni.$http.get('/device/deviceMonitor/getMonitorPointStatistic')
}

/**
 * 获取设备今日告警维修统计
 */
export function queryTodayMonitoringStatistics() {
  return uni.$http.get('/device/deviceMonitor/getAlarmRepairStatistic')
}


/**
 * 获取设备报警记录
 * @param {*} pageNo 页码
 * @param {*} pageSize 每页条数
 * @param {*} keyword 关键词
 * @param {*} endDate 结束时间
 * @param {*} startDate 开始时间
 * @param {*} isRecord 是否为记录
 * @param {*} timeType 周期类型
 * @param {*} status 关键词
 */
export function queryTask({pageNo,pageSize,keyword,endDate,startDate,isRecord,status}) {
  return uni.$http.post("/device/deviceMonitor/getEventByPage",{pageNo,pageSize,endDate,startDate,keyword,isRecord,status});
}
