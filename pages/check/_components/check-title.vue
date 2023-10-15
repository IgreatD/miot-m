<template>
  <view class="wrapper">
    <miot-icon :name="icon" size="40" :color="active ? '#009999' : '#97A2B0'" class="icon" />
    <text class="text">{{ title }}</text>
  </view>
</template>

<script>
export default defineComponent({
  name: 'CheckTitle',
  props: {
    icon: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  padding: 26rpx 32rpx;
  background-color: #ffffff;
  box-shadow: 0px 1px 0px 0px #e6e6e6;
  .text {
    font-size: 28rpx;
    font-weight: 400;
    color: #333333;
    line-height: 36rpx;
    padding-left: 24rpx;
  }
}
</style>
