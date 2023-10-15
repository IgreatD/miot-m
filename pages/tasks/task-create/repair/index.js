import { onMounted, ref, watch, reactive } from 'vue';

const useTaskCreate = (id) => {
  // 定义payloadRepairer
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
    uni.$service.deviceService
      .getDeviceTree()
      .then((res) => {
        if (res) {
          deviceTree.value = res.map((item) => {
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 获取责任区域列表
  const getAreaList = () => {
    uni.$service.repairService
      .getTaskAreaList()
      .then((res) => {
        areaList.value = res.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 获取任务类型列表
  const getTaskType = () => {
    uni.$service.repairService
      .getTaskTypeList()
      .then((res) => {
        taskTypeList.value = res.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 获取工单属性列表
  const getAttrList = () => {
    uni.$service.repairService
      .getAttrList()
      .then((res) => {
        attrList.value = res.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
    uni.$service.repairService
      .getTaskPersonList({ areaId, taskTypeId })
      .then((res) => {
        repairerList.value = res.map((item) => {
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
          formData.repairer = repairerList.value.find(
            (item) => item.value === payloadRepairer.value,
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    uni.$service.repairService
      .saveTask({
        id: formData.id ?? '', // 任务id
        deviceName: formData.device.label, // 设备名称
        deviceId: formData.device.value, // 设备id
        liabilityTypeId: formData.liabilityType.value, // 工单属性
        taskDesc: formData.taskContent, // 故障描述
        areaId: formData.area.value, // 责任区域id
        faultId: formData.taskType.value, // 故障类型id
        planFinishTime:
          formData.completeTimeLimit.label == '有'
            ? uni.$dateUtils.formatTime(formData.completeTimeLimit.date)
            : '', // 计划完成时间
        handlePersonId: formData.repairer.value, // 处理人员id
        descImage: formData.taskPicList.map((e) => e.id), // 故障图片
        source: 'MANUAL',
      })
      .then((res) => {
        console.log(res);
        debugger;
        // 提示保存成功
        uni.showToast({
          title: '保存成功',
          duration: 1500,
        });
        // // 1500后，返回上一页
        setTimeout(() => {
          // // 上一个页面刷新列表
          uni.$uniUtils.getPrevPageExposed().refresh();
          uni.navigateBack();
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 初始化数据
  const init = (repairInfo) => {
    debugger;
    if (repairInfo) {
      formData.id = repairInfo.id;
      formData.device = {
        label: repairInfo.deviceName,
        value: repairInfo.deviceId,
      };
      formData.deviceId = repairInfo.deviceId;
      formData.deviceNum = repairInfo.deviceNum;
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

  const getTaskDetail = () => {
    // 根据 taskId 获取 task 详情
    uni.$service.repairService.getTaskDetail(id).then((res) => {
      init(res);
    });
  };

  onMounted(() => {
    if (id) {
      getTaskDetail();
    }
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

export { useTaskCreate };
