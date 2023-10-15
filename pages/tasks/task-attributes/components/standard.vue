<template>
  <view class="standard-wrapper">
    <view class="title">
      <miot-icon name="biaozhun" color="#009999" size="38"></miot-icon>
      <text class="name"> {{ taskDetail.deviceName }}</text>
    </view>
    <view class="content">
      <view class="function card">
        <view class="card-title">方法</view>
        <view class="main-vlaue">{{ taskDetail.method }}</view>
      </view>
      <view class="stand card">
        <view class="card-title">标准</view>
        <view class="main-vlaue">{{ taskDetail.standard }}</view>
      </view>
    </view>
  </view>
</template>

<script  setup>
import {ref} from 'vue'
const props=defineProps({
  taskId: {
    type: String,
    default: "",
  },
})
const taskDetail=ref({
  method:'',
  standard:'',
  deviceName: ''
})
function getTaskDetail(){
  console.log('taskId',props.taskId)
  uni.$service.maintainService.getTaskDetail(props.taskId).then((res) => {
    taskDetail.value=res
  });
}
getTaskDetail()

</script>

<style scoped lang='scss'>
.standard-wrapper {
  .title {
    height: 88rpx;
    padding-left: 41rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;

    .name {
      font-size: 28rpx;
      font-family: 'PingFangSC-Medium';
      font-weight: 500;
      color: #333333;
      margin-left: 17rpx;
    }
  }

  .content {
    background-color: #F2F4F7;
    padding: 0 16rpx;

    .card {
      padding: 32rpx 24rpx;
      background: #FFFFFF;
      box-shadow: 0px 1px 0px 0px #F0F0F0;
      border-radius: 12px;
      margin-bottom: 16rpx;

      .card-title {
        font-size: 28rpx;
        color: #8C9399;
        margin-bottom: 24rpx;
      }

      .main-vlaue {
        font-size: 28rpx;
        color: #333333;
        line-height: 36rpx;
      }
    }

    .function {}

    .stand {}
  }

}
</style>