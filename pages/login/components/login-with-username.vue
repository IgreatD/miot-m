<template>
  <view class="">
    <view class="login-input">
      <login-input
        v-model:modelValue="userForm.username"
        type="text"
        placeholder="请输入账号"
        icon="zhanghao"
      />
    </view>
    <view class="login-input u-p-t-40">
      <login-input
        v-model:modelValue="userForm.password"
        type="text"
        placeholder="请输入密码"
        icon="yanzhengma"
      />
    </view>
    <view class="u-p-t-40">
      <miot-button width="576" height="72" border-radius="40" @click="login">登录</miot-button>
    </view>
  </view>
</template>

<script setup>
import LoginInput from './login-input.vue';
import { reactive } from 'vue';
// 引入 useUserStore
import { useUserStore } from '@/store/modules/user.js';

// user form
const userForm = reactive({
  username: 'jinchuanyu_2',
  password: '1qaz!QAZ',
});

// 验证表单
const validateForm = () => {
  if (!userForm.username) {
    uni.showToast({
      title: '请输入用户名',
      icon: 'none',
    });
    return false;
  }
  if (!userForm.password) {
    uni.showToast({
      title: '请输入密码',
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
  userStore.login(userForm);
};
</script>

<style lang="scss" scoped></style>
