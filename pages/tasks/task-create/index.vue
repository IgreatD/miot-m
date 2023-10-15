<template>
  <view class="create-wrapper">
    <repair-task-create v-if="isRepairTaskType" :id="id" :device-id="deviceId" :cache="cache" />
    <daily-task-create v-if="isDailyTaskType" :id="id" />
  </view>
</template>

<script setup>
import { onReady } from '@dcloudio/uni-app';
import { taskTypes } from '../task';
import RepairTaskCreate from './repair/index.vue';
import DailyTaskCreate from './daily/index.vue';

const props = defineProps({
  taskTypeName: {
    type: String,
    default: '',
  }, // 任务类型
  id: {
    type: [String, Number],
    default: '',
  },
  deviceId: {
    type: String,
    default: '',
  },
  cache: {
    type: String,
    default: '',
  }, // 是否本地缓存
});

// 根据 taskTypeName 获取 taskType
const taskType = taskTypes[props.taskTypeName];

// 是否是维修任务类型
const isRepairTaskType = props.taskTypeName === 'repair';

// 是否是日常任务类型
const isDailyTaskType = props.taskTypeName === 'daily';

onReady(() => {
  if (taskType.title) {
    // 设置标题
    uni.setNavigationBarTitle({
      title: '提请' + taskType.title,
    });
  }
});
</script>

<style lang="scss" scoped>
.create-wrapper {
  background-color: #f2f4f7;
}
</style>
