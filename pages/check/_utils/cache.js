import { getUser } from '@/utils/auth';
import { hasOwn } from '@/utils/index.js';
// 定义未完成任务列表缓存key
export const unfinishedTaskListKey = 'unfinishedTaskList8';
// 定义设备树缓存key
export const deviceTreeKey = 'deviceTree';
// 定义区域列表缓存key
export const areaListKey = 'areaList';
// 定义故障类型列表缓存key
export const faultTypeListKey = 'faultTypeList';
// 定义维修人员列表缓存key
export const repairerListKey = 'repairerList';
// 定义工单属性列表缓存key
export const attrListKey = 'attrList';

// 缓存未完成任务列表
export const setUnfinishedTaskList = (data) => {
  // 获取缓存的数据
  const cacheData = uni.getStorageSync(unfinishedTaskListKey) || [];
  if (cacheData.length) {
    for (let i = 0; i < data.length; i++) {
      let el = data[i];
      for (let j = 0; j < cacheData.length; j++) {
        let cacheItem = cacheData[j];
        if (cacheItem.id === el.id) {
          const cacheNoProcessModule = cacheItem.noProcessModule;
          const noProcessModule = el.noProcessModule;
          if (cacheNoProcessModule.length) {
            for (let k = 0; k < noProcessModule.length; k++) {
              let noProcessModuleItem = noProcessModule[k];
              for (let l = 0; l < cacheNoProcessModule.length; l++) {
                let cacheNoProcessModuleItem = cacheNoProcessModule[l];
                if (cacheNoProcessModuleItem.id === noProcessModuleItem.id) {
                  if (cacheNoProcessModuleItem.normal) {
                    noProcessModuleItem.normal = cacheNoProcessModuleItem.normal;
                    // 改变 el 状态
                    el.status = cacheItem.status;
                  }
                  const cacheJobTemplateList = cacheNoProcessModuleItem.jobTemplateList;
                  const jobTemplateList = noProcessModuleItem.jobTemplateList;
                  if (cacheJobTemplateList.length) {
                    for (let m = 0; m < jobTemplateList.length; m++) {
                      let jobTemplateListItem = jobTemplateList[m];
                      for (let n = 0; n < cacheJobTemplateList.length; n++) {
                        let cacheJobTemplateListItem = cacheJobTemplateList[n];
                        if (
                          cacheJobTemplateListItem.id === jobTemplateListItem.id &&
                          cacheJobTemplateListItem.formData
                        ) {
                          jobTemplateListItem.formData = cacheJobTemplateListItem.formData;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  uni.setStorageSync(unfinishedTaskListKey, data);
};

// 获取未完成任务列表
export const getUnfinishedTaskList = () => {
  return uni.getStorageSync(unfinishedTaskListKey) || [];
};

// 根据id获取noProcessModule list
export const getNoProcessModuleListById = (id) => {
  const list = getUnfinishedTaskList();
  console.log(list, id);
  const task = list.find((item) => item.id === id);
  console.log(task);
  // return task ? task.noProcessModule : [];
  // 过滤掉不包含normal字段的模块
  return task ? task.noProcessModule.filter((item) => !hasOwn(item, 'normal')) : [];
};

// 根据id和moduleId获取 jobTemplateList
export const getJobTemplateListByIdAndModuleId = (id, moduleId) => {
  const list = getUnfinishedTaskList();
  const task = list.find((item) => item.id === id);
  const module = task.noProcessModule.find((item) => item.id === moduleId);
  return module ? module.jobTemplateList : [];
};

// 根据id、moduleId、jobTemplateId获取 jobTemplate，设置到formData中
export const setRepairFormData = (id, moduleId, jobTemplateId, formData) => {
  const list = getUnfinishedTaskList();
  const task = list.find((item) => item.id === id);
  const module = task.noProcessModule.find((item) => item.id === moduleId);
  if (module && module.jobTemplateList) {
    const jobTemplate = module.jobTemplateList.find((item) => item.id === jobTemplateId);
    if (jobTemplate) {
      jobTemplate.formData = formData;
    }
  }
  task.status = {
    code: 'HANDLING',
    desc: '处理中',
  };
  // 设置到缓存中
  uni.setStorageSync(unfinishedTaskListKey, list);
};

// 根据id、moduleId、jobTemplateId获取 jobTemplate，删除formData
export const deleteRepairFormData = (id, moduleId, jobTemplateId) => {
  const list = getUnfinishedTaskList();
  const task = list.find((item) => item.id === id);
  const module = task.noProcessModule.find((item) => item.id === moduleId);
  if (module && module.jobTemplateList) {
    const jobTemplate = module.jobTemplateList.find((item) => item.id === jobTemplateId);
    if (jobTemplate) {
      delete jobTemplate.formData;
    }
  }
  // TODO:还需判断是否还有其他的formData
  // task.status = {
  //   code: 'NOT_FINISH',
  //   desc: '待处理',
  // };
  // 设置到缓存中
  uni.setStorageSync(unfinishedTaskListKey, list);
};

// 根据id、moduleId，设置当前module normal
export const setModuleNormal = (id, moduleId, normal) => {
  const list = getUnfinishedTaskList();
  const task = list.find((item) => item.id === id);
  const module = task.noProcessModule.find((item) => item.id === moduleId);
  if (module) {
    module.normal = normal ? 1 : -1;
  }
  // 判断module的jobTemplateList是否至少有一个formData
  const jobTemplateList = module.jobTemplateList;
  if (jobTemplateList.length) {
    module.normal = jobTemplateList.some((item) => item.formData) ? 1 : -1;
  }
  // 设置到缓存中
  task.status = {
    code: 'HANDLING',
    desc: '处理中',
  };
  uni.setStorageSync(unfinishedTaskListKey, list);
};

// 从缓存中筛选出状态为处理中、jobTemplateList中有formData的任务
export const getProcessingTaskList = (id) => {
  const list = getUnfinishedTaskList();
  const task = list.find((item) => item.id === id && item.status.code === 'HANDLING');
  let payload = [];
  if (task) {
    const noProcessModule = task.noProcessModule;
    if (noProcessModule.length) {
      for (let i = 0; i < noProcessModule.length; i++) {
        let noProcessModuleItem = noProcessModule[i];
        const jobTemplateList = noProcessModuleItem.jobTemplateList;
        if (jobTemplateList.length) {
          for (let j = 0; j < jobTemplateList.length; j++) {
            let jobTemplateListItem = jobTemplateList[j];
            if (jobTemplateListItem.formData) {
              payload.push({
                ...jobTemplateListItem,
                jobName: noProcessModuleItem.name,
                deviceId: noProcessModuleItem.deviceId,
                taskId: task.id,
                jobId: noProcessModuleItem.id,
              });
            }
          }
        }
      }
    }
  }
  return payload;
};

// 继续执行
export const continueTask = (id, moduleId, deviceId) => {
  // 通过taskId获取任务
  const list = getUnfinishedTaskList();
  const task = list.find((item) => item.id === id);
  // 判断module是否是最后一个模块
  const isLastModule = task.noProcessModule[task.noProcessModule.length - 1].id === moduleId;
  // 如果是最后一个，结束任务
  if (isLastModule) {
    return;
  } else {
    // 返回下一个模块的id
    const nextModuleId =
      task.noProcessModule[task.noProcessModule.findIndex((item) => item.id === moduleId) + 1].id;
    // 通过nextModuleId获取下一个模块
    const nextModule = task.noProcessModule.find((item) => item.id === nextModuleId);
    // 判断下一个模块是否有jobTemplateList
    if (nextModule.deviceId === deviceId && nextModule.jobTemplateList.length) {
      return nextModuleId;
    }
  }
};

// 获取提交任务的参数，根据是否有normal，以及是否有formData
export const getSubmitTaskParams = (id) => {
  const list = getUnfinishedTaskList();
  const task = list.find((item) => item.id === id);
  const noProcessModule = task.noProcessModule;
  // 获取userId
  const userId = getUser().userId;
  let payload = {
    id: task.id,
    executor: userId,
    detailCommit: [],
  };
  if (noProcessModule.length) {
    for (let i = 0; i < noProcessModule.length; i++) {
      let noProcessModuleItem = noProcessModule[i];
      if (hasOwn(noProcessModuleItem, 'normal')) {
        if (noProcessModuleItem.normal === -1) {
          payload.detailCommit.push(
            ...noProcessModuleItem.jobTemplateList.map((item) => {
              return {
                jobTemplateId: item.id,
                normal: true,
              };
            }),
          );
        } else {
          const jobTemplateList = noProcessModuleItem.jobTemplateList;
          if (jobTemplateList.length) {
            for (let j = 0; j < jobTemplateList.length; j++) {
              let jobTemplateListItem = jobTemplateList[j];
              if (jobTemplateListItem.formData) {
                payload.detailCommit.push({
                  normal: false,
                  jobTemplateId: jobTemplateListItem.id,
                  repairTask: jobTemplateListItem.formData,
                });
                delete jobTemplateListItem.formData;
              }
            }
          }
        }
        delete noProcessModuleItem.normal;
      }
    }
  }
  uni.setStorageSync(unfinishedTaskListKey, list);
  return payload;
};

// 从服务获取设备树
export const getDeviceTree = async () => {
  const res = await uni.$service.deviceService.getDeviceTree();
  const payload = res.map((item) => {
    item.children = item.children.map((el) => {
      return {
        value: el.id,
        label: el.name,
      };
    });
    return {
      value: item.id,
      label: item.name,
      children: item.children,
    };
  });
  uni.setStorageSync(deviceTreeKey, payload);
};

// 从服务获取区域列表
export const getAreaList = async () => {
  const res = await uni.$service.repairService.getTaskAreaList();
  const payload = res.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  uni.setStorageSync(areaListKey, payload);
};

// 从服务获取故障类型列表
export const getFaultTypeList = async () => {
  const res = await uni.$service.repairService.getTaskTypeList();
  const payload = res.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  uni.setStorageSync(faultTypeListKey, payload);
};

// 从服务获取工单属性列表
export const getAttrList = async () => {
  const res = await uni.$service.repairService.getAttrList();
  const payload = res.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  uni.setStorageSync(attrListKey, payload);
};
// 从服务获取维修人员列表
export const getAreaUserList = async () => {
  const res = await uni.$service.repairService.getAreaUserList();
  uni.setStorageSync(repairerListKey, res);
};

// 获取缓存的设备树
export const getDeviceTreeCache = () => {
  return uni.getStorageSync(deviceTreeKey) || [];
};

// 获取缓存的区域列表
export const getAreaListCache = () => {
  return uni.getStorageSync(areaListKey) || [];
};

// 获取缓存的故障类型列表
export const getFaultTypeListCache = () => {
  return uni.getStorageSync(faultTypeListKey) || [];
};

// 获取缓存的工单属性列表
export const getAttrListCache = () => {
  return uni.getStorageSync(attrListKey) || [];
};

// 获取缓存的维修人员列表
export const getRepairerListCache = () => {
  return uni.getStorageSync(repairerListKey) || [];
};

// 初始化缓存数据
export const initCacheData = () => {
  Promise.all([
    getDeviceTree(),
    getAreaList(),
    getFaultTypeList(),
    getAttrList(),
    getAreaUserList(),
  ]).then(() => {
    console.log('缓存数据成功');
  });
};
