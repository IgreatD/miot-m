<template>
  <view v-for="(item, index) in tabList" :key="index" class="">
    <view>
      {{ item.label }}
    </view>
  </view>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MiotTabs',
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
