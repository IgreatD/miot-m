<template>
  <tabs v-model:value="active" :tab-list="tabList" @change="onTabChange" />
  <view class=""> </view>
</template>

<script setup>
import Tabs from './tabs.vue';
const tabList = [
  {
    label: '静态属性',
    value: 'static',
  },
  {
    label: '设计参数',
    value: 'design',
  },
];

const active = ref('static');

const onTabChange = (value) => {
  console.log(value);
};
</script>

<style lang="scss" scoped></style>
