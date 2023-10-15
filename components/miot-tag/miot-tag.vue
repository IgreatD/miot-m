<template>
  <!-- tag 组件 -->
  <view class="siiri-tag" :class="['siiri-tag-' + type]">
    <view class="siiri-tag__text">
      <slot></slot>
    </view>
  </view>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MiotTag",
  props: {
    type: {
      type: String,
      default: "primary",
    },
  },
});
</script>

<style lang="scss" scoped>
.siiri-tag
{
  display: inline-block;
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  border: 1rpx solid;

  &__text
  {
    font-size: 28rpx;
  }

  &.siiri-tag-primary
  {
    color: #009999;
    border-color: #009999;
    background-color: #ffffff;
  }

  &.siiri-tag-secondary
  {
    color: #ff9900;
    border-color: #ff9900;
    background-color: #ffffff;
  }

  // 进行中
  &.siiri-tag-process
  {
    color: #FFAA01;
    border-color: #FFAA01;
    background-color: #FFF8EB;
  }

  &.siiri-tag-overrule
  {
    color: #7D72FA;
    border-color: #7D72FA;
    background-color: #7D72FA14;
  }

  &.siiri-tag-success
  {
    color: #2AD680;
    border-color: #2AD680;
    background-color: #E9FFF4;
  }

  &.siiri-tag-warning
  {
    color: #FFAA01;
    border-color: #FFAA01;
    background-color: #FFF8EB;
  }

  &.siiri-tag-danger
  {
    color: #FF6666;
    border-color: #FF6666;
    background-color: #FFEBEB;
  }

  &.siiri-tag-info
  {
    border: 1rpx solid #19a4f5;
    color: #19a4f5;
    background-color: #ffffff;
  }

  &.siiri-tag-light
  {
    color: #999999;
    border-color: #999999;
    background-color: #e6e6e6;
  }

  &.siiri-tag-dark
  {
    color: #333333;
    border-color: #333333;
    background-color: #ffffff;
  }
}</style>
