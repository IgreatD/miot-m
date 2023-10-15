<template>
  <view class="">
    <view class="task-confirm">
      <view class="task-confirm__title required">结果描述 </view>
      <u-input v-model="form.comment" placeholder="请输入结果描述" type="textarea" :style="{
        height: '200rpx',
      }" />
    </view>
    <view class="task-confirm">
      <view class="task-confirm__title"> 结果照片 </view>
      <miot-images v-model:value="form.imgs" />
    </view>
    <!-- <view class="task-confirm" v-if="taskTypeName === 'repair'">
      <view class="task-confirm__title flex-row-space-between">
        <text>附件</text>
        <miot-icon @click="uploadAttachment" name="a-" color="#009999" size="32"></miot-icon>
      </view>
      <view></view>
    </view> -->
    <miot-bottom-btn @click="handleSubmit">确认</miot-bottom-btn>
  </view>
</template>

<script setup>
import { useUserStore } from "@/store/modules/user";
import { reactive } from "vue";
import { taskTypes } from "../task";
import {uploadFile} from "../../../utils/http/upload";
const props = defineProps({
  // 任务id
  id: {
    type: [String, Number],
    default: "",
  },
  taskTypeName: {
    type: String,
    default: "",
  }, // 任务类型
});
const form = reactive({
  comment: "", // 结果描述
  hour: "", // 任务时长
  imgs: [], // 任务照片
});
// 上传附件
const uploadAttachment=()=>{

}
// 验证表单
const validateForm = () => {
  if (!form.comment) {
    uni.showToast({
      title: "请填写结果描述",
      icon: "none",
    });
    return false;
  }
  return true;
};
// 处理提交
const handleSubmit = () => {
  if (!validateForm()) return;
  uni.$service[taskTypes[props.taskTypeName].serviceName]
    .reportTask({
      id: props.id,
      handleDesc: form.comment,
      // totalTime: form.hour,
      handleImage: form.imgs.map((item) => item.id),
      handlePersonId: useUserStore().userId,
    })
    .then((res) => {
      uni.showToast({
        title: "提交成功",
        icon: "success",
      });
      console.log(res);
      setTimeout(() => {
      uni.$uniUtils.getPrevPageExposed().refresh();
      // 1500ms后返回上一页
     
        uni.navigateBack();
      }, 1500);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style lang="scss" scoped>
.task-confirm
{
  margin-top: 16rpx;
  padding: 24rpx 32rpx;
  background: #ffffff;

  &.flex
  {
    display: flex;
    align-items: center;

    .task-confirm__title
    {
      margin-bottom: 0;
      flex-shrink: 0;
      padding-right: 60rpx;
    }
  }

  .task-confirm__title
  {
    font-size: 28rpx;
    color: #8c9399;
    margin-bottom: 24rpx;

    &.required::after
    {
      content: "*";
      color: $uni-color-error;
    }
  }

  .unit
  {
    font-size: 28rpx;
    color: #8c9399;
    padding-left: 16rpx;
  }
}
</style>
