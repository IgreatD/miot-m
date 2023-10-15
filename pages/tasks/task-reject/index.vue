<template>
  <view class="">
    <view class="task-reject">
      <view class="task-reject__title"> 评价意见 </view>
      <u-input v-model="comment" type="textarea" :style="{
        height: '200rpx',
      }" />
    </view>
    <miot-bottom-btn @click="handleReject">驳回</miot-bottom-btn>
  </view>
</template>

<script setup>
import { useUserStore } from "@/store/modules/user";
import { ref } from "vue";
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
// 定义 comment 为 ref
const comment = ref("");
// 处理驳回
const handleReject = () => {
  if (!comment.value) {
    uni.showToast({
      title: "请填写评价意见",
      icon: "none",
    });
    return;
  }
  console.log("驳回");
  uni.$service[taskTypes[props.taskTypeName].serviceName]
    .rejectTask({
      id: props.id,
      handleComment: comment.value,
      confirmPersonId: useUserStore().userInfo.userId,
    })
    .then((res) => {
      console.log(res);
      uni.showToast({
        title: "驳回成功",
      });
      // 1500ms 后返回上一页
      setTimeout(() => {
        // 刷新
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
.task-reject {
  margin-top: 16rpx;
  padding: 24rpx 32rpx;
  background: #ffffff;

  .task-reject__title {
    font-size: 28rpx;
    color: #8c9399;
    margin-bottom: 24rpx;

    &::after {
      content: "*";
      color: $uni-color-error;
    }
  }
}
</style>
