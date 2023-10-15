<template>
  <view class="siiri-icon-button" @click="handleClick" :style="{ width: width }">
    <view class="siiri-icon-button__container">
      <miot-icon :name="icon" size="36" color="#009999"></miot-icon>
      <view class="siiri-icon-button__text">
        {{ text }}
      </view>
    </view>
  </view>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MiotIconButton",
  props: {
    icon: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    width:{
      type:String,
      default:'148rpx'
    }
  },
  emits: ["click"],
  setup(_, { emit }) {
    // click event
    const handleClick = () => {
      console.log("click");
      emit("click");
    };

    return {
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.siiri-icon-button
{
  height: 72rpx;
  background: #00999914;
  border-radius: 8rpx;

  .siiri-icon-button__container
  {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .siiri-icon-button__text
    {
      margin-left: 12rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24rpx;
      color: #333333;
    }
  }
}
</style>
