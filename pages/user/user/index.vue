<template>
  <view class="">
    <user-head></user-head>
    <user-cells></user-cells>
    <view class="u-m-t-28">
      <miot-button block border-radius="0" type="info" height="96" @click="showModal = true">
        <view class="user__logout__text"> 退出登录 </view>
      </miot-button>
    </view>
    <u-modal
      v-model:modelValue="showModal"
      :show-cancel-button="true"
      content="确定退出登录吗？"
      @confirm="handleLogout"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';
import UserHead from './components/user-head.vue';
import UserCells from './components/user-cells.vue';
import { useUserStore } from '@/store/modules/user';

const showModal = ref(false);

const handleLogout = () => {
  useUserStore().logout();
};

onUnload(() => {
  getApp().globalData.fromHome = '';
});
</script>

<style lang="scss" scoped>
.user__logout__text {
  color: #181818;
  font-weight: 500;
  font-size: 32rpx;
}
</style>
