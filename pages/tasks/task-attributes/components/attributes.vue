<template>
  <view style="height: 100%;">
    <view class="device-attributes header">
      <view class="label u-line-1"> 数据名称 </view>
      <view class="value u-line-1"> 数据值 </view>
    </view>
    <view class="value-content">
      <view v-for="(item, index) in properties" :key="index" class="device-attributes device-values u-border-bottom">
        <view class="label u-line-1"> {{ item.name }} </view>
        <view class="value u-line-1"> {{ item.value }} </view>
      </view>
    </view>
  </view>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "DeviceAttributes",
  props: {
    deviceId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const properties = ref([]);

    const getDeviceProperty = () => {
      uni.$service.deviceService.getDeviceRealTimeData(props.deviceId).then((resp) => {
        properties.value = resp;
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
  height: 72rpx;
  align-items: center;
  // padding: 0 16rpx;
  font-size: 28rpx;
  color: #333333;
  padding-left: 56rpx;

  &.header {
    background: #f2f4f7;
    font-size: 24rpx;
    color: #999999;
    font-family: ' PingFangSC-Regular';
  }

  .label {
    flex: 1.5;
  }

  .value {
    flex: 2;
  }
}

.value-content {
  height: calc(100% - 72rpx);
  background-color: #fff;
  padding: 0 40rpx;

  .device-values {
    padding-left: 16rpx;
    height: 88rpx;
    display: flex;
    color: #333333;

    .label {
      flex: 1.7;
    }
  }
}
</style>
