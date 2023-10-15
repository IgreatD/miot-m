<template>
  <view class="dashboard-wrapper">
    <!-- 底层图片 -->
    <view class="dashboard-bg">
      <image src="@/static/imgs/banner.png" mode="widthFix" class="dashboard-bg-image"></image>
    </view>
    <view class="dashboard-list">
      <view v-for="(item, index) in dashboardRouter" :key="index" :class="['dashboard-item']">
        <view :class="['dashboard-item-title']">{{ item.title }}</view>
        <view :class="['dashboard-item-child-list']">
          <view
            v-for="(child, childIndex) in item.child"
            :key="childIndex"
            :class="['dashboard-item-child']"
            :style="{
              background: item.boxBgColor,
            }"
            @click="navigateTo(child)"
          >
            <view
              :class="['dashboard-item-child-icon']"
              :style="{
                background: item.iconBgColor,
              }"
            >
              <miot-icon :name="child.icon" :size="40" color="#ffffff" />
            </view>
            <view :class="['dashboard-item-child-title']">{{ child.title }}</view>
          </view>
        </view>
      </view>
    </view>
    <device-data-mask
      class="device-data-mask"
      :show-mask="deviceData.show"
      @device-data-close="deviceDataCloseAction"
    ></device-data-mask>
  </view>
</template>

<script setup>
import dashboardRouter from './router';
import { reactive } from 'vue';
import { getProject, getUser } from '@/utils/auth';
import DeviceDataMask from '../device/device-data/index';
const deviceData = reactive({ show: false });

const navigateTo = (child) => {
  // 判断path是否为空
  if (!child.path) {
    return;
  }
  if (child.path == '/pages/device/device-data/index') {
    deviceData.show = true;
    return;
  }
  uni.$u.route({
    url: child.path,
    params: child.params,
  });
};
function getAdminByUserId() {
  uni.$service.userService.getAdminByUserId(getProject().id, getUser().userId).then((res) => {
    if (res) {
      console.log('res', res);
    }
  });
}
getAdminByUserId();
function deviceDataCloseAction(show) {
  deviceData.show = show;
}
</script>

<style scoped lang="scss">
.dashboard-wrapper {
  padding-top: 320rpx;
  padding-bottom: 48rpx;
  position: relative;
  background: #ffffff;
}

.dashboard-bg {
  position: fixed;
  // #ifdef H5
  top: calc(var(--window-top));
  // #endif
  // #ifndef H5
  top: 0;
  // #endif
  left: 0;
  right: 0;
  width: 100%;
  height: 320rpx;
  overflow: hidden;

  .dashboard-bg-image {
    width: 100%;
    height: 100%;
  }
}

.dashboard-list {
  padding: 0 24rpx 24rpx;
  background: #ffffff;
  border-radius: 56rpx 56rpx 0 0;
  transform: translateY(-50rpx);

  .dashboard-item {
    width: 100%;

    .dashboard-item-title {
      font-size: 24rpx;
      color: #999999;
      padding-top: 24rpx;
      padding-bottom: 24rpx;
    }

    .dashboard-item-child-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 24rpx;

      .dashboard-item-child {
        height: 104rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 16rpx;

        .dashboard-item-child-icon {
          width: 56rpx;
          height: 56rpx;
          border-radius: 20rpx;
          margin-right: 20rpx;
          // center
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dashboard-item-child-title {
          font-size: 28rpx;
          color: #333333;
        }
      }
    }
  }
}
</style>
