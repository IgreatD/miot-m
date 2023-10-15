<template>
  <check-title-component :title="title" />
  <view class="task-list">
    <view
      v-for="(item, index) in taskList"
      :key="index"
      class="task-list-item u-border-bottom"
      :class="{ active: item.active }"
    >
      <view class="u-flex">
        <miot-icon name="suo" :color="item.active ? '#009999' : '#97A2B0'" size="40" />
        <miot-icon v-if="!item.active" name="suo" color="#97A2B0" size="40" class="u-m-l-8" />
        <view class="task-list-item-name u-m-l-24">{{ item.name }}</view>
      </view>
      <view class="task-list-item-arrow-wrapper" @click="handleItemClick(item)">
        <miot-icon name="youjiantou" color="#009999" size="24" class="task-list-item-arrow" />
      </view>
    </view>
  </view>
  <check-execute-bottom v-model:value="showPopup" @on-confirm="onConfirm" />
</template>

<script setup>
import CheckExecuteBottom from '../_components/check-execute-bottom.vue';
import checkTitleComponent from '../_components/check-title.vue';
import { getNoProcessModuleListById, setModuleNormal, setRepairFormData } from '../_utils/cache';
// #ifdef APP-PLUS
import useNfc from '@/utils/nfc';
const { currentNFCInfo } = useNfc();

watch(currentNFCInfo, (val) => {
  if (val) {
    handleScanCode({
      result: val,
    });
  }
});
// #endif

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
});

const showPopup = ref(false);

const taskList = ref([]);

const currentItem = ref(null);

// 根据id获取任务详情
const getTaskDetail = async () => {
  const list = await getNoProcessModuleListById(props.id);
  taskList.value = list.map((item) => ({
    ...item,
    active: false,
  }));
};

// 二维码扫描结果
const handleScanCode = (res) => {
  console.log('handleScanCode', res);
  const { result } = res;
  const tasks = taskList.value.filter((item) => item.deviceId === result);
  if (tasks) {
    tasks.forEach((item) => {
      item.active = true;
    });
  }
};

// item 点击事件
const handleItemClick = (item) => {
  if (item.active) {
    showPopup.value = true;
    currentItem.value = item;
  } else {
    uni.$u.route({
      url: '/pages/check/check-execute/second',
      params: {
        title: item.name,
        active: null,
        id: props.id,
        moduleId: item.id,
        deviceId: item.deviceId,
      },
    });
  }
};

const onConfirm = (val) => {
  if (val) {
    uni.$u.route({
      url: '/pages/check/check-execute/second',
      params: {
        title: currentItem.value.name,
        active: 1,
        id: props.id,
        moduleId: currentItem.value.id,
        deviceId: currentItem.value.deviceId,
      },
    });
  } else {
    preRefresh();
    setModuleNormal(props.id, currentItem.value.id, val);
    getTaskDetail();
  }
};

const preRefresh = () => {
  uni.$emit('jobListRefresh');
};

const onContinueTask = (id, moduleId) => {
  debugger;
  setModuleNormal(id, moduleId, true);
  // setRepairFormData(id, moduleId, null);
  preRefresh();
  getTaskDetail();
};

onLoad(() => {
  getTaskDetail();
  uni.$on('onContinueTask', onContinueTask);
});

onUnload(() => {
  uni.$off('onContinueTask', onContinueTask);
});

onNavigationBarButtonTap((options) => {
  console.log('onNavigationBarButtonTap', options);
  switch (options.index) {
    case 1:
      // #ifdef H5
      handleScanCode({
        result: '1666680662544875520',
      });
      // #endif
      // #ifdef APP-PLUS
      uni.scanCode({
        scanType: ['qrCode'],
        autoZoom: false,
        success: handleScanCode,
      });
      // #endif
      break;
    case 0:
      uni.$u.route({
        url: '/pages/check/check-order-list/index',
        params: {
          title: props.title,
          taskId: props.id,
        },
      });
      break;
    default:
      break;
  }
});
</script>

<style lang="scss" scoped>
.task-list {
  margin-top: 16rpx;
  .task-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30rpx 32rpx;
    background-color: #fff;
    // 最后一个
    &:last-child {
      &::after {
        border: none;
      }
    }
    &.active {
      &::after {
        margin-left: calc(32rpx + 40rpx + 24rpx);
      }
    }
    &::after {
      margin-left: calc(32rpx + 40rpx * 2 + 8rpx + 24rpx);
    }
    &-name {
      font-size: 28rpx;
      color: #181818;
    }
    &-arrow-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48rpx;
      height: 48rpx;
      border-radius: 100%;
      background: rgba(0, 153, 153, 0.08);
    }
    &-arrow {
      font-weight: 500;
    }
  }
}
</style>
