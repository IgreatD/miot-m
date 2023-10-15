<template>
  <view>
    <view style="height: 120rpx; width: 100%; background-color: transparent" />
    <view class="bottom-btn u-border-top">
      <u-button block type="primary" :custom-style="buttonStyle" @click="handleClick">
        <slot></slot>
      </u-button>
    </view>
  </view>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "MiotBottomBtn",
  props: {
    // 按钮背景颜色
    bgColor: {
      type: String,
      default: "#009999",
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const handleClick = () => {
      emit("click");
    };
    return {
      handleClick,
    };
  },
  computed: {
    buttonStyle() {
      let style = {
        borderRadius: "37rpx",
        height: "72rpx",
        width: "100%",
      };
      style.backgroundColor = this.bgColor;
      return style;
    },
  },
});
</script>

<style lang="scss" scoped>
.bottom-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 114rpx;
  padding: 0 94rpx;
  z-index: 1000;
  background: #ffffff;
  color: #fff;
  font-size: 32rpx;
}
</style>
