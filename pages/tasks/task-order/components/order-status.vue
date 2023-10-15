<template>
  <view class="order-status">
    <view v-for="(item, index) in orderStatus" :key="index" :class="{ 'active-item': currentActiveType === item.type }"
      class="order-status-item" @click="checkListByStatus(item)">
      <view class="order-status-item-dot" :style="{ backgroundColor: item.color }"></view>
      <view class="order-status-item-text">
        {{ item.name }}
      </view>
    </view>
  </view>
</template>

<script setup>
import {taskStaus} from '../task'
import {ref} from 'vue'
// eslint-disable-next-line vue/no-setup-props-destructure
const { taskTypeName } = defineProps({
  taskTypeName: {
    type: String,
    default: "",
  },
});
const currentActiveType =ref('');
const orderStatus = taskStaus[taskTypeName]
function checkListByStatus(item){
  currentActiveType.value=item.type===currentActiveType.value?'':item.type
  emits('checkListByStatus',currentActiveType.value)
}
const emits=defineEmits(['checkListByStatus'])


// 定义工单状态
// const orderStatus = [
//   {
//     status: 0,
//     name:
//       taskTypeName === taskTypes.repair.type
//         ? "待维修"
//         : taskTypeName === taskTypes.daily.type
//         ? "待处理"
//         : "待保养",
//     dotColor: "#FFAA00",
//   },
//   {
//     status: 1,
//     name:
//       taskTypeName === taskTypes.repair.type
//         ? "维修中"
//         : taskTypeName === taskTypes.daily.type
//         ? "处理中"
//         : "保养中",
//     dotColor: "#7366FF",
//   },
//   {
//     status: 2,
//     name: "待确认",
//     dotColor: "#1AABFF",
//   },
//   {
//     status: 3,
//     name: "已完成",
//     dotColor: "#00CC88",
//   },
// ];
</script>

<style lang="scss" scoped>
.order-status {
  display: flex;
  flex-direction: row;
  // justify-content:;
  align-items: center;
  padding: 16rpx 30rpx;
  background: #ffffff;
  // height: 72rpx;
  flex-wrap: wrap;
  row-gap: 8rpx;
  column-gap: 8rpx;

  .order-status-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 224rpx;
    height: 52rpx;
    background: #F2F4F7;
    border-radius: 8rpx;
    border: solid 1px transparent;

    .order-status-item-dot {
      width: 20rpx;
      height: 20rpx;
      border-radius: 4rpx;
    }

    .order-status-item-text {
      margin-left: 12rpx;
      font-size: 24rpx;
      font-weight: 500;
      color: #333333;
    }
  }

  .active-item {
    background: #ffffff;
    border: 1px solid #009999;
  }
}
</style>../task