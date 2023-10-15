<template>
  <view class="u-p-16">
    <z-paging ref="paging" v-model:modelValue="list" :use-page-scroll="true" @query="queryList">
      <view v-for="task in list" :key="task.id">
        <task-item
          :show-sub-title="false"
          :task="task"
          :is-my-task="0"
          :task-type="taskType"
          :show-actions="false"
        >
        </task-item>
      </view>
    </z-paging>
  </view>
</template>

<script>
import { defineComponent, ref } from 'vue';
import TaskItem from '@/pages/tasks/task-list/components/task-item.vue';
import { taskTypes } from '../../task';
export default defineComponent({
  name: 'DeviceHistory',
  components: {
    TaskItem,
  },
  props: {
    deviceId: {
      type: String,
      default: '',
    },
    taskTypeName: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const list = ref([]);
    const paging = ref(null);
    const taskType = taskTypes[props.taskTypeName];
    const requireMethod =
      taskType.type === 'maintain' ? 'getHistoryWorkOrderList' : 'getHistoryWorkOrderListRepaire';
    const queryList = (pageNo, pageSize) => {
      uni.$service.deviceService[requireMethod]({
        deviceId: props.deviceId,
        pageNum: pageNo,
        size: pageSize,
      })
        .then((res) => {
          paging.value.complete(res.dataList);
        })
        .catch((err) => {
          console.log(err);
          paging.value.complete(false);
        });
    };
    return { list, queryList, paging, taskType };
  },
});
</script>

<style lang="scss" scoped></style>
