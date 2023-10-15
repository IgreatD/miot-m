<template>
  <view class="operations-order">
    <z-paging ref="paging" v-model:modelValue="orderList" @query="queryList">
      <template #top>
        <order-status :task-type-name="taskTypeName" @checkListByStatus=checkListByStatus />
        <view class="table-th table-td">
          <view class="table-tr-item item1">{{ tableHeader[0].name }}</view>
          <view class="table-tr-item item2">{{ tableHeader[1].name }}</view>
          <view class="table-tr-item item3">{{ tableHeader[2].name }}</view>
          <view class="table-tr-item item4">详情</view>
        </view>
      </template>
      <view v-for="item in orderList" :key="item.id">
        <view class="table-th u-border-bottom">
          <view class="table-tr-item u-line-1 item1">{{
            item[tableHeader[0].key]
          }}</view>
          <view class="table-tr-item u-line-1 item2">{{
            item[tableHeader[1].key]
          }}</view>
          <view class="table-tr-item item3">{{
            item[tableHeader[2].key]
          }}</view>
          <view class="table-tr-item item4" @click="handleItemClick(item)">
            <miot-icon name="gongdanxiangqing" :color="getColorByStatus(item.status.code)" size="44" />
          </view>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { taskTypes } from "../task";
import {requestParams} from './task'
import OrderStatus from "./components/order-status.vue";

const orderList = ref([]);

const props = defineProps({
  taskTypeName: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});

const paging = ref(null);

// 根据 taskTypeName 获取 table 列表头
const tableHeader = computed(() => {
  let header = [];
  switch (props.taskTypeName) {
    case taskTypes.daily.type:
      header = [
        {
          name: "任务名称",
          key: "name",
        },
        {
          name: "任务描述",
          key: "taskDesc",
        },
        {
          name: "发起人",
          key: "username",
        },
      ];
      break;
    case taskTypes.maintain.type:
      header = [
        {
          name: "设备名称",
          key: "deviceName",
        },
        {
          name: "例保内容",
          key: "content",
        },
        {
          name: "责任人",
          key: "dutyUserInfoStr",
        },
      ];
      break;
    case taskTypes.repair.type:
      header = [
        {
          name: "设备名称",
          key: "deviceName",
        },
        {
          name: "问题描述",
          key: "taskDesc",
        },
        {
          name: "报修人",
          key: "username",
        },
      ];
      break;
  }
  return header;
});
let currentActiveType ='';
function checkListByStatus(type){
  currentActiveType=type
  refresh()
}

// 通过状态获取图标颜色
const getColorByStatus = (status) => {
  let color = "";
  switch (status) {
    case "NO_CONFIRM":
      color = "#FFAA00";
      break;
    case "REPAIRING":
    case "OVERRULE":
      color = "#7366FF";
      break;
    case "REPAIR_COMPLETE":
      color = "#1AABFF";
      break;
    case "SCORE_COMPLETE":
      color = "#00CC88";
      break;
    default:
      color = "#999999";
      break;
  }
  return color;
};

// 处理图标点击事件
const handleItemClick = (item) => {
  console.log(item);
  uni.navigateTo({
    url: `/pages/tasks/task-detail/index?id=${item.id}&taskTypeName=${props.taskTypeName}`,
  });
};

const queryList = (pageNo, pageSize) => {

  uni.$service[taskTypes[props.taskTypeName].serviceName]
    .getWorkOrderList({
      pageNum: pageNo,
      pageSize: pageSize,
      size:pageSize,
     [requestParams[props.taskTypeName] ]:currentActiveType
    })
    .then((res) => {
      paging.value.complete(res.dataList);
    })
    .catch((err) => {
      console.log(err);
      paging.value.complete(false);
    });
};
// 定义 refresh
const refresh = () => {
  paging.value.refresh();
};

// 200ms后，设置标题
setTimeout(() => {
  uni.setNavigationBarTitle({
    title: props.title,
  });
}, 200);
</script>

<style lang="scss" scoped>
.operations-order {
  .table-th {
    display: flex;
    align-items: center;
    padding: 30rpx 32rpx;
    background-color: #fff;

    &.table-td {
      background: #f2f4f7;

      .table-tr-item {
        font-size: 24rpx;
        color: #666666;
      }
    }

    .table-tr-item {
      text-align: start;
      font-size: 28rpx;
      color: #333333;

      &.item1 {
        width: 150rpx;
      }

      &.item2 {
        flex: 1;
        padding: 0 16rpx;
      }

      &.item3 {
        width: 130rpx;
        text-align: center;
      }

      &.item4 {
        width: 100rpx;
        text-align: end;
      }
    }
  }
}
</style>
./task