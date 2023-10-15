<template>
  <view class="">
    <view class="avatar">
      <miot-avatar size="400" />
      <view class="avatar-button" @click="handleUploadAvatar">上传头像</view>
    </view>
  </view>
</template>

<script setup>
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
// 点击上传头像按钮，选择图片
const handleUploadAvatar = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      console.log(res);
      // 上传图片
      uni.$upload(res.tempFilePaths[0], {
        success: (res) => {
          console.log('avatar',res);
          // TODO: 上传成功，更新用户头像
          userStore.updateUserAvatar(res).then(() => {
              uni.showToast({
                title: "修改成功",
              });
              setTimeout(() => {
        uni.navigateBack();
      }, 1500);
      })
      .catch((err) => {
        uni.showToast({
          title: err.message || err.msg,
          icon: "none",
        });
      });
        },
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.avatar
{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 112rpx;
  .avatar-image
  {
    width: 400rpx;
    height: 400rpx;
    border-radius: 24rpx;
  }
  .avatar-button
  {
    margin-top: 40rpx;
    width: 400rpx;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    border-radius: 35rpx;
    background-color: #009999;
    color: #fff;
    font-size: 30rpx;
  }
}
</style>
