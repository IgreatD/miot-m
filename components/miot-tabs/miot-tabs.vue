<template>
  <view>
    <view class="u-bg-white u-border-bottom siiri-tabs" :class="{ 'siiri-tabs-fixed': fixed }">
      <u-tabs
        v-model="current"
        :list="tabList"
        :is-scroll="isScroll"
        :bold="false"
        bar-height="4"
        :bar-width="isScroll ? 40 : 375"
        active-color="#009999"
        inactive-color="#333333"
        font-size="28"
        @change="tabChange"
      ></u-tabs>
    </view>
    <view v-if="fixed" style="height: 80rpx" />
  </view>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MiotTabs',
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: 0,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    isScroll: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const current = ref(props.value);
    const tabChange = (e) => {
      current.value = e;
      emit('update:value', e);
      emit('change', e);
    };

    return {
      current,
      tabChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.siiri-tabs {
  &.siiri-tabs-fixed {
    position: fixed;
    // #ifdef H5
    top: calc(var(--window-top));
    // #endif
    // #ifndef H5
    top: 0;
    // #endif
    left: 0;
    right: 0;
    z-index: 100;
  }
}
</style>
