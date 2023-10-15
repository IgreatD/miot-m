<template>
  <!-- <miot-bim /> -->
  <view class="device-wrapper" @click="showSelect = true">
    {{ selectDevice ? selectDevice.name : '选择节点' }}
    <view class="icon-more">
      <miot-icon name="gengduo1" size="30" color="#999999" />
    </view>
  </view>
  <model-actions />
  <u-popup v-model="showSelect" mode="bottom" border-radius="16" class="item__popup">
    <view class="item__popup__content">
      <view class="item__popup__content__title u-border-bottom"> 请选择组织结构/节点 </view>
      <scroll-view scroll-y="true" style="height: 80vh" class="item__popup__content__options">
      </scroll-view>
    </view>
  </u-popup>
</template>

<script setup>
import ModelActions from './components/model-actions.vue';
const modelList = [
  {
    name: '测试模型',
  },
];

const showSelect = ref(false);

const selectIndex = ref(-1);

const selectDevice = computed(() => modelList[selectIndex.value]);
</script>

<style lang="scss" scoped>
.device-wrapper {
  z-index: 2;
  position: fixed;
  // #ifdef APP-PLUS
  top: 16rpx;
  // #endif
  // #ifdef H5
  top: calc(var(--window-top) + 16rpx);
  // #endif
  left: 16rpx;
  right: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72rpx;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 36rpx;
  padding: 0 16rpx;
  .icon-more {
    position: absolute;
    right: 32rpx;
    font-size: 32rpx;
    color: #333333;
    line-height: 32rpx;
    margin-right: 8rpx;
  }
}
.item__popup {
  &__content {
    background: #ffffff;
    &__title {
      height: 80rpx;
      font-size: 28rpx;
      color: #333333;
      line-height: 36rpx;
      font-weight: 500;
      // 居中
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__options {
      &__option {
        display: flex;
        align-items: center;
        width: 100%;
        height: 88rpx;
        padding: 0 24rpx;
        font-size: 28rpx;
        color: #666666;
        line-height: 36rpx;
        background: #ffffff;
        border-bottom: 1px solid #f0f0f0;
        &--active {
          color: #009999;
        }
      }
    }
  }
}
</style>
