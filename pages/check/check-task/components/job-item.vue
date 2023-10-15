<template>
  <miot-card
    :title="item.jobName"
    :subtitle="formatTime(item.createTime, 'YYYY-MM-DD HH:mm')"
    :content="[
      {
        label: '计划时间',
        value: formatTime(item.planStartTime, 'YYYY-MM-DD HH:mm'),
      },
      {
        label: '结束时间',
        value: formatTime(item.planEndTime, 'YYYY-MM-DD HH:mm'),
      },
    ]"
    :footer-class="['u-flex', 'u-row-right']"
  >
    <template #header-right>
      <miot-tag v-if="isFinish" type="success">
        {{ item.status.desc }}
      </miot-tag>
      <miot-tag v-else :type="item.status.code === 'HANDLING' ? 'process' : 'danger'">
        {{ item.status.desc }}
      </miot-tag>
    </template>
    <template v-if="!isFinish" #footer>
      <miot-button plain @click="handleTransfer">转单</miot-button>
      <miot-button v-if="item.status.code === 'HANDLING'" plain @click="handleSubmit"
        >同步</miot-button
      >
      <miot-button @click="handleExecute(item)">执行</miot-button>
    </template>
  </miot-card>
</template>

<script setup>
import { formatTime } from '@/utils/date';
import { getSubmitTaskParams } from '../../_utils/cache';
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(['refresh']);

const isFinish = computed(() => {
  return props.item.status.code === 'FINISH';
});

// 转单
const handleTransfer = () => {
  uni.$u.route({
    url: '/pages/check/check-transfer/index',
    params: {
      taskId: props.item.id,
    },
  });
};
// 执行
const handleExecute = (item) => {
  console.log('handleExecute');
  uni.$u.route({
    url: '/pages/check/check-execute/index',
    params: {
      id: item.id,
      title: item.jobName,
    },
  });
};

// 提交任务
const handleSubmit = () => {
  const params = getSubmitTaskParams(props.item.id);
  console.log(params);
  uni.$service.jobService
    .syncJob(params)
    .then(() => {
      uni.showToast({
        title: '同步成功',
        icon: 'none',
      });
      emit('refresh');
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style lang="scss" scoped></style>
