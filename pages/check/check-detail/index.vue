<template>
  <view class="">
    <check-title icon="richangrenwu" title="锅炉系统点巡检（2次/班）" active />
    <view class="table-th table-td">
      <view class="table-tr-item item1">设备名称</view>
      <view class="table-tr-item item2">点检内容</view>
      <view class="table-tr-item item3">标准</view>
      <view class="table-tr-item item4">是否正常</view>
    </view>
    <view v-for="item in checkList" :key="item.id">
      <view class="table-th u-border-bottom">
        <view class="table-tr-item u-line-1 item1">{{ item[tableHeader[0].key] }}</view>
        <view class="table-tr-item u-line-1 item2">{{ item[tableHeader[1].key] }}</view>
        <view class="table-tr-item u-line-1 item3">{{ item[tableHeader[2].key] }}</view>
        <view class="table-tr-item item4">{{ item[tableHeader[3].key] }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import checkTitle from '../_components/check-title.vue';

// 定义 tableHeader
const tableHeader = [
  {
    name: '设备名称',
    key: 'name',
  },
  {
    name: '点检内容',
    key: 'content',
  },
  {
    name: '标准',
    key: 'standard',
  },
  {
    name: '是否正常',
    key: 'isNormal',
  },
];

const handleClick = () => {
  console.log('handleClick');
};
</script>

<style lang="scss" scoped>
.table-th {
  display: flex;
  align-items: center;
  padding: 30rpx 32rpx;
  background-color: #fff;
  &.table-td {
    background: #f2f4f7;
    .table-tr-item {
      font-size: 24rpx;
      color: #999999;
    }
  }
  .table-tr-item {
    text-align: start;
    font-size: 28rpx;
    color: #333333;
    &.item1 {
      width: 150rpx;
    }
    &.item2 {
      flex: 1;
      padding: 0 16rpx;
    }
    &.item3 {
      width: 130rpx;
    }
    &.item4 {
      width: 100rpx;
      text-align: center;
    }
  }
}
</style>
