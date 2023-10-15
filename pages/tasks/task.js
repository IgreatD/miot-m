// 任务类型
const taskTypes = {
  maintain: {
    title: "例保",
    type: "maintain",
    serviceName: "maintainService",
    cardTitleKey: "deviceName",
    cardContent1LabelKey: "例保内容",
    cardContent1ValueKey: "content",
    cardContent2LabelKey: "例保依据",
    cardContent2ValueKey: "basisName",
    cardContent3LabelKey: "例保类型",
    cardContent3ValueKey: "typeName",
    cardContent4LabelKey: "责任人",
    cardContent4ValueKey: "dutyUserInfoStr",
    cardContent5LabelKey: "完成时限",
    cardContent5ValueKey: "planFinishTime",
  }, // 例保
  repair: {
    type: "repair",
    title: "维修",
    serviceName: "repairService",
    cardTitleKey: "deviceName",
    cardContent1LabelKey: "问题描述",
    cardContent1ValueKey: "taskDesc",
    cardContent2LabelKey: "故障类型",
    cardContent2ValueKey: "faultName",
    cardContent3LabelKey: "工单属性",
    cardContent3ValueKey: "liabilityTypeName",
    cardContent4LabelKey: "报修人员",
    cardContent4ValueKey: "username",
    cardContent5LabelKey: "完成时限",
    cardContent5ValueKey: "planFinishTime",
  }, // 维修
  daily: {
    title: "任务",
    type: "daily",
    serviceName: "taskService",
    cardTitleKey: "name",
    cardContent1LabelKey: "任务描述",
    cardContent1ValueKey: "taskDesc",
    cardContent2LabelKey: "任务类型",
    cardContent2ValueKey: "taskTypeName",
    cardContent3LabelKey: "责任区域",
    cardContent3ValueKey: "areaName",
    cardContent4LabelKey: "处理人员",
    cardContent4ValueKey: "handlePersonName",
    cardContent5LabelKey: "完成时限",
    cardContent5ValueKey: "planFinishTime",
  }, // 日常
};

export { taskTypes };
