<template>
  <tabs v-model:value="active" :tab-list="tabList" @change="onTabChange" />
  <view class=""> </view>
</template>

<script setup>
import Tabs from './tabs.vue';
const tabList = [
  {
    label: '实时',
    value: 'online',
  },
  {
    label: '记录',
    value: 'record',
  },
];

const active = ref('online');

const onTabChange = (value) => {
  console.log(value);
};
</script>

<style lang="scss" scoped></style>
