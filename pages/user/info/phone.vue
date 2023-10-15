<template>
  <view class="">
    <view class="bg-white u-p-16">
      <u-input v-model:modelValue="phone" placeholder="请输入新手机号" />
    </view>
    <view class="bg-white u-p-16 code-row">
      <u-input v-model:modelValue="code" class="input" :type="type" placeholder="请输入验证码" />
      <text class="login-code" :class="{ 'login-code-disabled': !canGetCode }" @click="getCode">{{ codeText }}</text>
      <u-verification-code ref="uCode" :seconds="seconds" @end="codeEnd" @start="codeStart"
        @change="codeChange"></u-verification-code>
    </view>
    <miot-bottom-btn @click="changeUsername">确定</miot-bottom-btn>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/modules/user";
import { useCode } from "@/pages/login/components/use-code";
const userStore = useUserStore();

const phone = ref(userStore.userInfo.mobile);
const code = ref();

const {
  uCode,
  seconds,
  codeText,
  canGetCode,
  getCode,
  codeEnd,
  codeStart,
  codeChange,
} = useCode(phone, uni.$service.userService.codeType.LOGIN_USER);

// 验证表单
const validateForm = () => {
  if (!phone.value) {
    uni.showToast({
      title: "请输入手机号",
      icon: "none",
    });
    return false;
  }
  if (!code.value) {
    uni.showToast({
      title: "请输入验证码",
      icon: "none",
    });
    return false;
  }
  return true;
};

// 修改手机号
const changeUsername = () => {
  if(!validateForm()){
    return
  }
   userStore.updateUserPhone({
        mobile: phone.value,
        code: code.value,
      })
      .then(() => {
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

};
</script>

<style lang="scss" scoped>
.code-row
{
  display: flex;
  align-items: center;
  .login-code
  {
    font-size: 28rpx;
    color: $u-type-primary;
    padding: 0 10rpx;
  }
}
</style>
