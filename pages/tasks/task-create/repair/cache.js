import { onMounted, ref, watch, reactive } from 'vue';
import {
  getAreaListCache,
  getAttrListCache,
  getDeviceTreeCache,
  getFaultTypeListCache,
  getRepairerListCache,
} from '@/pages/check/_utils/cache';

const useCacheTaskCreate = (deviceId) => {
  let payloadRepairer = null;

  // 定义表单数据
  const formData = reactive({
    id: '', // 任务id
    device: {
      label: '',
      value: '',
    }, // 设备名称
    liabilityType: {
      label: '',
      value: '',
    }, // 工单属性
    area: {
      label: '',
      value: '',
    }, // 责任区域
    taskType: {
      label: '',
      value: '',
    }, // 任务类型
    repairer: {
      label: '',
      value: '',
    }, // 处理人员
    completeTimeLimit: {
      value: new Date(),
      label: '无',
    }, // 完成时限
    taskContent: '', // 任务内容
    taskPicList: [], // 任务照片
  });
  // 定义设备树
  const deviceTree = ref([]);

  // 定义责任区域列表
  const areaList = ref([]);

  // 定义任务类型列表
  const taskTypeList = ref([]);

  // 定义工单属性列表
  const attrList = ref([]);

  // 定义处理人员列表
  const repairerList = ref([]);

  // 定义完成时限列表
  const completeTimeLimitList = [
    {
      label: '无',
    },
    {
      label: '有',
    },
  ];

  // 获取设备shu
  const getDeviceTree = () => {
    deviceTree.value = getDeviceTreeCache();
    // 如果有设备id，从deviceTree中获取设备
    if (deviceId) {
      const device = getDevice(deviceTree.value, deviceId);
      console.log(device);
      if (device) {
        formData.device = device;
      }
    }
  };

  // 获取设备
  const getDevice = (tree, id) => {
    let device = null;
    for (let i = 0; i < tree.length; i++) {
      const item = tree[i];
      if (item.children && item.children.length) {
        // 循环 item.children
        for (let j = 0; j < item.children.length; j++) {
          const el = item.children[j];
          if (el.value == id) {
            device = el;
            break;
          }
        }
      }
    }
    return device;
  };

  // 获取责任区域列表
  const getAreaList = () => {
    areaList.value = getAreaListCache();
  };

  // 获取任务类型列表
  const getTaskType = () => {
    taskTypeList.value = getFaultTypeListCache();
  };

  // 获取工单属性列表
  const getAttrList = () => {
    attrList.value = getAttrListCache();
  };

  // 监听责任区域和任务类型的变化，获取处理人员列表
  watch(
    () => [formData.area.value, formData.taskType.value],
    ([areaId, taskTypeId]) => {
      // 清空处理人员列表
      repairerList.value = [];
      // 清除处理人员的值
      formData.repairer = {
        label: '',
        value: '',
      };
      // 如果责任区域和任务类型都有值，就获取处理人员列表
      if (areaId && taskTypeId) {
        getRepairer(areaId, taskTypeId);
      }
    },
  );

  // 获取处理人员列表
  const getRepairer = (areaId, taskTypeId) => {
    const cache = getRepairerListCache();
    // 根据areaId，找出repairerList对应的数据
    const area = cache.find((item) => item.id === areaId);
    // 判断area是否存在并且area的repairAreaUserList是否存在
    if (area && area.repairAreaUserList && area.repairAreaUserList.length) {
      // 筛选出fautId包含taskTypeId的数据
      const list = area.repairAreaUserList.filter(
        (item) => item.faultId && item.faultId.indexOf(taskTypeId) !== -1,
      );
      repairerList.value = list.map((item) => {
        return {
          label: item.name,
          value: item.userId,
        };
      });
      // 判断是否有payloadRepairer，并且payloadRepairer的值在处理人员列表中，如果有，就设置处理人员的值
      if (
        payloadRepairer &&
        repairerList.value.some((item) => item.value === payloadRepairer.value)
      ) {
        formData.repairer = repairerList.value.find((item) => item.value === payloadRepairer.value);
      }
    }
  };

  // 页面加载时获取数据
  function getData() {
    getDeviceTree();
    getAreaList();
    getTaskType();
    getAttrList();
  }

  // 验证表单数据
  const validateForm = () => {
    if (!formData.device.label) {
      uni.showToast({
        title: '请选择设备',
        icon: 'none',
      });

      return false;
    }
    if (!formData.liabilityType.value) {
      uni.showToast({
        title: '请选择工单属性',
        icon: 'none',
      });

      return false;
    }
    if (!formData.area.value) {
      uni.showToast({
        title: '请选择责任区域',
        icon: 'none',
      });

      return false;
    }
    if (!formData.taskType.value) {
      uni.showToast({
        title: '请选择故障类型',
        icon: 'none',
      });

      return false;
    }
    if (!formData.repairer.value) {
      uni.showToast({
        title: '请选择处理人员',
        icon: 'none',
      });

      return false;
    }
    if (!formData.taskContent) {
      uni.showToast({
        title: '请输入任务内容',
        icon: 'none',
      });

      return false;
    }
    return true;
  };

  // 提交表单
  const submitForm = () => {
    // 验证表单数据
    if (!validateForm()) {
      return;
    }
    const data = {
      id: formData.id ?? '', // 任务id
      deviceName: formData.device.label, // 设备名称
      deviceId: formData.device.value, // 设备id
      liabilityTypeId: formData.liabilityType.value, // 工单属性
      liabilityTypeName: formData.liabilityType.label, // 工单属性名称
      taskDesc: formData.taskContent, // 故障描述
      areaId: formData.area.value, // 责任区域id
      areaName: formData.area.label, // 责任区域名称
      faultId: formData.taskType.value, // 故障类型id
      faultName: formData.taskType.label, // 故障类型名称
      planFinishTime:
        formData.completeTimeLimit.label == '有'
          ? uni.$dateUtils.formatTime(formData.completeTimeLimit.date)
          : '', // 计划完成时间
      handlePersonId: formData.repairer.value, // 处理人员id
      handlePersonName: formData.repairer.label, // 处理人员名称
      descImage: formData.taskPicList.map((e) => e.id), // 故障图片
      source: 'MANUAL',
    };
    uni.showToast({
      title: '保存成功',
    });
    uni.$uniUtils.getPrevPageExposed().submitForm(data);
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  };

  const init = () => {
    const repairInfo = uni.getStorageSync('repairCacheFormData');
    console.log(repairInfo);
    uni.removeStorageSync('repairCacheFormData');
    if (repairInfo) {
      formData.device = {
        label: repairInfo.deviceName,
        value: repairInfo.deviceId,
      };
      formData.liabilityType = {
        label: repairInfo.liabilityTypeName,
        value: repairInfo.liabilityTypeId,
      };
      formData.taskContent = repairInfo.taskDesc;
      formData.area = {
        label: repairInfo.areaName,
        value: repairInfo.areaId,
      };
      formData.taskType = {
        label: repairInfo.faultName,
        value: repairInfo.faultId,
      };
      if (repairInfo.handlePersonId && repairInfo.handlePersonName) {
        payloadRepairer = {
          label: repairInfo.handlePersonName,
          value: repairInfo.handlePersonId,
        };
      }
      formData.completeTimeLimit = {
        value: repairInfo.planFinishTime || '',
        label: repairInfo.planFinishTime ? '有' : '无',
      };
      if (repairInfo.descImageFileInfo && repairInfo.descImageFileInfo.length) {
        formData.taskPicList = repairInfo.descImageFileInfo;
      }
    }
  };

  onMounted(() => {
    init();
    getData();
  });

  return {
    formData,
    deviceTree,
    areaList,
    attrList,
    taskTypeList,
    repairerList,
    completeTimeLimitList,
    submitForm,
  };
};

export { useCacheTaskCreate };
