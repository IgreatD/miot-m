import { getUser } from '@/utils/auth';
import { onMounted, ref, watch, reactive } from 'vue';

const useTaskCreate = (id) => {
  // 定义payloadRepairer
  let payloadRepairer = null;

  // 定义表单数据
  const formData = reactive({
    taskId: '', // 任务id
    taskName: '', // 任务名称
    spaceLocation: '', // 空间位置
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

  // 定义责任区域列表
  const areaList = ref([]);

  // 定义任务类型列表
  const taskTypeList = ref([]);

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

  // 获取责任区域列表
  const getAreaList = () => {
    uni.$service.taskService
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
    uni.$service.taskService
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
    uni.$service.taskService
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
    getAreaList();
    getTaskType();
  }

  // 验证表单数据
  const validateForm = () => {
    if (!formData.taskName) {
      uni.showToast({
        title: '请输入任务名称',
        icon: 'none',
      });

      return false;
    }
    // if (!formData.spaceLocation) {
    //   uni.showToast({
    //     title: "请输入空间位置",
    //     icon: "none",
    //   });

    //   return false;
    // }
    if (!formData.area.value) {
      uni.showToast({
        title: '请选择责任区域',
        icon: 'none',
      });

      return false;
    }
    if (!formData.taskType.value) {
      uni.showToast({
        title: '请选择任务类型',
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
    uni.$service.taskService
      .saveTask({
        id: formData.taskId ?? '',
        name: formData.taskName,
        userId: getUser().userId,
        spaceName: formData.spaceLocation,
        taskDesc: formData.taskContent,
        areaId: formData.area.value,
        taskTypeId: formData.taskType.value,
        planFinishTime:
          formData.completeTimeLimit.label == '有'
            ? uni.$dateUtils.formatTime(formData.completeTimeLimit.value)
            : '',
        handlePersonId: formData.repairer.value,
        descImage: formData.taskPicList.map((e) => e.id),
      })
      .then((res) => {
        console.log(res);
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
  const init = (taskInfo) => {
    if (taskInfo) {
      formData.taskId = taskInfo.id;
      formData.taskName = taskInfo.name;
      formData.spaceLocation = taskInfo.spaceName;
      formData.taskContent = taskInfo.taskDesc;
      formData.area = {
        label: taskInfo.areaName,
        value: taskInfo.areaId,
      };
      formData.taskType = {
        label: taskInfo.taskTypeName,
        value: taskInfo.taskTypeId,
      };
      if (taskInfo.handlePersonId && taskInfo.handlePersonName) {
        payloadRepairer = {
          label: taskInfo.handlePersonName,
          value: taskInfo.handlePersonId,
        };
      }
      formData.completeTimeLimit = {
        value: taskInfo.planFinishTime || '',
        label: taskInfo.planFinishTime ? '有' : '无',
      };
      if (taskInfo.descImageFileInfo && taskInfo.descImageFileInfo.length) {
        formData.taskPicList = taskInfo.descImageFileInfo;
      }
    }
  };

  const getTaskDetail = () => {
    // 根据 taskId 获取 task 详情
    uni.$service.taskService.getTaskDetail(id).then((res) => {
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
    areaList,
    taskTypeList,
    repairerList,
    completeTimeLimitList,
    submitForm,
  };
};

export { useTaskCreate };
