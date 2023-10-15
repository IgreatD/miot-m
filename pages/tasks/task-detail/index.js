import { formatTime } from "@/utils/date";
import { computed } from "vue";
import { taskTypes } from "../task";

const useTaskDetail = (taskDetail, taskTypeName) => {
  const repairCardTitle = "维修记录详情";
  const dailyCardTitle = "日常任务详情";
  const mainTainCardTitle = "例保记录详情";
  const repairCardContent = computed(() => {
    return [
      {
        label: "设备名称",
        value: taskDetail.value.deviceName,
      },
      {
        label: "故障类型",
        value: taskDetail.value.faultName,
      },
      {
        label: "责任区域",
        value: taskDetail.value.areaName,
      },
      {
        label: "工单属性",
        value: taskDetail.value.liabilityTypeName,
      },
    ];
  });

  const dailyCardContent = computed(() => {
    return [
      {
        label: "任务名称",
        value: taskDetail.value.name,
      },
      {
        label: "任务类型",
        value: taskDetail.value.taskTypeName,
      },
      {
        label: "责任区域",
        value:taskDetail.value.areaName,
      },
    ];
  });

  const mainTainCardContent = computed(() => {
    return [
      {
        label: "设备名称",
        value: taskDetail.value.deviceName,
      },
     
      {
        label: "例保依据",
        value: taskDetail.value.basisName,
      },
      {
        label: "例保类型",
        value: taskDetail.value.typeName,
      },
      {
        label: "例保内容",
        value: taskDetail.value.content,
      },
      {
        label: "例保方法",
        value: taskDetail.value.method,
      },
      {
        label: "例保标准",
        value: taskDetail.value.standard,
      },
    ];
  });

  const repairSteps = computed(() => {
    const taskSend = {
      title: "任务发起",
      icon: "wentifaqiicon",
      active: true,
      contents: [
        {
          type: "text",
          label: "报修人员",
          text: `${taskDetail.value.username||''} ${taskDetail.value.userPhone||''}`,
        },
        {
          type: "text",
          label: "发起时间",
          text: taskDetail.value.createTime,
        },
        {
          type: "text",
          label: "完成时限",
          text:
            taskDetail.value.planFinishTime &&
            formatTime(taskDetail.value.planFinishTime, "YYYY-MM-DD"),
        },
        {
          type: "text",
          label: "问题描述",
          text: taskDetail.value.taskDesc,
        },
        {
          type: "image",
          label: "故障照片",
          readonly: true,
          images: taskDetail.value.descImageFileInfo,
        },
        {
            type: "attachment",
            label: "附件",
            readonly: true,
            attachments: taskDetail.value.descAttachmentFileInfo,
        },
      ],
    };
    let taskHandler = null;
    if (taskDetail.value.handleTime) {
      taskHandler = {
        title: "任务执行",
        icon: "wentichuliicon",
        active: true,
        contents: [
          {
            type: "text",
            label: "维修人员",
            text: `${taskDetail.value.handlePersonName||''} ${taskDetail.value.handlePersonPhone||''}`,
          },
          {
            type: "text",
            label: "接单时间",
            text: taskDetail.value.orderTime,
          },
          {
            type: "text",
            label: "反馈时间",
            text: taskDetail.value.handleTime,
          },
          {
            type: "text",
            label: "处理描述",
            text: taskDetail.value.handleDesc,
          },
          {
            type: "image",
            label: "结果照片",
            readonly: true,
            images: taskDetail.value.handleImageFileInfo,
          },
          {
            type: "attachment",
            label: "附件",
            readonly: true,
            attachments: taskDetail.value.handleAttachmentFileInfo,
        },
        ],
      };
    }else{
      taskHandler = {
        title: "任务执行",
        icon: "wentichuliicon",
        iconColor:'#C9CBCCFF',
        active: false,
        contents: [
          {
            type: "text",
            label: "维修人员",
            text: `${taskDetail.value.handlePersonName||''} ${taskDetail.value.handlePersonPhone||''}`,
          },
        ],
      };
    }
    // 驳回逻辑
    let taskOverrule=null
    if(taskDetail.value.overruleRecord.overruleTime){
      taskOverrule = {
        title: "工单驳回",
        icon: "chehui",
        iconColor:'#7d72fa7f',
        active: true,
        contents: [
          {
            type: "text",
            label: "驳回人员",
            text: `${taskDetail.value.overruleRecord.overruleUsername} ${taskDetail.value.overruleRecord.overruleUserPhone}`,
          },
          {
            type: "text",
            label: "驳回意见",
            text: taskDetail.value.overruleRecord.overruleReason,
          },
          {
            type: "text",
            label: "驳回时间",
            text: taskDetail.value.overruleRecord.overruleTime,
          }
        ],
      }
    }
    let taskSecondHandler=null
    if(taskDetail.value.overruleRecord.feedBackTime){
      taskSecondHandler={
        title: "任务执行",
        icon: "wentichuliicon",
        active: true,
        contents: [
          {
            type: "text",
            label: "维修人员",
            text: `${taskDetail.value.overruleRecord.handlePersonName||''} '${taskDetail.value.overruleRecord.handlePersonPhone||''}`,
          },
          {
            type: "text",
            label: "反馈时间",
            text: taskDetail.value.overruleRecord.feedBackTime,
          },
          {
            type: "text",
            label: "处理描述",
            text: taskDetail.value.overruleRecord.handleDesc,
          },
          {
            type: "image",
            label: "结果照片",
            readonly: true,
            images: taskDetail.value.overruleRecord.handleImageFileInfo,
          },
          {
            type: "attachment",
            label: "附件",
            readonly: true,
            attachments: taskDetail.value.overruleRecord.handleAttachmentFileInfo,
          },
        ],
      }
    }else if(taskDetail.value.overruleRecord.overruleTime){
      taskSecondHandler={
        title: "任务执行",
        icon: "wentichuliicon",
        iconColor:'#C9CBCCFF',
        active: false,
        contents: [
          {
            type: "text",
            label: "维修人员",
            text: `${taskDetail.value.handlePersonName||''} ${taskDetail.value.handlePersonPhone||''}`,
          },
        ],
      };
    }
    let taskConfirm = null;
    if (taskDetail.value.finishTime) {
      taskConfirm = {
        title: "任务确认",
        icon: "wentiweijiancha",
        iconColor:'#2AD680FF',
        active: true,
        contents: [
          {
            type: "text",
            label: "确认人员",
            text: `${taskDetail.value.username||''} ${taskDetail.value.userPhone||''}`,
          },
          {
            type: "text",
            label: "评价意见",
            text: taskDetail.value.handleComment,
          },
          {
            type: "text",
            label: "确认时间",
            text: taskDetail.value.finishTime,
          },
          {
            type: "score",
            label: "结果评价",
            readonly: true,
            count: 5,
            value: taskDetail.value.handleScore || 0,
          },
        ],
      };
    }else{
      taskConfirm = {
        title: "任务确认",
        icon: "wentichuliicon",
        iconColor:'#C9CBCCFF',
        active: false,
        contents: [
          {
            type: "text",
            label: "确认人员",
            text: `${taskDetail.value.username||''} ${taskDetail.value.userPhone||''}`,
          },
        ],
      };
    }
    return [taskSend, taskHandler,taskOverrule,taskSecondHandler, taskConfirm].filter((item) => {
      if (item) {
        return item;
      }
    });
  });

  const dailySteps = computed(() => {
    const taskSend = {
      title: "任务发起",
      icon: "wentifaqiicon",
      active: true,
      contents: [
        {
          type: "text",
          label: "发起人员",
          text: `${taskDetail.value.username||''} ${taskDetail.value.userPhone||''}`,
        },
        {
          type: "text",
          label: "发起时间",
          text: taskDetail.value.createTime,
        },
        {
          type: "text",
          label: "完成时限",
          text:
            taskDetail.value.planFinishTime &&
            formatTime(taskDetail.value.planFinishTime, "YYYY-MM-DD"),
        },
        {
          type: "text",
          label: "任务描述",
          text: taskDetail.value.taskDesc,
        },
        {
          type: "image",
          label: "任务照片",
          readonly: true,
          images: taskDetail.value.descImageFileInfo,
        },
      ],
    };
    let taskHandler = null;
    if (taskDetail.value.handleDesc) {
      taskHandler = {
        title: "任务处理",
        icon: "wentichuliicon",
        active: true,
        contents: [
          {
            type: "text",
            label: "处理人员",
            text: `${taskDetail.value.handlePersonName||''} ${taskDetail.value.handlePersonPhone||''}`,
          },
          {
            type: "text",
            label: "接单时间",
            text: taskDetail.value.orderTime,
          },
          {
            type: "text",
            label: "反馈时间",
            text: taskDetail.value.handleTime,
          },
          {
            type: "text",
            label: "结果描述",
            text: taskDetail.value.handleDesc,
          },
          {
            type: "image",
            label: "结果照片",
            readonly: true,
            images: taskDetail.value.handleImageFileInfo,
          },
          {
            type: "text",
            label: "任务时长",
            text: taskDetail.value.totalTime,
          },
        ],
      };
    } else {
      taskHandler = {
        title: "任务处理",
        icon: "wentichuliicon",
        iconColor:'#C9CBCCFF',
        active: false,
        contents: [
          {
            type: "text",
            label: "处理人员",
            text: `${taskDetail.value.handlePersonName||''} ${taskDetail.value.handlePersonPhone||''}`,
          },
        ],
      };
    }
    let taskOverrule=null
    if(taskDetail.value.overruleRecord.overruleTime){
      taskOverrule = {
        title: "工单驳回",
        icon: "chehui",
        iconColor:'#7d72fa7f',
        active: true,
        contents: [
          {
            type: "text",
            label: "驳回人员",
            text: taskDetail.value.overruleRecord.overruleUsername+' '+taskDetail.value.overruleRecord.overruleUserPhone,
          },
          {
            type: "text",
            label: "驳回意见",
            text: taskDetail.value.overruleRecord.overruleReason,
          },
          {
            type: "text",
            label: "驳回时间",
            text: taskDetail.value.overruleRecord.overruleTime,
          }
        ],
      }
    }
    let taskSecondHandler=null
    if(taskDetail.value.overruleRecord.feedBackTime){
      taskSecondHandler={
        title: "任务执行",
        icon: "wentichuliicon",
        active: true,
        contents: [
          {
            type: "text",
            label: "处理人员",
            text: `${taskDetail.value.overruleRecord.handlePersonName||''} '${taskDetail.value.overruleRecord.handlePersonPhone||''}`,
          },
          {
            type: "text",
            label: "反馈时间",
            text: taskDetail.value.overruleRecord.feedBackTime,
          },
          {
            type: "text",
            label: "处理描述",
            text: taskDetail.value.overruleRecord.handleDesc,
          },
          {
            type: "image",
            label: "结果照片",
            readonly: true,
            images: taskDetail.value.overruleRecord.handleImageFileInfo,
          },
        ],
      }
    }else if(taskDetail.value.overruleRecord.overruleTime){
      taskSecondHandler={
        title: "任务执行",
        icon: "wentichuliicon",
        iconColor:'#C9CBCCFF',
        active: false,
        contents: [
          {
            type: "text",
            label: "维修人员",
            text: `${taskDetail.value.handlePersonName||''} ${taskDetail.value.handlePersonPhone||''}`,
          },
        ],
      };
    }
    let taskConfirm = null;
    if (taskDetail.value.handleComment) {
      taskConfirm = {
        title: "任务确认",
        icon: "wentiweijiancha",
        iconColor:'#2AD680FF',
        active: true,
        contents: [
          {
            type: "text",
            label: "确认人员",
            text: `${taskDetail.value.username||''}' '${taskDetail.value.userPhone||''}`,
          },
          {
            type: "text",
            label: "评价意见",
            text: taskDetail.value.handleComment,
          },
          {
            type: "text",
            label: "确认时间",
            text: taskDetail.value.finishTime,
          },
          {
            type: "score",
            label: "结果评价",
            readonly: true,
            count: 5,
            value: taskDetail.value.handleScore || 0,
          },
        ],
      };
    } else {
      taskConfirm = {
        title: "任务确认",
        icon: "wentichuliicon",
        iconColor:'#C9CBCCFF',
        active: false,
        contents: [
          {
            type: "text",
            label: "确认人员",
            text: taskDetail.value.username,
          },
        ],
      };
    }
    return [taskSend, taskHandler,taskOverrule,taskSecondHandler, taskConfirm].filter((item) => {
      if (item) {
        return item;
      }
    });;
  });

  const mainTainSteps = computed(() => {
    const taskSend = {
      title: "任务发起",
      icon: "wentifaqiicon",
      active: true,
      contents: [
        {
          type: "text",
          label: "责任人",
          showDetail:true,
          multilPerson:taskDetail.value.dutyUserInfoList,
          text:(()=>{
            const dutyUserInfoList=taskDetail.value.dutyUserInfoList
            if(dutyUserInfoList&&dutyUserInfoList.length>0){
             return dutyUserInfoList[0].nickName+' '+dutyUserInfoList[0].mobile
            }
            else{
              return ''
            }
          })()
        },
        {
          type: "text",
          label: "派发时间",
          text: taskDetail.value.createTime,
        },
        {
          type: "text",
          label: "完成时限",
          text:
            taskDetail.value.planFinishTime &&
            formatTime(taskDetail.value.planFinishTime, "YYYY-MM-DD"),
        },
        {
          type: "attachment",
          label: "附件",
          readonly: true,
          attachments: taskDetail.value.attachmentInfo,
        },
      ],
    };
    let taskHandler = null;
    if (taskDetail.value.result) {
      taskHandler = {
        title: "任务处理",
        icon: "wentichuliicon",
        active: true,
        contents: [
          {
            type: "text",
            label: "保养人员",
            text: taskDetail.value.handlePersonName,
          },
          {
            type: "text",
            label: "接单时间",
            text: taskDetail.value.orderTime,
          },
          {
            type: "text",
            label: "反馈时间",
            text: taskDetail.value.handleTime,
          },
          {
            type: "text",
            label: "例保结果",
            text: taskDetail.value.result,
          },
          {
            type: "image",
            label: "结果照片",
            readonly: true,
            images: taskDetail.value.handleImageFileInfo,
          },
          // {
          //   type: "text",
          //   label: "例保时长",
          //   text: taskDetail.value.totalTime,
          // },
        ],
      };
    } 
    else {
      taskHandler = {
        title: "任务处理",
        icon: "wentichuliicon",
        iconColor:'#C9CBCCFF',
        active: false,
        contents: [
          {
            type: "text",
            label: "保养人员",
            text: taskDetail.value.handlePersonName,
          },
        ],
      };
    }
    let taskOverrule=null
    if(taskDetail.value.overruleRecord.overruleTime){
      taskOverrule = {
        title: "工单驳回",
        icon: "chehui",
        iconColor:'#7d72fa7f',
        active: true,
        contents: [
          {
            type: "text",
            label: "驳回人员",
            text: taskDetail.value.overruleRecord.overruleUsername+' '+taskDetail.value.overruleRecord.overruleUserPhone,
          },
          {
            type: "text",
            label: "驳回意见",
            text: taskDetail.value.overruleRecord.overruleReason,
          },
          {
            type: "text",
            label: "驳回时间",
            text: taskDetail.value.overruleRecord.overruleTime,
          }
        ],
      }
    }
    let taskSecondHandler=null
    if(taskDetail.value.overruleRecord.feedBackTime){
      taskSecondHandler={
        title: "任务执行",
        icon: "wentichuliicon",
        active: true,
        contents: [
          {
            type: "text",
            label: "维修人员",
            text: taskDetail.value.overruleRecord.handlePersonName+' '+taskDetail.value.overruleRecord.handlePersonPhone,
          },
          {
            type: "text",
            label: "反馈时间",
            text: taskDetail.value.overruleRecord.feedBackTime,
          },
          {
            type: "text",
            label: "处理描述",
            text: taskDetail.value.overruleRecord.handleDesc,
          },
          {
            type: "image",
            label: "结果照片",
            readonly: true,
            images: taskDetail.value.overruleRecord.handleImageFileInfo,
          },
        ],
      }
    }else if(taskDetail.value.overruleRecord.overruleTime){
      taskSecondHandler={
        title: "任务执行",
        icon: "wentichuliicon",
        iconColor:'#C9CBCCFF',
        active: false,
        contents: [
          {
            type: "text",
            label: "维修人员",
            text: taskDetail.value.handlePersonName,
          },
        ],
      };
    }

    let taskConfirm = null;
    if (taskDetail.value.handleComment) {
      taskConfirm = {
        title: "任务确认",
        icon: "wentiweijiancha",
        active: true,
        contents: [
          {
            type: "text",
            label: "确认人员",
            text: taskDetail.value.confirmPersonName,
          },
          {
            type: "text",
            label: "评价意见",
            text: taskDetail.value.handleComment,
          },
          {
            type: "text",
            label: "确认时间",
            text: taskDetail.value.finishTime,
          },
          {
            type: "score",
            label: "结果评价",
            readonly: true,
            count: 5,
            value: taskDetail.value.handleScore || 0,
          },
        ],
      };
    }else {
      // taskConfirm = {
      //   title: "例保确认",
      //   icon: "wentiweijiancha",
      //   iconColor:'#C9CBCCFF',
      //   active: false,
      //   contents: [
      //     {
      //       type: "text",
      //       label: "确认人员",
      //       text: taskDetail.value.username+' '+taskDetail.value.userPhone,
      //     },
      //   ],
      // };
    }
    return [taskSend, taskHandler,taskOverrule,taskSecondHandler, taskConfirm].filter((item) => {
      if (item) {
        return item;
      }
    });;
  });

  return {
    cardTitle:
      taskTypeName === taskTypes.repair.type
        ? repairCardTitle
        : taskTypeName === taskTypes.daily.type
        ? dailyCardTitle
        : mainTainCardTitle,
    cardContent:
      taskTypeName === taskTypes.repair.type
        ? repairCardContent
        : taskTypeName === taskTypes.daily.type
        ? dailyCardContent
        : mainTainCardContent,
    steps:
      taskTypeName === taskTypes.repair.type
        ? repairSteps
        : taskTypeName === taskTypes.daily.type
        ? dailySteps
        : mainTainSteps,
  };
};

export { useTaskDetail };
