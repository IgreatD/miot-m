<template>
  <view class="edit-username">
    <view class="u-border-bottom bg-white u-p-16">
      <u-input v-model="username" placeholder="请输入用户名" />
    </view>
    <miot-bottom-btn @click="changeUsername">确定</miot-bottom-btn>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();

const username = ref(userStore.userInfo.username);

// 修改用户名
const changeUsername = () => {
  if (username.value) {
    userStore
      .updateUserAccount({
        username: username.value,
        userId: userStore.userInfo.userId,
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
  } else {
    uni.showToast({
      title: "请输入用户名",
      icon: "none",
    });
  }
};
</script>

<style lang="scss" scoped></style>
