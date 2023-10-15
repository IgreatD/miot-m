<template>
  <view class="miot-logo">
    <!-- <miot-icon name="chakan" size="120" class="miot-logo__icon" color="#009999" /> -->
    <view class="miot-logo_logo">
      <image src="@/static/imgs/MIOT_logo.png" mode="widthFix" class="miot-logo_image" />
    </view>
    <view class="miot-logo__name">{{ appConfig.appName }}</view>
    <view class="miot-logo__desc">{{ `【 ${appConfig.appDesc} 】` }}</view>
  </view>
</template>

<script>
import { defineComponent } from 'vue';
import { appConfig } from '@/config/config';

export default defineComponent({
  name: 'SiiriLogo',
  props: {},
  setup() {
    return {
      appConfig,
    };
  },
});
</script>

<style lang="scss" scoped>
.miot-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  &_logo {
    width: 136rpx;
    height: 120rpx;
    .miot-logo_image {
      width: 100%;
      height: 100%;
    }
  }
  &__name {
    font-size: 40rpx;
    color: #181818;
    font-weight: 500;
    margin-top: 32rpx;
    font-family:
      PingFangSC-Medium,
      PingFang SC;
  }
  &__desc {
    font-size: 26rpx;
    color: #333333;
    margin-top: 24rpx;
    font-family:
      PingFangSC-Regular,
      PingFang SC;
  }
}
</style>
