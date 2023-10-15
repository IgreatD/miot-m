<template>
  <view class="u-flex-col card-wraper" @tap="$emit('cardTapAction', item)">
    <view class="u-flex">
      <view class="u-flex left">
        <miot-icon class="icon" :name="leftIcon" :color="leftIconColor" style="margin-right: 8rpx"></miot-icon>
        <view class="name">{{ item.name }}</view>
      </view>
    </view>
    <u-line color="#E9EAEB"></u-line>
  </view>
</template>
      
<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    showUnderline: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["cardTapAction"],
  data() {
    return {};
  },
  computed: {
    leftIcon() {
      return this.item.selected ? "danxuankuang" : "danxuankuangweixuan";
    },
    leftIconColor() {
      return this.item.selected ? "#009999" : "#8C9399";
    },
  },
};
</script>
      
<style lang="scss" scoped>
.card-wraper
{
  padding: 0rpx 32rpx;
  background-color: #ffffff;
  .left
  {
    flex: 1;
    padding: 30rpx 0rpx;
    margin-left: 64rpx;
    .icon
    {
      font-size: 28rpx;
    }
    .name
    {
      margin-left: 4rpx;
      color: #333333;
      font-size: 28rpx;
      line-height: 36rpx;
    }
  }
  .selected
  {
    background-color: #f7f7f7;
  }

  .underline
  {
    // margin-top: 28rpx;
    height: 2rpx;
    background-color: #dfdfdf;
  }
}
</style>