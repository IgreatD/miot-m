<template>
  <view>
    <!-- <miot-tabs v-model="tabIndex" :tab-list="tabs" fixed />
    <view v-show="tabIndex === 0" class="u-p-l-24 u-p-r-24 u-p-b-24">
      <job-item-component v-for="item in list" :key="item.id" :item="item" />
    </view> -->
    <z-paging ref="paging" v-model:modelValue="list" class="u-p-l-24 u-p-r-24 u-p-b-24" :fixed="true" @query="queryList">
      <template #top>
        <miot-tabs v-model:value="tabIndex" :tab-list="tabs" :fixed="true" :is-scroll="false" @change="tabChange" />
      </template>
      <job-item-component v-for="item in list" :key="item.id" :item="item" @refresh="refresh" />
    </z-paging>
  </view>
</template>

<script setup>
import { setUnfinishedTaskList, initCacheData } from '../_utils/cache';

import jobItemComponent from './components/job-item.vue';
// 定义 tabs
const tabs = ref([
  {
    name: '未处理',
    value: 0,
  },
  {
    name: '已处理',
    value: 1,
  },
]);
const tabIndex = ref(0);
const paging = ref(null);
const list = ref([]);

const tabChange = (val) => {
  tabIndex.value = val;
  paging.value.refresh();
};

const refresh = () => {
  paging.value.refresh();
};

// 获取巡检任务列表
const queryList = (pageNo, pageSize) => {
  list.value = [];
  if (tabIndex.value === 0) {
    uni.$service.jobService
      .getUnHandleJobList()
      .then((res) => {
        paging.value.complete(res);
        // 设置缓存
        setUnfinishedTaskList(res);
      })
      .catch((err) => {
        console.log(err);
        paging.value.complete(false);
      });
  } else {
    uni.$service.jobService
      .getHandledJobList({
        pageNum: pageNo,
        pageSize,
      })
      .then((res) => {
        paging.value.complete(res.dataList);
      })
      .catch((err) => {
        console.log(err);
        paging.value.complete(false);
      });
  }
};

initCacheData();

onMounted(() => {
  uni.$on('jobListRefresh', refresh);
});

onUnload(() => {
  uni.$off('jobListRefresh', refresh);
});

defineExpose({
  refresh,
});
</script>

<style scoped lang="scss"></style>
