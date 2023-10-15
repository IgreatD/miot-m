<template>
  <view class="">
    <view class="login-input">
      <login-input
        v-model:modelValue="phone"
        type="text"
        placeholder="请输入手机号"
        icon="shoujihao"
      />
    </view>
    <view class="login-input u-p-t-40">
      <login-input
        v-model:modelValue="code"
        type="text"
        placeholder="请输入验证码"
        icon="yanzhengma"
      >
        <template #end>
          <text
            class="login-code"
            :class="{ 'login-code-disabled': !canGetCode }"
            @click="getCode"
            >{{ codeText }}</text
          >
          <u-verification-code
            ref="uCode"
            :seconds="seconds"
            @end="codeEnd"
            @start="codeStart"
            @change="codeChange"
          ></u-verification-code>
        </template>
      </login-input>
    </view>
    <view class="u-p-t-40">
      <miot-button width="600" height="72" @click="login">登录</miot-button>
    </view>
  </view>
</template>

<script setup>
import LoginInput from './login-input.vue';
import { ref } from 'vue';
// 引入 useUserStore
import { useUserStore } from '@/store/modules/user.js';

import { useCode } from './use-code';

const phone = ref();
const code = ref();

const { uCode, seconds, codeText, canGetCode, getCode, codeEnd, codeStart, codeChange } = useCode(
  phone,
  uni.$service.userService.codeType.LOGIN_USER,
);

// 验证表单
const validateForm = () => {
  if (!phone.value) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none',
    });
    return false;
  }
  if (!code.value) {
    uni.showToast({
      title: '请输入验证码',
      icon: 'none',
    });
    return false;
  }
  return true;
};

// 登录
const login = () => {
  // 验证表单
  if (!validateForm()) {
    return;
  }
  // 获取用户信息
  const userStore = useUserStore();
  // 调用登录方法
  userStore.loginSms({
    mobile: phone.value,
    code: code.value,
  });
};
</script>

<style lang="scss" scoped>
.login-code {
  font-size: 28rpx;
  color: $u-type-primary;
}
</style>
