<template>
  <view class="">
    <report-item
      v-model:selectValue="formData.area"
      title="责任区域"
      :input-type="2"
      :options="areaList"
    />
    <report-item
      v-model:selectValue="formData.taskType"
      title="故障类型"
      :input-type="2"
      :options="taskTypeList"
    />
    <report-item
      v-model:selectValue="formData.repairer"
      title="维修人员"
      :input-type="2"
      :options="repairerList"
    />
    <miot-bottom-btn @click="handleTransfer">转单</miot-bottom-btn>
  </view>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import ReportItem from '@/pages/tasks/task-create/components/report-item.vue';
import { taskTypes } from '../task';
const props = defineProps({
  taskTypeName: {
    type: String,
    default: '',
  }, // 任务类型
});

// 从本地缓存中获取 task
const taskFromStorage = uni.getStorageSync('task');

const formData = reactive({
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
});

// 定义责任区域列表
const areaList = ref([]);

// 定义任务类型列表
const taskTypeList = ref([]);

// 定义处理人员列表
const repairerList = ref([]);

// 获取责任区域列表
const getAreaList = () => {
  uni.$service[taskTypes[props.taskTypeName].serviceName]
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
  uni.$service[taskTypes[props.taskTypeName].serviceName]
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
  {
    flush: 'post',
  },
);

// 获取处理人员列表
const getRepairer = (areaId, taskTypeId) => {
  uni.$service[taskTypes[props.taskTypeName].serviceName]
    .getTaskPersonList({ areaId, taskTypeId })
    .then((res) => {
      repairerList.value = res.map((item) => {
        return {
          label: item.name,
          value: item.userId,
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// 验证表单的处理人员是否为空
const validateRepairer = () => {
  if (!formData.repairer.value) {
    uni.showToast({
      title: '请选择处理人员',
      icon: 'none',
      duration: 2000,
    });
    return false;
  }
  return true;
};

// 处理转单
const handleTransfer = () => {
  console.log(formData);
  // 验证表单的处理人员是否为空
  if (!validateRepairer()) {
    return;
  }
  uni.$service[taskTypes[props.taskTypeName].serviceName]
    .transferTask({
      sourceTaskId: taskFromStorage.id,
      targetHandlerId: formData.repairer.value,
      areaId: formData.area.value,
      faultId: formData.taskType.value,
    })
    .then((res) => {
      console.log(res);
      uni.showToast({
        title: '转单成功',
        icon: 'success',
        duration: 1500,
      });
      // 1500ms 后返回上一页
      setTimeout(() => {
        uni.$uniUtils.getPrevPageExposed().refresh();
        uni.navigateBack();
      }, 1500);
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  // 如果 taskFromStorage 存在，则将 taskFromStorage 赋值给 task
  if (taskFromStorage) {
    console.log(taskFromStorage);
    // 清除本地缓存中的 task
    // uni.removeStorageSync("task");
    // 将 taskFromStorage 赋值给 task
    formData.area = {
      label: taskFromStorage.areaName,
      value: taskFromStorage.areaId,
    };
    // 是否是维修任务类型
    if (props.taskTypeName === 'repair') {
      formData.taskType = {
        label: taskFromStorage.faultName,
        value: taskFromStorage.faultId,
      };
    } else {
      formData.taskType = {
        label: taskFromStorage.taskTypeName,
        value: taskFromStorage.taskTypeId,
      };
    }
  }
  // 获取责任区域列表
  getAreaList();
  // 获取任务类型列表
  getTaskType();
});
</script>

<style lang="scss" scoped></style>
