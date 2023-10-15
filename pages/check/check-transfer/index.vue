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
      title="巡检人员"
      :input-type="2"
      :options="repairerList"
    />
    <miot-bottom-btn @click="handleTransfer">转单</miot-bottom-btn>
  </view>
</template>

<script setup>
import ReportItem from '@/pages/tasks/task-create/components/report-item.vue';
import { getUser } from '@/utils/auth';
import { getAreaListCache, getFaultTypeListCache, getRepairerListCache } from '../_utils/cache';
const props = defineProps({
  taskId: {
    type: String,
    default: '',
  },
});

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
  areaList.value = getAreaListCache();
};

// 获取任务类型列表
const getTaskType = () => {
  taskTypeList.value = getFaultTypeListCache();
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
  }
};

// 验证表单的处理人员是否为空
const validateRepairer = () => {
  if (!formData.repairer.value) {
    uni.showToast({
      title: '请选择巡检人员',
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
  uni.$service.jobService
    .transferJob({
      taskId: props.taskId,
      receiveId: formData.repairer.value,
      userId: getUser().userId,
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
  // 获取责任区域列表
  getAreaList();
  // 获取任务类型列表
  getTaskType();
});
</script>

<style lang="scss" scoped></style>
