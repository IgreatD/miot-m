<template>
  <view class="">
    <view class="form">
      <view class="form-item u-border-bottom">
        <view class="form-item__label"> 旧密码 </view>
        <u-input v-model="form.old" class="form-item__input" placeholder="请输入旧密码" type="password" />
      </view>
      <view class="form-item u-border-bottom">
        <view class="form-item__label"> 新密码 </view>
        <u-input v-model="form.new" class="form-item__input" placeholder="请输入新密码" type="password" />
      </view>
      <view class="form-item u-border-bottom">
        <view class="form-item__label"> 确认密码 </view>
        <u-input v-model="form.confirm" class="form-item__input" placeholder="请再次输入新密码" type="password" />
      </view>
    </view>
    <miot-bottom-btn @click="submitForm">确定</miot-bottom-btn>
  </view>
</template>

<script setup>
import { useUserStore } from "@/store/modules/user";
import { reactive } from "vue";
const form = reactive({
  old: "",
  new: "",
  confirm: "",
});
// 验证表单
const validateForm = () => {
  if (!form.old) {
    uni.showToast({
      title: "请输入旧密码",
      icon: "none",
    });
    return false;
  }
  if (!form.new) {
    uni.showToast({
      title: "请输入新密码",
      icon: "none",
    });
    return false;
  }
  if (!form.confirm) {
    uni.showToast({
      title: "请再次输入新密码",
      icon: "none",
    });
    return false;
  }
  if (form.new !== form.confirm) {
    uni.showToast({
      title: "两次输入的密码不一致",
      icon: "none",
    });
    return false;
  }
  return true;
};
// 提交表单
const submitForm = () => {
  if (!validateForm()) {
    return;
  }
  uni.$service.userService
    .updatePassword({
      confirmPassword: form.confirm,
      oldPassword: form.old,
      password: form.new,
      id: useUserStore().userInfo.userId,
    })
    .then(() => {
      uni.showToast({
        title: "修改成功",
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    });
};
</script>

<style lang="scss" scoped>
.form
{
  background-color: #ffffff;
  padding: 0 30rpx;
  .form-item
  {
    display: flex;
    align-items: center;
    height: 96rpx;
    .form-item__label
    {
      width: 200rpx;
      font-size: 28rpx;
      color: #333333;
    }
    .form-item__input
    {
      flex: 1;
    }
  }
}
</style>
