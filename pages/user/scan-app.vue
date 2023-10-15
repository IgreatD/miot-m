<template>
  <view class="scan-app-page">
    <view class="scan-app-page__content">
      <miot-logo />
      <view class="scan-app-page__content__qrcode">
        <canvas id="qrcode" canvas-id="qrcode" style="width: 200px; height: 200px"></canvas>
      </view>
      <view class="scan-app-page__content__desc">扫一扫上面的二维码图案，安装APP</view>
    </view>
  </view>
</template>

<script>
import { appConfig } from '@/config/config';
import UQRCode from 'uqrcodejs';
export default {
  onReady() {
    // 获取uQRCode实例
    var qr = new UQRCode();
    // 设置二维码内容
    qr.data = appConfig.fileUrl + 'repair/phone/latestComplete/download/apk';
    // 设置二维码大小，必须与canvas设置的宽高一致
    qr.size = 200;
    // 调用制作二维码方法
    qr.make();
    // 获取canvas上下文
    var canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
    // 设置uQRCode实例的canvas上下文
    qr.canvasContext = canvasContext;
    // 调用绘制方法将二维码图案绘制到canvas上
    qr.drawCanvas();
  },
};
</script>

<style lang="scss" scoped>
.scan-app-page {
  padding: 50rpx 32rpx;
  position: fixed;
  // #ifdef H5
  top: calc(var(--window-top));
  // #endif
  // #ifdef APP-PLUS
  top: 0;
  // #endif
  left: 0;
  right: 0;
  bottom: 0;
  background: #009999;
  &__content {
    padding: 80rpx 110rpx;
    background: #ffffff;
    border-radius: 16rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__qrcode {
      margin-top: 48rpx;
      margin-bottom: 48rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__desc {
      font-size: 22rpx;
      color: #999999;
    }
  }
}
</style>
