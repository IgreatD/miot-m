<template>
  <view class="" style="height: calc(100% - 72rpx)">
    <view class="device-tabs">
      <view
        v-for="(tab, idx) in tabs.list"
        :key="idx"
        :class="{ 'active-tab': tabs.current === idx + startIndex }"
        class="tab-item"
        @click="tabChange(tab, idx)"
      >
        {{ tab.name }}
      </view>
      <!-- <u-tabs v-model="tabs.current" :list="tabs.list" :is-scroll="false" :bold="false" bar-height="4" bar-width="120"
        active-color="#009999" inactive-color="#333333" font-size="28" @change="tabChange"></u-tabs> -->
    </view>
    <view style="height: 72rpx" />
    <!-- <scroll-view class="scroll-wrapper" scroll-y="true" scroll-x="false"> -->
    <template v-if="!props.fromHome">
      <standard
        v-if="tabs.current === 0 && taskTypeName === 'maintain'"
        :task-id="taskId"
      ></standard>
      <device-history
        v-if="tabs.current === 1"
        :device-id="props.deviceId"
        :task-type-name="props.taskTypeName"
      />
      <device-attributes v-if="tabs.current === 2" :device-id="props.deviceId" />
      <device-files
        v-if="tabs.current === 3"
        :device-id="props.deviceId"
        :biz-id="props.deviceId"
      />
    </template>
    <template v-if="props.fromHome == 1">
      <device-files v-show="tabs.current === 0" :biz-id="props.deviceId" />
      <device-online v-show="tabs.current === 1" />
      <device-attributes v-show="tabs.current === 2" :device-id="props.deviceId" />
      <device-history
        v-show="tabs.current === 3"
        :device-id="props.deviceId"
        :task-type-name="props.taskTypeName"
      />
    </template>
    <!-- </scroll-view> -->
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import DeviceHistory from './components/history.vue';
import DeviceAttributes from './components/attributes.vue';
import DeviceFiles from './components/files.vue';
import DeviceOnline from './components/online.vue';
import standard from './components/standard.vue';
import { taskTypes } from '../task';
const props = defineProps({
  taskId: {
    type: String,
    default: '',
  },
  deviceId: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  taskTypeName: {
    type: String,
    default: '',
  },
  index: {
    type: String,
    default: '0',
  },
  fromHome: {
    type: String,
    default: '0',
  },
});

setTimeout(() => {
  uni.setNavigationBarTitle({
    title: props.title,
  });
}, 200);

const startIndex = ref(props.fromHome === '1' ? 0 : props.taskTypeName === 'maintain' ? 0 : 1);

const tabs = reactive({
  current: parseInt(props.index),
  list:
    props.fromHome === '1'
      ? [{ name: '随机资料' }, { name: '基本属性' }, { name: '实时数据' }, { name: '维修记录' }]
      : props.taskTypeName === 'maintain'
      ? [{ name: '方法标准' }, { name: '历史保养' }, { name: '实时数据' }, { name: '图档资料' }]
      : [{ name: '历史维修' }, { name: '实时数据' }, { name: '图档资料' }],
});
const tabChange = (tab, idx) => {
  tabs.current = idx + startIndex.value;
};
</script>

<style lang="scss" scoped>
.device-tabs {
  position: fixed;
  // #ifdef APP-PLUS
  top: 0;

  // #endif
  // #ifndef APP-PLUS
  top: calc(var(--window-top));
  // #endif
  left: 0;
  right: 0;
  z-index: 11;
  height: 72rpx;
  display: flex;
  background: #00b3b3;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;

  .tab-item {
    width: 152rpx;
    height: 48rpx;

    border-radius: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .active-tab {
    background: #ffffff;
    color: #009999;
  }
}

.scroll-wrapper {
  height: calc(100vh - 72rpx - var(--window-top));
}
</style>
