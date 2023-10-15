<template>
  <view class="files-list">
    <view v-for="item of fileList" :key="item.id" class="file-item u-border-bottom">
      <text class="u-line-1">{{ item.name }}</text>
    </view>
  </view>
</template>

<script setup>
const fileList = ref([
  {
    id: 1,
    name: '测试模型测试模型测试模型测试模型测试模型测试模型测试模型测试模型测试模型测试模型测试模型测试模型测试模型测试模型',
  },
  {
    id: 2,
    name: '测试模型',
  },
  {
    id: 3,
    name: '测试模型',
  },
  {
    id: 4,
    name: '测试模型',
  },
  {
    id: 5,
    name: '测试模型',
  },
  {
    id: 6,
    name: '测试模型',
  },
  {
    id: 7,
    name: '测试模型',
  },
]);
</script>

<style lang="scss" scoped>
.files-list {
  overflow: hidden;
}
.file-item {
  display: flex;
  align-items: center;
  height: 80rpx;
  padding: 0 40rpx;
}
</style>
