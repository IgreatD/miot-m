<template>
  <view class="user-head" @click="toUserInfo">
    <view class="user-head-top" :class="{ 'u-border-bottom': !isFromHome }">
      <view class="user-head-left">
        <view class="user-head-left-top">
          <view class="user-head-left-top-name">
            <text class="u-m-r-16">{{ userInfo.name }}</text>
            <miot-icon name="renzheng1" color="#009999" size="34" />
          </view>
        </view>
        <view class="user-head-left-bottom">
          <text class="user-head-left-bottom-unit">{{ userInfo.company }}</text>
        </view>
      </view>
      <view class="user-head-right">
        <miot-avatar size="120" />
      </view>
    </view>
    <view v-if="!isFromHome" class="user-head-bottom">
      <view class="user-head-bottom-role">
        <text class="user-head-bottom-role-text">角色：{{ userInfo.roleName }}</text>
      </view>
      <view class="user-head-bottom-post">
        <text class="user-head-bottom-post-text">岗位：{{ userInfo.stationName }}</text>
        <text class="user-head-bottom-post-text">电话：{{ userInfo.mobile }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { useUserStore } from '@/store/modules/user';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserHead',
  setup(props) {
    // 通过 useUserStore 获取用户信息
    const userStore = useUserStore();
    // 获取用户信息
    const userInfo = userStore.userInfo;
    console.log(userInfo);
    // 导航到用户信息页面
    const toUserInfo = () => {
      uni.navigateTo({
        url: `/pages/user/info/index`,
      });
    };

    const isFromHome = computed(() => getApp().globalData.fromHome == '1');

    return {
      toUserInfo,
      isFromHome,
      userInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-head {
  margin: 28rpx;
  border-radius: 8rpx;
  background-color: #ffffff;
  padding: 32rpx 40rpx;
  .user-head-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 24rpx;

    .user-head-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .user-head-left-top {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        .user-head-left-top-name {
          display: flex;
          align-items: center;
          font-size: 32rpx;
          font-weight: bold;
          color: #181818;
        }
      }
      .user-head-left-bottom {
        padding-top: 24rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        .user-head-left-bottom-unit {
          font-size: 24rpx;
          color: #666666;
        }
      }
    }
  }
  .user-head-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    .user-head-right-img {
      width: 120rpx;
      height: 120rpx;
      border-radius: 8rpx;
    }
  }
  .user-head-bottom {
    padding-top: 24rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 24rpx;
    color: #666666;

    .user-head-bottom-post {
      padding-top: 16rpx;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
