<template>
  <view class="project-item" @click="toProject">
    <view class="project-item__cover-wrapper">
      <image
        class="project-item__cover"
        :src="fullUrl"
        mode="aspectFill"
        @error="onImageError"
      ></image>
    </view>
    <view class="project-item__info">
      <text class="project-item__name">{{ item.name }}</text>
      <text class="project-item__creator">{{ item.createTime }}</text>
    </view>
  </view>
</template>

<script setup>
import { appConfig } from '@/config/config';
import { setProject } from '@/utils/auth';
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const fullUrl = computed(() => {
  if (props.item.filePth.indexOf('/static') !== -1) {
    return props.item.filePth;
  }
  return appConfig.fileUrl + props.item.filePth;
});

function toProject() {
  setProject(props.item);
  uni.navigateTo({
    url: '/pages/project-center/tabbar',
  });
}
const onImageError = () => {
  // 设置默认图片
  // eslint-disable-next-line vue/no-mutating-props
  props.item.filePth = '/static/imgs/project-common.png';
};
</script>

<style lang="scss" scoped>
.project-item {
  background-color: #ffffff;
  border-radius: 8rpx;
  // #ifndef APP-PLUS
  display: flex;
  flex-direction: column;
  overflow: hidden;
  // #endif
  margin-bottom: 24rpx;

  .project-item__info {
    padding: 24rpx;
  }

  .project-item__cover-wrapper {
    // #ifdef H5
    width: 300rpx;
    // #endif
    height: 304rpx;
    position: relative;

    .project-item__cover {
      height: 304rpx;
      // #ifdef H5
      width: 300rpx;
      // #endif

      /* #ifdef H5 */
      img {
        will-change: transform;
      }

      /* #endif */
    }
  }

  .project-item__name {
    font-size: 28rpx;
    font-weight: 400;
    color: #181818;
    margin-bottom: 8rpx;
  }

  .project-item__creator {
    font-size: 24rpx;
    color: #999;
  }
}
</style>
