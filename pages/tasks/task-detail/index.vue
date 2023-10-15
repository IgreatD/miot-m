<template>
  <view class="">
    <view v-if="taskDetail.id" class="u-p-16">
      <miot-card :title="cardTitle" :content="cardContent"> </miot-card>
      <view style="background-color: #fff;" class="u-m-t-16 bg-white u-p-16">
        <miot-steps :steps="steps" @showPersonDetail="showPersonDetail" />
      </view>
    </view>
    <u-popup v-model="showPop" width="400" border-radius="6" mode="center" class="person-detail-pop">
      <view class="detail-wrapper">
        <view class="title">人员信息</view>
        <view v-for="(item, idx) in personDetailList" :key="idx" class="detail-item">
          <view class="name">{{ item.nickName }}</view>
          <view>{{ item.mobile }}</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { taskTypes } from "../task";
import { useTaskDetail } from "./index";

const props = defineProps({
  taskTypeName: {
    type: String,
    default: "",
  },
  id: {
    type: String,

    default: "",
  },
});
const showPop=ref(false)
// 定义 task 详情，ref
const taskDetail = ref({});

const { cardTitle, cardContent, steps } = useTaskDetail(
  taskDetail,
  props.taskTypeName
);
const personDetailList=ref([])
function showPersonDetail(content){
  personDetailList.value=content
  showPop.value=true
}

// 根据 taskId 获取 task 详情
uni.$service[taskTypes[props.taskTypeName].serviceName]
  .getTaskDetail(props.id)
  .then((res) => {
    taskDetail.value = res;
  });
</script>

<style lang="scss" scoped>
.detail-wrapper {
  padding: 20rpx;

  .title {
    height: 40rpx;
    font-weight: 800;
  }
}

.detail-item {
  height: 60rpx;
  display: flex;
  align-items: center;

  .name {
    width: 120rpx;
  }

}
</style>
<style lang="scss">
.person-detail-pop {
  .u-mode-center-box {
    width: 248px;
    height: auto;
    z-index: 10075;
    margin-top: 0px;
    border-radius: 6px;
  }
}
</style>
