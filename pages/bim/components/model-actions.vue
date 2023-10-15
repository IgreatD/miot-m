<template>
  <view class="action-wrapper">
    <template v-for="(item, index) in actionList" :key="index">
      <miot-icon name="wenjianjia" class="action" @click="onClick(item)" />
    </template>
  </view>
</template>

<script setup>
const actionList = [
  {
    title: '静态参数',
    icon: '',
  },
  {
    title: '实时数据',
    icon: '',
  },
  {
    title: '设备关系',
    icon: '',
  },
  {
    title: '维修详情',
    icon: '',
  },
  {
    title: '例保详情',
    icon: '',
  },
  {
    title: '随机资料',
    icon: '',
  },
];

const onClick = (index) => {
  console.log(index);
};
</script>

<style lang="scss" scoped>
.action-wrapper {
  position: fixed;
  left: 16rpx;
  bottom: 16rpx;
  right: 16rpx;
  padding: 0 40rpx;
  height: 88rpx;
  background: #181818;
  border-radius: 58rpx;
  opacity: 0.78;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .action {
    color: #ffffff;
    font-size: 64rpx;
    &.active {
      color: $uni-color-primary;
    }
  }
}
</style>
