<template>
  <u-image class="user-avatar" :width="size" :height="size" :src="avatar">
    <template #error>
      <image
        class="user-avatar"
        src="/static/imgs/avatar.png"
        :style="{ width: size + 'rpx', height: size + 'rpx' }"
      />
    </template>
  </u-image>
</template>

<script>
import { useUserStore } from '@/store/modules/user';
import { defineComponent, ref, watch } from 'vue';
import { appConfig } from '@/config/config';
export default defineComponent({
  name: 'SiiriAvatar',
  props: {
    size: {
      type: [Number, String],
      default: 120,
    },
  },
  setup() {
    // 通过 useUserStore 获取用户信息
    const userStore = useUserStore();
    // 获取用户信息
    const userInfo = userStore.userInfo;
    // 获取用户头像
    watch(
      () => userInfo.userImg,
      (val) => {
        avatar.value = appConfig.fileUrl + val;
      },
    );
    const avatar = ref(appConfig.fileUrl + userInfo.userImg);
    return {
      avatar,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-avatar {
  border-radius: 16rpx;
}
</style>
