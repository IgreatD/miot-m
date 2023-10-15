<template>
  <view class="message-item" @click="toMessageDetail">
    <view class="message-item__left">
      <view class="message-item__icon" :class="message.sourceType.code.toLowerCase()">
        <miot-icon :name="getMessageIcon(message.sourceType.code)" size="64rpx" color="#ffffff" />
      </view>
    </view>
    <view class="message-item__right u-border-bottom">
      <view class="message-item__title">
        <view class="message-item__title-text">{{ message.msgTitle }}</view>
        <view class="message-item__title-type">
          {{ message.sourceType.desc }}
        </view>
      </view>
      <view class="message-item__content">
        <view
          class="message-item__content-status"
          :style="{
            backgroundColor: statusOption.statusBackgroundColor,
            borderColor: statusOption.statusColor,
            color: statusOption.statusColor,
          }"
          >{{ statusOption.statusText }}</view
        >
        <view class="message-item__content-text u-line-1">{{ message.msgContent }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { taskTypes } from '@/pages/tasks/task';
import { ref } from 'vue';
const props = defineProps({
  message: {
    type: Object,
    default: () => {},
  },
});
// 获取消息类型对应的图标
const getMessageIcon = (type) => {
  let icon = '';
  switch (type) {
    case 'DAILY_TASK':
      icon = 'richangrenwu';
      break;
    case 'REPAIR_TASK':
      icon = 'weixiurenwu';
      break;
    case 'MAINTAIN':
      icon = 'libaorenwu';
      break;
  }
  return icon;
};

// 获取消息状态对应的背景、文字颜色和文字
const getMessageStatus = (message) => {
  const { msgType, sourceType } = message;
  let statusText = '';
  let statusColor = '';
  let statusBackgroundColor = '';
  switch (msgType.code) {
    case 'NO_CONFIRM':
      statusText = msgType.desc;
      statusColor = '#F58E18';
      statusBackgroundColor = '#FFF5EA';
      break;
    case 'ORDER_CONFIRM':
      statusText = '待确认';
      statusColor = '#19A4F5';
      statusBackgroundColor = '#EBF8FF';
      break;
  }
  return {
    statusText,
    statusColor,
    statusBackgroundColor,
  };
};
const statusOption = ref({
  statusTex: '',
  statusColor: '',
  statusBackgroundColor: '',
});
statusOption.value = getMessageStatus(props.message);
// 跳转到消息详情
const toMessageDetail = () => {
  // 根据消息类型跳转到对应的详情页
  switch (props.message.sourceType.code) {
    case 'DAILY_TASK':
      uni.$u.route({
        url: '/pages/tasks/task-list/index',
        params: {
          taskTypeName: taskTypes.daily.type,
          title: '日常任务',
          isMyTask: 0,
        },
      });
      break;
    case 'REPAIR_TASK':
      uni.$u.route({
        url: '/pages/tasks/task-list/index',
        params: {
          taskTypeName: 'repair',
          title: '运维任务',
          isMyTask: 0,
        },
      });
      break;
    case 'MAINTAIN':
      uni.$u.route({
        url: '/pages/tasks/task-list/index',
        params: {
          taskTypeName: 'maintain',
          title: '例保任务',
          isMyTask: 0,
        },
      });
      break;
  }
};
</script>

<style lang="scss" scoped>
.message-item {
  display: flex;
  background-color: #fff;
  .message-item__left {
    display: flex;
    align-items: center;
    .message-item__icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 88rpx;
      height: 88rpx;
      margin-left: 24rpx;
      border-radius: 8rpx;
      box-shadow: 0px 11rpx 14rpx 0px rgba(217, 220, 228, 0.44);
      &.daily_task {
        background: linear-gradient(180deg, #83adff 0%, #8080ff 100%);
      }
      &.repair_task {
        background: linear-gradient(180deg, #f6c831 0%, #f58c31 100%);
      }
      &.maintain {
        background: linear-gradient(180deg, #56c0f5 0%, #4dc3ff 0%, #2693ff 100%);
      }
    }
  }
  .message-item__right {
    flex: 1;
    padding: 24rpx;
    padding-left: 0;
    margin-left: 24rpx;
    overflow: hidden;
    .message-item__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .message-item__title-text {
        font-size: 28rpx;
        color: #333333;
        font-weight: 400;
      }
      .message-item__title-type {
        font-size: 24rpx;
        color: $u-type-primary;
        line-height: 32rpx;
      }
    }
    .message-item__content {
      padding-top: 12rpx;
      display: flex;
      align-items: center;
      .message-item__content-status {
        font-size: 24rpx;
        color: #999;
        padding: 2rpx 8rpx;
        border-radius: 4rpx;
        border: 1rpx solid;
      }
      .message-item__content-text {
        flex: 1;
        font-size: 24rpx;
        color: #8c9399;
        margin-left: 8rpx;
      }
    }
  }
}
</style>
