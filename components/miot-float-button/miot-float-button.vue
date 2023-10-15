<template>
  <view class="float-action-button" :style="styleObj" @click="handleClick">
    <miot-icon :name="iconName" color="#ffffff" :size="iconSize" />
  </view>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MiotFloatButton',
  props: {
    iconName: {
      type: String,
      default: 'bianjixuanfuanniu1',
    },
    iconSize: {
      type: Number,
      default: 48,
    },
    styleObj: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = () => {
      emit('click');
    };
    return {
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.float-action-button {
  width: 104rpx;
  height: 104rpx;
  background: $uni-color-primary;
  border-radius: 100%;
  box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 10001;
  bottom: 32rpx;
  right: 32rpx;
}
</style>
