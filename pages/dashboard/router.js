import { taskTypes } from '@/pages/tasks/task';
// 定义工作台页面路由
const router = [
  {
    title: '三维助手',
    boxBgColor: 'rgba(66,219,194,0.12)',
    iconBgColor: 'linear-gradient(180deg, #3FD9BD 0%, #13B493 100%)',
    child: [
      {
        title: '模型浏览',
        path: '/pages/bim/index',
        icon: 'zaigangshezhi',
      },
    ],
  },
  {
    title: '数据看板',
    boxBgColor: 'rgba(102,166,255,0.12)',
    iconBgColor: 'linear-gradient(180deg, #7FB4FE 0%, #4B77FA 100%)',
    child: [
      {
        title: '产能绩效',
        path: '/pages/per-overview/pro-per/index',
        icon: 'channengjixiao',
      },
      {
        title: '运维绩效',
        path: '/pages/per-overview/maintain-pro/index',
        icon: 'yunweijixiao',
      },
      {
        title: '运行报表',
        path: '/pages/per-overview/run-report/index',
        icon: 'yunhangbaobiao',
      },
    ],
  },
  {
    title: '生产运维',
    boxBgColor: 'rgba(255,166,77,0.1)',
    iconBgColor: 'linear-gradient(180deg, #FFCA33 0%, #FA8F31 100%)',
    child: [
      {
        title: '维修提报',
        path: '/pages/tasks/task-list/index',
        icon: 'weixiutibao',
        params: {
          isMyTask: 1,
          taskTypeName: taskTypes.repair.type,
          title: '维修提报',
        },
      },
      {
        title: '维修任务',
        path: '/pages/tasks/task-list/index',
        icon: 'weixiurenwu',
        params: {
          taskTypeName: taskTypes.repair.type,
          title: '维修任务',
          isMyTask: 0,
        },
      },
      {
        title: '维修工单',
        path: '/pages/tasks/task-order/index',
        icon: 'weixiugongdan',
        params: {
          taskTypeName: taskTypes.repair.type,
          title: '任务工单',
        },
      },
    ],
  },
  {
    title: '日常任务',
    boxBgColor: 'rgba(128,149,255,0.12)',
    iconBgColor: 'linear-gradient(180deg, #83ADFF 0%, #8080FF 100%)',
    child: [
      {
        title: '任务提报',
        path: '/pages/tasks/task-list/index',
        icon: 'renwutibao',
        params: {
          isMyTask: 1,
          taskTypeName: taskTypes.daily.type,
          title: '任务提报',
        },
      },
      {
        title: '日常任务',
        path: '/pages/tasks/task-list/index',
        icon: 'richangrenwu',
        params: {
          taskTypeName: taskTypes.daily.type,
          title: '日常任务',
          isMyTask: 0,
        },
      },
      {
        title: '任务工单',
        path: '/pages/tasks/task-order/index',
        icon: 'renwugongdan',
        params: {
          taskTypeName: taskTypes.daily.type,
          title: '任务工单',
        },
      },
    ],
  },
  {
    title: '巡检管理',
    boxBgColor: '#FFF1F0',
    iconBgColor: 'linear-gradient(180deg, #FF9580 0%, #FF6B66 100%)',
    child: [
      {
        title: '巡检任务',
        path: '/pages/check/check-task/index',
        icon: 'xunjianrenwu',
      },
    ],
  },
  {
    title: '例行维保',
    boxBgColor: 'rgba(77,195,255,0.12)',
    iconBgColor: 'linear-gradient(180deg, #56C0F5 0%, #4DC3FF 0%, #2693FF 100%)',
    child: [
      {
        title: '例保任务',
        path: '/pages/tasks/task-list/index',
        icon: 'libaorenwu',
        params: {
          taskTypeName: 'maintain',
          title: '例保任务',
          isMyTask: 0,
        },
      },
      {
        title: '例保工单',
        path: '/pages/tasks/task-order/index',
        icon: 'libaogongdan',
        params: {
          taskTypeName: 'maintain',
          title: '例保工单',
        },
      },
    ],
  },
  {
    title: '设备管理',
    boxBgColor: 'rgba(66,219,219,0.12)',
    iconBgColor: 'linear-gradient(180deg, #16DBDB 0%, #00AACC 100%)',
    child: [
      {
        title: '设备监控',
        path: '/pages/device/device-monitor/index',
        icon: 'shebeijiankong',
      },
      {
        title: '设备数据',
        path: '/pages/device/device-data/index',
        icon: 'shebeishuju',
      },
    ],
  },

  {
    title: '工作助手',
    boxBgColor: 'rgba(66,219,194,0.12)',
    iconBgColor: 'linear-gradient(180deg, #3FD9BD 0%, #13B493 100%)',
    child: [
      {
        title: '在岗设置',
        path: '/pages/work-assistant/job-set/index',
        icon: 'zaigangshezhi',
      },
      {
        title: '图档资料',
        path: '/pages/work-assistant/document/index',
        icon: 'tudangziliao',
      },
    ],
  },
];

export default router;
