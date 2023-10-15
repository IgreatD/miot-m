<template>
  <view>
    <z-paging ref="paging" v-model:modelValue="taskList" class="task-list" :fixed="true" @query="queryList">
      <template v-if="isMyTask == 0" #top>
        <miot-tabs v-model:value="current" :tab-list="tabs" :fixed="true" :is-scroll="false" @change="tabChange" />
      </template>
      <view v-for="task in taskList" :key="task.id">
        <task-item :task="task" :task-type="taskType" :is-my-task="isMyTask" @refresh="refresh"
          @update-time="updateTime(task)" @accept="updateModal(task, 'accept', '是否确认接收工单？')"
          @revoke="updateModal(task, 'revoke', '是否确认撤销工单？')">
        </task-item>
      </view>
    </z-paging>
    <miot-float-button v-if="isMyTask == 1" :style-obj="{ background: '#FFB419' }" @click="navigateToNewReport" />
    <u-modal v-model:modelValue="modal.showModal" :content="modal.content" :title="modal.title" :show-cancel-button="true"
      @confirm="handleConfirm" />
    <u-calendar v-model:modelValue="calendar.showCalender" mode="date" @change="onCalenderChange"></u-calendar>
  </view>
</template>

<script setup>
import TaskItem from "./components/task-item.vue";
import { ref, reactive, computed } from "vue";
import { useTabBar } from "./index";
import { onReady } from "@dcloudio/uni-app";
import { taskTypes } from "../task";
import { useUserStore } from "@/store/modules/user";

const props = defineProps({
  taskTypeName: {
    type: String,
    default: "",
  }, // 任务类型
  isMyTask: {
    type: [Number, String],
    default: 0,
  }, // 是否是我的任务
  title: {
    type: String,
    default: "",
  },
});

const modal = reactive({
  showModal: false,
  task: undefined,
  content: "",
  title: "",
  actionType: "",
});

const calendar = reactive({
  showCalender: false,
  task: undefined,
});

// 根据 taskTypeName 获取 taskType
const taskType = computed(() => {
  return taskTypes[props.taskTypeName];
});

const paging = ref(null);

const taskList = ref([]);

const { current, tabChange, tabs } = useTabBar(paging, taskList);

// 定义 refresh
const refresh = () => {
  paging.value.refresh();
};

const navigateToNewReport = () => {
  uni.navigateTo({
    url: `/pages/tasks/task-create/index?taskTypeName=${props.taskTypeName}`,
  });
};

// updateTime
const updateTime = (task) => {
  calendar.task = task;
  calendar.showCalender = true;
};

const updateModal = (task, actionType, content) => {
  modal.task = task;
  modal.actionType = actionType;
  modal.showModal = true;
  modal.content = content;
};

const onCalenderChange = (e) => {
  uni.$service[taskType.value.serviceName]
    .saveTask({
      id: calendar.task.id,
      planFinishTime: e.result,
    })
    .then((res) => {
      console.log(res);
      // 提示接单成功
      uni.showToast({
        title: "更新成功",
        duration: 1500,
      });
      // 刷新页面
      refresh();
    })
    .catch((err) => {
      console.log(err);
    });
};

// handleConfirm
const handleConfirm = () => {
  switch (modal.actionType) {
    case "accept":
      acceptTask();
      break;
    case "revoke":
      revokeTask();
      break;
    default:
      break;
  }
};

// revoke task
const revokeTask = () => {
  uni.$service[taskType.value.serviceName]
    .revokeTask({
      id: modal.task.id,
    })
    .then((res) => {
      console.log(res);
      // 提示接单成功
      uni.showToast({
        title: "撤销成功",
        duration: 1500,
      });
      // 刷新页面
      refresh();
    })
    .catch((err) => {
      console.log(err);
    });
};

// accept task
const acceptTask = () => {
  uni.$service[taskType.value.serviceName]
    .acceptTask({
      id: modal.task.id,
      handlePersonId:
        modal.task.handlePersonId || useUserStore().userInfo.userId,
    })
    .then((res) => {
      console.log(res);
      // 提示接单成功
      uni.showToast({
        title: "接单成功",
        duration: 1500,
      });
      // 刷新页面
      refresh();
    })
    .catch((err) => {
      console.log(err);
    });
};

const queryList = (pageNo, pageSize) => {
  console.log('props.isMyTask',props.isMyTask)
  if (props.isMyTask == 0) {
    if (current.value === 1) {
      getHandleTaskList(pageNo, pageSize);
    } else {
      getUnhandleTaskList(pageNo, pageSize);
    }
  } else {
    getCreateList(pageNo, pageSize);
  }
};

const getCreateList = (pageNo, pageSize) => {
  console.log('taskType',taskType.value)
  uni.$service[taskType.value.serviceName]
    .getCreateList({
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

// 获取未处理的任务列表
const getUnhandleTaskList = (pageNo, pageSize) => {
  uni.$service[taskType.value.serviceName]
    .getUnhandleTaskList({
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

// 获取已处理的任务列表
const getHandleTaskList = (pageNo, pageSize) => {
  console.log("taskType.value",taskType.value);
  uni.$service[taskType.value.serviceName]
    .getHandledTaskList({
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

defineExpose({
  refresh,
});

onReady(() => {
  if (props.title) {
    // 设置标题
    uni.setNavigationBarTitle({
      title: props.title,
    });
  }
});
</script>

<style lang="scss" scoped>
.task-list {
  padding: 0 16rpx 16rpx;
  background-color: #F2F4F7;
}
</style>
