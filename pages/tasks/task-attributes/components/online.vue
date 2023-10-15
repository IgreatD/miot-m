<template>
  <view>
    <view class="device-attributes header">
      <view class="label u-line-1"> 数据名称 </view>
      <view class="value u-line-1"> 数据值 </view>
    </view>
    <view class="">
      <view
        v-for="(item, index) in properties"
        :key="index"
        class="device-attributes u-border-bottom"
      >
        <view class="label u-line-1"> {{ item.name }} </view>
        <view class="value u-line-1"> {{ item.value }} </view>
      </view>
    </view>
  </view>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "DeviceOnline",
  props: {},
  setup() {
    const properties = ref([]);

    const getDeviceProperty = () => {
      uni.$service.deviceService.getDeviceProperty().then((resp) => {
        properties.value = resp.attributes;
      });
    };

    onMounted(() => {
      getDeviceProperty();
    });
    return { properties };
  },
});
</script>

<style lang="scss" scoped>
.device-attributes {
  display: flex;
  overflow: hidden;
  background: #ffffff;
  height: 88rpx;
  align-items: center;
  padding: 0 16rpx;
  font-size: 28rpx;
  color: #333333;
  &.header {
    background: #f2f4f7;
    font-size: 24rpx;
    color: #999999;
  }
  .label {
    flex: 1;
  }
  .value {
    flex: 2;
  }
}
</style>
