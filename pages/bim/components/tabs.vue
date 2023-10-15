<template>
  <view class="tabs-wrapper">
    <template v-for="item in tabList" :key="item.value">
      <view
        class="tab-item"
        :class="{
          active: item.value === active,
        }"
        @click="onTabChange(item)"
      >
        {{ item.label }}
      </view>
    </template>
  </view>
</template>

<script>
export default defineComponent({
  name: 'MiotTabs',
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
  },
  emits: ['change', 'update:value'],
  setup(props, { emit }) {
    const active = computed({
      get() {
        return props.value;
      },
      set(value) {
        emit('update:value', value);
      },
    });
    const onTabChange = (item) => {
      active.value = item.value;
      emit('change', item.value);
    };
    return {
      onTabChange,
      active,
    };
  },
});
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  display: flex;
  align-items: center;
  padding: 16rpx 32rpx;
  .tab-item {
    height: 64rpx;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    font-weight: 400;
    color: #333333;
    line-height: 36rpx;
    background: rgba(15, 153, 130, 0.08);
    &.active {
      color: #ffffff;
      background: #009999;
    }
  }
}
</style>
