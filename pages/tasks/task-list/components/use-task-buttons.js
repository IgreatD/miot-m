import { computed } from "vue";

const useTaskButtons = (task, emits, taskType) => {
  // NO_CONFIRM:待确认，REPAIRING:维修中，REPAIR_COMPLETE:维修完成，SCORE_COMPLETE:评分完成，OVERRULE:已驳回，REVOKE:已撤销
  const code = computed(() => {
    return task.value.status.code;
  });

  // 是否显示撤销按钮
  const showRevokeButton = computed(() => {
    return ["NO_CONFIRM"].includes(code.value);
  });

  // 是否显示修改按钮
  const showUpdateButton = computed(() => {
    return ["NO_CONFIRM"].includes(code.value);
  });

  // 是否显示修改时限按钮
  const showUpdateTimeButton = computed(() => {
    return false && ["REPAIRING"].includes(code.value);
  });

  // 是否显示接单按钮
  const showAcceptButton = computed(() => {
    return ["NO_CONFIRM"].includes(code.value);
  });

  // 是否显示转单按钮
  const showTransferButton = computed(() => {
    return ["NO_CONFIRM", "OVERRULE", "REPAIRING"].includes(code.value);
  });

  // 是否显示上报按钮
  const showReportButton = computed(() => {
    return ["REPAIRING", "OVERRULE"].includes(code.value);
  });

  // 是否显示驳回按钮
  const showRejectButton = computed(() => {
    return ["REPAIR_COMPLETE"].includes(code.value);
  });

  // 是否显示确认按钮
  const showConfirmButton = computed(() => {
    return ["REPAIR_COMPLETE"].includes(code.value);
  });

  // 是否显示删除按钮
  const showDeleteButton = computed(() => {
    return ["REVOKE"].includes(code.value);
  });

  // 处理接单任务
  const handleAcceptTask = () => {
    console.log("接单");
    emits("accept", task.value);
  };

  // 处理转单任务
  const handleTransferTask = () => {
    console.log("转单");
    // 存储任务到本地
    uni.setStorageSync("task", task.value);
    // 跳转到转单页面
    uni.navigateTo({
      url: `/pages/tasks/task-transfer/index?id=${task.value.id}&taskTypeName=${taskType.type}`,
    });
  };

  // 处理驳回任务
  const handleRejectTask = () => {
    console.log("驳回");
    // 跳转到驳回页面
    uni.navigateTo({
      url: `/pages/tasks/task-reject/index?id=${task.value.id}&taskTypeName=${taskType.type}`,
    });
  };

  // 处理确认任务
  const handleConfirmTask = () => {
    console.log("确认");
    // 跳转到确认页面
    uni.navigateTo({
      url: `/pages/tasks/task-confirm/index?id=${task.value.id}&taskTypeName=${taskType.type}`,
    });
  };

  // 处理撤销任务
  const handleRevokeTask = () => {
    console.log("撤销");
    emits("revoke", task.value);
  };

  // 处理修改任务
  const handleModifyTask = () => {
    console.log("修改");
    console.log(task.value);
    uni.navigateTo({
      url:
        "/pages/tasks/task-create/index" +
        `?taskTypeName=${taskType.type}&title=${taskType.title}&id=${task.value.id}`,
    });
  };

  // 处理上报任务
  const handleReportTask = () => {
    console.log("上报");
    // 跳转到上报页面
    uni.navigateTo({
      url: `/pages/tasks/task-report/index?id=${task.value.id}&taskTypeName=${taskType.type}`,
    });
  };

  // 处理修改时限任务
  const handleUpdateTimeTask = () => {
    console.log("修改时限");
    // 跳转到修改时限页面
    emits("updateTime", task.value);
  };

  // 处理删除任务
  const handleDeleteTask = () => {
    uni.$service[taskType.serviceName].deleteTask(task.value.id).then(() => {
      uni.showToast({
        title: "删除成功",
        icon: "success",
        duration: 2000,
      });
      setTimeout(() => {
        emits("refresh");
      }, 2000);
    });
  };

  return {
    showAcceptButton,
    showTransferButton,
    showReportButton,
    showRejectButton,
    showConfirmButton,
    showRevokeButton,
    showUpdateTimeButton,
    showUpdateButton,
    showDeleteButton,
    handleAcceptTask,
    handleTransferTask,
    handleRejectTask,
    handleConfirmTask,
    handleRevokeTask,
    handleModifyTask,
    handleReportTask,
    handleUpdateTimeTask,
    handleDeleteTask,
  };
};

export { useTaskButtons };
