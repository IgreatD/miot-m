<template>
  <view class="">
    <view class="task-confirm">
      <view class="task-confirm__title required"> 评价意见 </view>
      <u-input v-model="form.comment" placeholder="请输入评价意见" type="textarea" :style="{
        height: '200rpx',
      }" />
    </view>
    <view class="task-confirm flex">
      <view class="task-confirm__title"> 结果评价 </view>
      <u-rate v-model:modelValue="form.rate" :count="5" active-color="#FF9600" inactive-color="#BCC1CC"
        :size="32"></u-rate>
    </view>
    <miot-bottom-btn @click="handleSubmit">确认</miot-bottom-btn>
  </view>
</template>

<script setup>
import { useUserStore } from "@/store/modules/user";
import { reactive } from "vue";
import { taskTypes } from "../task";
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
  comment: "",
  rate: "",
});
// 验证表单
const validateForm = () => {
  if (!form.comment) {
    uni.showToast({
      title: "请填写评价意见",
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
    .confirmTask({
      id: props.id,
      handleComment: form.comment,
      handleScore: form.rate,
      isSuccess: true,
      confirmPersonId: useUserStore().userInfo.userId,
    })
    .then((res) => {
      uni.showToast({
        title: "提交成功",
        icon: "success",
      });
      console.log(res);

      // 1500ms后返回上一页
      setTimeout(() => {
        uni.$uniUtils.getPrevPageExposed().refresh();
        uni.navigateBack();
      }, 1500);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style lang="scss" scoped>
.task-confirm {
  margin-top: 16rpx;
  padding: 24rpx 32rpx;
  background: #ffffff;

  &.flex {
    display: flex;
    align-items: center;

    .task-confirm__title {
      margin-bottom: 0;
      flex-shrink: 0;
      padding-right: 24rpx;
    }
  }

  .task-confirm__title {
    font-size: 28rpx;
    color: #8c9399;
    margin-bottom: 24rpx;

    &.required::after {
      content: "*";
      color: $uni-color-error;
    }
  }
}
</style>
