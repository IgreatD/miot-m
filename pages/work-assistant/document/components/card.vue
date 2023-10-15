<template>
  <view class="u-flex card-wraper">
    <image class="image" src="/static/imgs/img_documentation.svg" mode="heightFix" style="height: 100%"></image>
    <view class="u-flex-col right">
      <view class="u-flex right-top">
        <view class="u-line-2 right-top-first reuse-emphasize-title"
          style="font-family: PingFangSC-Regular, PingFang SC;">{{ item.name }}</view>
        <view class="right-top-second">{{ item.createUsername }}</view>
      </view>
      <view class="u-flex right-bottom">
        <view class="right-bottom-first">文件数：{{ item.fileNum }}</view>
        <view class="right-bottom-second">{{ item.createTime }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.card-wraper
{
  height: 160rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  .image
  {
    width: 152rpx;
    height: 152rpx;
    flex-shrink: 0;
  }
  .right
  {
    flex: 1;
    height: 100%;
    padding: 16rpx 24rpx 24rpx 24rpx;
    font-size: 24rpx;
    line-height: 32rpx;
    color: #999999;
    &-top,
    &-bottom
    {
      justify-content: space-between;
      &-second
      {
        flex-shrink: 0;
      }
    }
    &-top
    {
      flex: 1;
      &-first
      {
        color: #181818;
      }
    }
    &-bottom
    {
      flex-shrink: 0;
      margin-top: 16rpx;
      &-second
      {
        margin-left: 10rpx;
      }
    }
  }
}
</style>
