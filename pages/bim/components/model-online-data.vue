<template>
  <view class="data-wrapper">
    <view class="u-border-bottom data-header">
      <view class="u-line-1 label">数据名称</view>
      <view class="u-line-1 value">数据值</view>
    </view>
    <view v-for="item of list" :key="item.value" class="u-border-bottom data-item">
      <view class="u-line-1 label">{{ item.label }}</view>
      <view class="u-line-1 value">{{ item.value }}</view>
    </view>
  </view>
</template>

<script setup>
const list = [
  {
    label: '数据名称',
    value: 'static',
  },
  {
    label: '数据值',
    value: 'design',
  },
];
</script>

<style lang="scss" scoped>
.data-wrapper {
  .data-item,
  .data-header {
    height: 72rpx;
    background: #f7f7f7;
    display: flex;
    align-items: center;
    padding: 0 32rpx;
    font-size: 24rpx;
    line-height: 36rpx;
  }
  .data-item {
    background: #ffffff;
    color: #181818;
  }
  .label {
    width: 200rpx;
  }
  .value {
    flex: 1;
  }
}
</style>
