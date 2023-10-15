<template>
  <view class="login">
    <view style="height: 160rpx" />
    <miot-logo />
    <view v-if="true" class="login-tabs u-m-b-100">
      <u-tabs v-model="tabForm.active" class="tabs" :list="tabForm.list" :is-scroll="false" :bold="false" bar-height="4"
        bar-width="150" active-color="#009999" bg-color="transparent" inactive-color="#333333" font-size="28"
        @change="tabForm.active = $event" :active-item-style="{ color: '#181818' }" />
    </view>
    <view class="login-wrapper">
      <login-with-phone v-show="tabForm.active === 0" />
      <login-with-username v-show="tabForm.active === 1" />
    </view>
  </view>
</template>

<script setup>
import LoginWithUsername from "./components/login-with-username.vue";
import LoginWithPhone from "./components/login-with-phone.vue";
import { reactive } from "vue";

const tabForm = reactive({
  active: 0,
  list: [
    {
      name: "手机号登录",
    },
    {
      name: "密码登录",
    },
  ],
});
</script>

<style lang="scss" scoped>
.login
{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 100rpx;
  padding-bottom: 32rpx;
  background: linear-gradient(135deg,
      #eafcfa 0%,
      #fafefe 26%,
      #e0edff 74%,
      #e8f9fc 100%);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .login-tabs
  {
    padding-top: 80rpx;
    width: 100%;
    background: transparent;
  }
  .login-wrapper
  {
    width: 686rpx;
    flex: 1;
    padding: 80rpx 55rpx;
    background: #ffffff;
    box-shadow: 0px 8rpx 20rpx 0px rgba(61, 153, 153, 0.08);
    border-radius: 40rpx;
  }
}

::v-deep.u-tabs
{
  .u-tab-item:not(:first-child)
  {
    &:before
    {
      width: 0;
      height: 0;
    }
  }
}
</style>
