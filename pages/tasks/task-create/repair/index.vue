<template>
  <view>
    <report-item
      v-model:selectValue="formData.device"
      title="设备名称"
      :input-type="4"
      :options="deviceTree"
    />
    <report-item
      v-model:selectValue="formData.liabilityType"
      title="工单属性"
      :input-type="2"
      :options="attrList"
    />
    <report-item
      v-model:selectValue="formData.area"
      title="责任区域"
      :input-type="2"
      :options="areaList"
    />
    <report-item
      v-model:selectValue="formData.taskType"
      title="故障类型"
      :input-type="2"
      :options="taskTypeList"
    />
    <report-item
      v-model:selectValue="formData.repairer"
      title="维修人员"
      :input-type="2"
      :options="repairerList"
    />
    <report-item
      v-model:selectValue="formData.completeTimeLimit"
      title="完成时限"
      :input-type="3"
      :options="completeTimeLimitList"
    />
    <view class="problem-description u-m-t-16">
      <view class="label required">问题描述</view>
      <view class="input">
        <u-input
          v-model="formData.taskContent"
          :placeholder="'请输入'"
          :auto-height="false"
          :border="false"
          type="textarea"
          :maxlength="-1"
        />
      </view>
    </view>
    <view class="problem-description u-m-t-16">
      <view class="label">故障照片</view>
      <miot-images v-model:value="formData.taskPicList" :cache="!!cache" />
    </view>
    <miot-bottom-btn @click="submitForm"> {{ cache ? '保存' : '提交' }} </miot-bottom-btn>
  </view>
</template>

<script setup>
import ReportItem from '../components/report-item.vue';
import { useTaskCreate } from './index';
import { useCacheTaskCreate } from './cache';

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  deviceId: {
    type: String,
    default: '',
  },
  cache: {
    type: String,
    default: '',
  },
});

const {
  formData,
  deviceTree,
  attrList,
  areaList,
  taskTypeList,
  repairerList,
  completeTimeLimitList,
  submitForm,
} = props.cache ? useCacheTaskCreate(props.deviceId) : useTaskCreate(props.id);
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
      content: '*';
      color: #ff6459;
    }
  }
}
</style>
