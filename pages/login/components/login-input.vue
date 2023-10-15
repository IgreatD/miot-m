<template>
  <view class="login-input-wrapper">
    <miot-icon :name="icon" color="#999999" size="32" class="login-input-icon" />
    <u-input v-model="input" class="input" :type="type" :placeholder="placeholder" :custom-style="{
      padding: '0 20rpx',
      height: '80rpx',
    }" />
    <slot name="end" />
  </view>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "LoginInput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    icon: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const input = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit("update:modelValue", val);
      },
    });

    return { input };
  },
});
</script>

<style lang="scss" scoped>
.login-input-wrapper
{
  width: 100%;
  height: 80rpx;
  border-radius: 40rpx;
  background-color: #f2f6f7;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 40rpx;
  .login-input-icon
  {
    flex-shrink: 0;
  }
  .input
  {
    width: 100%;
    height: 100%;
  }
}
</style>
