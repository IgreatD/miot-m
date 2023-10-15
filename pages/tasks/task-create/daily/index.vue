<template>
  <view>
    <report-item v-model:value="formData.taskName" title="任务名称" :input-type="1" />
    <report-item v-model:selectValue="formData.taskType" title="任务类型" :input-type="2" :options="taskTypeList" />
    <report-item v-model:selectValue="formData.area" title="责任区域" :input-type="2" :options="areaList" />
    <report-item v-model:selectValue="formData.repairer" title="处理人员" :input-type="2" :options="repairerList" />
    <report-item v-model:selectValue="formData.completeTimeLimit" title="完成时限" :input-type="3"
      :options="completeTimeLimitList" />
    <view class="problem-description u-m-t-16">
      <view class="label required">任务描述</view>
      <view class="input">
        <u-input v-model="formData.taskContent" :placeholder="'请输入'" :auto-height="false" :border="false" type="textarea"
          :maxlength="-1" />
      </view>
    </view>
    <view class="problem-description u-m-t-16">
      <view class="label">任务照片</view>
      <miot-images v-model:value="formData.taskPicList" />
    </view>
    <miot-bottom-btn @click="submitForm">提交</miot-bottom-btn>
  </view>
</template>

<script setup>
import ReportItem from "../components/report-item.vue";
import { useTaskCreate } from "./index";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const {
  formData,
  areaList,
  taskTypeList,
  repairerList,
  completeTimeLimitList,
  submitForm,
} = useTaskCreate(props.id);
</script>

<style lang="scss" scoped>
.problem-description {
  display: flex;
  flex-direction: column;
  padding: 24rpx 32rpx;
  background: #ffffff;

  .label {
    font-size: 28rpx;
    color: #8c9399;
    line-height: 36rpx;
    margin-bottom: 24rpx;

    // after *
    &.required:after {
      content: "*";
      color: #ff6459;
    }
  }
}
</style>
