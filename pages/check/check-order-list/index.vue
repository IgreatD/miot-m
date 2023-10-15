<template>
  <check-title-component :title="title" active />
  <view class="u-p-24">
    <miot-card v-for="(item, index) in list" :key="index" :title="item.jobName" class="u-m-b-24">
      <template #header-right>
        <view class="u-flex">
          <miot-button plain bg-color="#FF6666" height="48" @click="handleDelete(item)"
            >删除</miot-button
          >
          <miot-button bg-color="#FF6666" height="48" @click="handleModify(item)"
            >修改工单</miot-button
          >
        </view>
      </template>
      <template #body>
        <view class="u-flex list-item u-border-bottom">
          <miot-icon name="ziliao" size="40" color="#009999" class="item-icon" />
          <view class="item-content">
            <view class="item-content-left">
              <text class="item-title">{{ item.checkContent }}</text>
              <text class="item-method">方法：{{ item.method }}</text>
              <text class="item-standard u-line-1">标准：{{ item.standard }}</text>
            </view>
          </view>
          <view class="item-content-right">
            <!-- <miot-button type="text">查看详情</miot-button> -->
          </view>
        </view>
      </template>
    </miot-card>
  </view>
</template>

<script setup>
import checkTitleComponent from '../_components/check-title.vue';
import { getProcessingTaskList, deleteRepairFormData, setRepairFormData } from '../_utils/cache';
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  taskId: {
    type: String,
    default: '',
  },
});

const currentItem = ref(null);

const list = ref([]);

const getList = () => {
  list.value = [];

  // 获取任务列表
  list.value = getProcessingTaskList(props.taskId);
};

// 删除工单
const handleDelete = (item) => {
  console.log('handleDelete');
  deleteRepairFormData(item.taskId, item.jobId, item.id);
  getList();
};

const submitForm = (data) => {
  console.log(data);
  setRepairFormData(currentItem.value.taskId, currentItem.value.jobId, currentItem.value.id, data);
  getList();
};

// 修改工单
const handleModify = (item) => {
  currentItem.value = item;
  if (item.formData) {
    uni.setStorageSync('repairCacheFormData', item.formData);
  }
  uni.$u.route({
    url: '/pages/tasks/task-create/index',
    params: {
      taskTypeName: 'repair',
      deviceId: item.deviceId,
      cache: '1',
    },
  });
};

// 查看详情
const handleDetail = () => {
  console.log('handleDetail');
};

defineExpose({
  submitForm,
});

getList();
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: flex-start;
  background-color: #ffffff;
  padding: 24rpx;
  position: relative;
  // &::after {
  //   margin-left: calc(24rpx + 40rpx + 24rpx);
  // }
  &:last-child {
    &::after {
      border: none;
    }
  }
  .item-icon {
    flex-shrink: 0;
    margin-right: 24rpx;
  }
  .item-content {
    display: flex;
    flex: 1;
    overflow: hidden;
    .item-content-left {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding-right: 120rpx;
      .item-title {
        font-size: 28rpx;
        font-weight: 400;
        color: #181818;
        line-height: 36rpx;
      }
      .item-method,
      .item-standard {
        font-size: 24rpx;
        font-weight: 400;
        color: #8c9399;
        line-height: 36rpx;
      }
      .item-method {
        padding-top: 8rpx;
      }
      .item-standard {
        padding-top: 4rpx;
      }
    }
  }
  .item-content-right {
    position: absolute;
    right: 16rpx;
    bottom: 16rpx;
  }
}
</style>
