<template>
  <check-title-component :title="title" active />
  <view class="list">
    <view v-for="(item, index) in list" :key="index" class="u-flex list-item u-border-bottom">
      <miot-icon
        name="ziliao"
        size="40"
        :color="isActive ? '#009999' : '#97a2b0'"
        class="item-icon"
      />
      <miot-icon v-if="!isActive" name="suo" size="40" color="#97a2b0" class="item-icon" />
      <view class="item-content">
        <view class="item-content-left">
          <text class="item-title">{{ item.checkContent }}</text>
          <text class="item-method">方法：{{ item.method }}</text>
          <text class="item-standard u-line-1">标准：{{ item.standard }}</text>
        </view>
        <view class="item-content-right">
          <miot-button
            v-if="isActive"
            class="u-m-b-24"
            :height="48"
            :plain="!!item.formData"
            :bg-color="!!item.formData ? '#FF6666' : ''"
            @click="handleToRepair(item)"
          >
            {{ item.formData ? '修改工单' : '提请维修' }}
          </miot-button>
          <!-- <miot-button type="text">查看详情</miot-button> -->
        </view>
      </view>
    </view>
  </view>
  <miot-bottom-btn v-if="isActive" @click="handleContinue">继续执行</miot-bottom-btn>
</template>

<script setup>
import checkTitleComponent from '../_components/check-title.vue';
import {
  continueTask,
  getJobTemplateListByIdAndModuleId,
  setRepairFormData,
} from '../_utils/cache';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  active: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  moduleId: {
    type: String,
    default: '',
  },
  deviceId: {
    type: String,
    default: '',
  },
});

const currentItem = ref({});

const list = ref([]);

const getList = () => {
  list.value = getJobTemplateListByIdAndModuleId(props.id, props.moduleId);
};

//  是否激活
const isActive = computed(() => {
  return props.active == 1;
});
const submitForm = (data) => {
  console.log(data);
  setRepairFormData(props.id, props.moduleId, currentItem.value.id, data);
  getList();
};

// 继续执行
const handleContinue = () => {
  // const id = continueTask(props.id, props.moduleId);
  // if (id) {
  //   //
  // } else {
  //   // 执行完成
  //   uni.navigateBack();
  // }
  uni.$emit('onContinueTask', props.id, props.moduleId);
  uni.navigateBack();
};

// 跳转到维修页面
const handleToRepair = (item) => {
  currentItem.value = item;
  if (item.formData) {
    uni.setStorageSync('repairCacheFormData', item.formData);
  }
  uni.$u.route({
    url: '/pages/tasks/task-create/index',
    params: {
      taskTypeName: 'repair',
      deviceId: props.deviceId,
      cache: '1',
    },
  });
};

getList();

defineExpose({
  submitForm,
});
</script>

<style lang="scss" scoped>
.list {
  padding-top: 16rpx;
  .list-item {
    display: flex;
    align-items: flex-start;
    background-color: #ffffff;
    padding: 24rpx;
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
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
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
      .item-content-right {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    }
  }
}
</style>
