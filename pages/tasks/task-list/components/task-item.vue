<template>
  <view class="task-item">
    <miot-card class="task-item__card" :show-sub-title="showSubTitle" :title="cardTitle" :content="cardContent"
      :subtitle="task.createTime">
      <template #header-right>
        <miot-tag :type="statusType">
          {{ task.status.desc }}
        </miot-tag>
      </template>
      <template v-if="isRepairOrMaintain && showActions" #body-bottom>
        <view class="u-flex u-row-between">
          <miot-icon-button v-if="isMaintain" icon="biaozhun" text="标准" @click="handleAttribute(0)"></miot-icon-button>
          <miot-icon-button :width="isMaintain ? '148rpx' : '208rpx'" icon="lishi" :text="isMaintain ? '历史' : '历史维修'"
            @click="handleAttribute(1)"></miot-icon-button>
          <miot-icon-button :width="isMaintain ? '148rpx' : '208rpx'" icon="shuxing" :text="isMaintain ? '数据' : '实时数据'"
            @click="handleAttribute(2)"></miot-icon-button>
          <miot-icon-button :width="isMaintain ? '148rpx' : '208rpx'" icon="ziliao" :text="isMaintain ? '资料' : '图档资料'"
            @click="handleAttribute(3)"></miot-icon-button>
        </view>
      </template>
      <template #footer>
        <view class="task-item__card__footer">
          <miot-button type="text" @click="handleViewDetail">
            查看详情
          </miot-button>
          <view v-if="isMyTask == 1 && showActions" class="task-item__card__footer__buttons">
            <miot-button v-if="showUpdateButton" plain @click="handleModifyTask">
              修改
            </miot-button>
            <miot-button v-if="showRevokeButton" @click="handleRevokeTask">
              撤销
            </miot-button>
            <miot-button v-if="showUpdateTimeButton" plain @click="handleUpdateTimeTask">
              修改时限
            </miot-button>
          </view>
          <view v-if="isMyTask == 0 && showActions" class="task-item__card__footer__buttons">
            <miot-button v-if="showTransferButton" plain @click="handleTransferTask">
              转单
            </miot-button>
            <miot-button v-if="showAcceptButton" @click="handleAcceptTask">
              接单
            </miot-button>
            <miot-button v-if="showReportButton" @click="handleReportTask">
              执行
            </miot-button>
            <miot-button v-if="showRejectButton" plain @click="handleRejectTask">
              驳回
            </miot-button>
            <miot-button v-if="showConfirmButton" @click="handleConfirmTask">
              确认
            </miot-button>
            <miot-button v-if="showDeleteButton" plain @click="handleDeleteTask">
              删除
            </miot-button>
          </view>
        </view>
      </template>
    </miot-card>
  </view>
</template>

<script setup>
import { formatTime } from "@/utils/date";
import { computed, toRef } from "vue";
import { taskTypes } from "../../task";
import { useTaskButtons } from "./use-task-buttons";

const emits = defineEmits(["revoke", "refresh", "accept", "updateTime"]);

// defineProps
const props = defineProps({
  task: {
    type: Object,
    default: () => ({}),
  },
  showSubTitle:{
      type: Boolean,
      default:true,
    },
  // 是否来自我的任务
  isMyTask: {
    type: [String, Number],
    default: "",
  },
  taskType: {
    type: Object,
    default: () => ({}),
  },
  showActions: {
    type: Boolean,
    default: true,
  },
});

const {
  showAcceptButton,
  showConfirmButton,
  showRejectButton,
  showReportButton,
  showTransferButton,
  showRevokeButton,
  showUpdateButton,
  showUpdateTimeButton,
  showDeleteButton,
  handleAcceptTask,
  handleTransferTask,
  handleRejectTask,
  handleConfirmTask,
  handleRevokeTask,
  handleReportTask,
  handleModifyTask,
  handleUpdateTimeTask,
  handleDeleteTask,
} = useTaskButtons(toRef(props, "task"), emits, props.taskType);

// 获取 status code
const code = computed(() => {
  return props.task.status.code;
});

// taskType 是 repair或者maintain
const isRepairOrMaintain = computed(() => {
  return (
    [taskTypes.repair.type, taskTypes.maintain.type].indexOf(
      props.taskType.type
    ) > -1
  );
});

const isMaintain = computed(() => {
  return (
    [taskTypes.maintain.type].indexOf(
      props.taskType.type
    ) > -1
  );
});

// NO_CONFIRM:待确认，REPAIRING:维修中，REPAIR_COMPLETE:维修完成，SCORE_COMPLETE:评分完成，OVERRULE:已驳回，REVOKE:已撤销
const statusType = computed(() => {
  switch (code.value) {
    case "NO_CONFIRM":
      return "danger";
    case "REPAIRING":
      return "process";
    case "REPAIR_COMPLETE":
      return "info";
    case "SCORE_COMPLETE":
      return "success";
    case "OVERRULE":
      return "overrule";
    case "REVOKE":
      return "light";
    default:
      return "primary";
  }
});

// 根据 taskType 获取 card title
const cardTitle = computed(() => {
  const { taskType, task } = props;
  return task[taskType.cardTitleKey];
});

const cardContent = computed(() => {
  const { task, taskType } = props;
  const result= [
    {
      label: taskType.cardContent1LabelKey,
      value: task[taskType.cardContent1ValueKey],
    },
    {
      label: taskType.cardContent2LabelKey,
      value: task[taskType.cardContent2ValueKey],
    },
    {
      label: taskType.cardContent3LabelKey,
      value: task[taskType.cardContent3ValueKey],
    },
    {
      label: taskType.cardContent4LabelKey,
      value: task[taskType.cardContent4ValueKey],
    },
    {
      label: taskType.cardContent5LabelKey,
      value:
        task.planFinishTime && formatTime(task.planFinishTime, "YYYY-MM-DD"),
    },
  ];
  return result
});

// 查看详情
const handleViewDetail = () => {
  uni.navigateTo({
    url: `/pages/tasks/task-detail/index?id=${props.task.id}&taskTypeName=${props.taskType.type}`,
  });
};

// handleAttribute
const handleAttribute = (value) => {
  // 跳转
  uni.navigateTo({
    url: `/pages/tasks/task-attributes/index?index=${value}&deviceId=${props.task.deviceId}&taskId=${props.task.id}&taskTypeName=${props.taskType.type}&title=${props.task.deviceName}`,
  });
};
</script>

<style lang="scss" scoped>
.task-item {
  &__view {
    padding: 16rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    &__time {
      font-size: 24rpx;
      color: #999999;
    }
  }

  &__card {

    &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__buttons {
        display: flex;
      }
    }
  }
}
</style>
