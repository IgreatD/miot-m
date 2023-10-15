import { ref, onMounted } from "vue";
import { randomTime } from "@/utils/date";

/**
 * 定义今日报警数据
 * @returns 图表配置
 */
const useTodayAlarm = () => {
  const chartData = ref({});

  const opts = {
    color: [
      "#1890FF",
      "#91CB74",
      "#FAC858",
      "#EE6666",
      "#73C0DE",
      "#3CA272",
      "#FC8452",
      "#9A60B4",
      "#ea7ccc",
    ],
    padding: undefined,
    title: {
      name: "75%",
      fontSize: 32,
      color: "#000000",
    },
    subtitle: {
      name: "提报比例",
      fontSize: 16,
      color: "#666666",
      offsetY:5
    },
    extra: {
      arcbar: {
        type: "default",
        width: 16,
        backgroundColor: "#ECEDF0",
        startAngle: 1,
        endAngle: 0,
        gap: 2,
        linearType: "custom",
        lineCap:'square',
        radius:85,
        centerY:110
        // customColor:[ "#7366FF","#FFAA00",]
      },
    },
  };

  onMounted(() => {
    chartData.value = {
      series: [
        {
          name: "正确率",
          color: "#7366FF",
          data: 0.8,
        },
      ],
    };
  });

  return {
    opts,
    chartData,
  };
};

/**
 * 随机生成10条报警数据，数据格式为：
 * {
 *  name: '报警名称',
 *  value: '报警内容',
 *  time: '报警时间',
 *  status: '报警状态', // 0: 未处置，1: 维修中，2: 待接单
 * }
 */
const useAlarmData = () => {
  const alarmData = ref([]);

  // 报警状态颜色
  const alarmStatusColor = {
    'TRIGGER_NO_CONFIRM': '##FFAA0014',
      'TRIGGER_CONFIRM': '#FF666614',
      'RECOVER_NO_CONFIRM': '#7D72FA14',
      'RECOVER_CONFIRM': '#2bd68014' 
  };

  // 报警状态字体颜色
  const alarmStatusTextColor = {
      'TRIGGER_NO_CONFIRM': '#FFAA01',
      'TRIGGER_CONFIRM': 'rgb(43, 214, 128)',
      'RECOVER_NO_CONFIRM': '#7D72FA',
      'RECOVER_CONFIRM': '#FF6666'
  };

  // 报警状态文案
  const alarmStatusText = {
      'TRIGGER_NO_CONFIRM': '触发/未确认',
      'TRIGGER_CONFIRM': '触发/已确认',
      'RECOVER_NO_CONFIRM': '恢复/未确认',
      'RECOVER_CONFIRM': '恢复/已确认',
  };

  // 定义点击报警列表项的回调函数
  const handleAlarmItemClick = (item) => {
    console.log(item);
  };

  return {
    alarmStatusColor,
    alarmStatusTextColor,
    alarmStatusText,
    handleAlarmItemClick,
  };
};

export { useTodayAlarm, useAlarmData };
