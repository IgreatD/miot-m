<template>
  <view class="device-monitor">
    <view class="monitor-stati">
      <view class="monitor-stati-title" style="padding: 20rpx 8rpx 24rpx 8rpx;">监控统计</view>
      <view class="monitor-stati-divide-line"></view>
      <view class="monitor-stati-row">
        <view class="monitor-stati-item" style="margin-right: 16rpx;">
          <view class="monitor-stati-item-value">
            <text class="monitor-stati-item-value-number">{{ deviceStatic.totalAmount }} </text>
            <text class="monitor-stati-item-value-unit"> 个 </text>
          </view>
          <view class="monitor-stati-item-title"> 设备总数 </view>
        </view>
        <view class="monitor-stati-item">
          <view class="monitor-stati-item-value">
            <text class="monitor-stati-item-value-number">{{ pointStatic.totalAmount }}</text>
            <text class="monitor-stati-item-value-unit"> 个 </text>
          </view>
          <view class="monitor-stati-item-title"> 检测点总数 </view>
        </view>
      </view>

      <view class="today-alarm-chart">
        <view class="monitor-stati-title" style="position: absolute;top:40rpx;left:8rpx">今日告警</view>
        <qiun-data-charts v-if="todayStatic.alarmAmount" :chart-data="todayAlarmChartData" :opts="todayAlarmOpts"
          type="arcbar" />
      </view>
      <view class="monitor-stati-row">
        <view class="monitor-stati-item" style="margin-right: 16rpx;background: rgba(255, 170, 0, 0.08);">
          <view class="monitor-stati-item-value">
            <text class="monitor-stati-item-value-number" style="color:#FF851A">{{ todayStatic.alarmAmount }} </text>
            <text class="monitor-stati-item-value-unit"> 个 </text>
          </view>
          <view class="monitor-stati-item-title"> 报警数量 </view>
        </view>
        <view class="monitor-stati-item">
          <view class="monitor-stati-item-value">
            <text class="monitor-stati-item-value-number">{{ todayStatic.repairAmount }}</text>
            <text class="monitor-stati-item-value-unit"> 个 </text>
          </view>
          <view class="monitor-stati-item-title"> 提报数量 </view>
        </view>
      </view>
    </view>
    <view class="monitor-list">
      <view v-for="(item, index) in alarmData" :key="item.id" class="alarm-list-item u-border-bottom"
        @click="handleAlarmItemClick(item)">
        <view class="alarm-list-item-title">
          <text class="reuse-emphasize-title">{{ item.deviceName }}</text>
          <view class="alarm-list-item-title-status" :style="{
            backgroundColor: alarmStatusColor[item.statusCode],
            color: alarmStatusTextColor[item.statusCode],
            borderColor: alarmStatusTextColor[item.statusCode],
          }">
            {{ alarmStatusText[item.statusCode] }}
          </view>
        </view>
        <view class="alarm-list-item-content">
          <text class="u-line-1">
            {{ item.eventDesc }}
          </text>
          <text class="alarm-list-item-content-time">
            {{ item.eventTime }}
          </text>
        </view>
      </view>
      <u-loadmore :status="status" @loadmore="onReachBottom" />
    </view>
  </view>
</template>

<script  setup>
import { useTodayAlarm, useAlarmData } from "./today-alarm";
const deviceStatic=ref({})
const pointStatic=ref({})
const todayStatic=ref({})
const alarmData=ref([])
const status=ref('loadmore')
const page=ref(1)
const { chartData: todayAlarmChartData, opts: todayAlarmOpts } =
  useTodayAlarm();
const {
  alarmStatusColor,
  alarmStatusText,
  alarmStatusTextColor,
  handleAlarmItemClick,
} = useAlarmData();

function onReachBottom(){
  status.value = 'loading';
  getAlarmList(++page.value)
}

function queryMonitoringStatistics(){
   uni.$service.deviceService.queryMonitoringStatistics().then((res)=>{
    if(res){
      deviceStatic.value=res
    }
   })
}
function queryMonitoringPointStatistics(){
  uni.$service.deviceService.queryMonitoringPointStatistics().then((res)=>{
    if(res){
      pointStatic.value=res
    }
   })
}
function queryTodayMonitoringStatistics(){
   uni.$service.deviceService.queryTodayMonitoringStatistics().then((res)=>{
    if(res){
        todayStatic.value=res
        todayAlarmOpts.title.name=res.repairRate*100+'%'
        todayAlarmChartData.value.series[0].data=res.repairRate*1
    }
   })
}
function getAlarmList(currentPage=1){
  page.value=currentPage
  const query={
    pageNo:page.value,
    pageSize:15,
    endDate:null,
    startDate:null,
    keyword:'',
    isRecord:false,
    status:''
  }
  uni.$service.deviceService.queryTask(query).then((res)=>{
    if(res){
      alarmData.value=alarmData.value.concat(res.pageData.data)
      if(status.value === 'loading'){
        status.value ='loadmore'
      }
      if(res.pageData.total/query.pageSize<page.value){
        status.value ='nomore'
      }
    }
   })
}
queryMonitoringStatistics()
queryMonitoringPointStatistics()
queryTodayMonitoringStatistics()
getAlarmList()
</script>

<style scoped lang='scss'>
.device-monitor
{
  padding: 16rpx;
  position: relative;
  .monitor-stati
  {
    width: 718rpx;
    height: 699rpx;
    background: #FFFFFF;
    border-radius: 12rpx;
    margin-bottom: 16rpx;
    padding: 0 16rpx;
    .monitor-stati-title
    {
      font-size: 28rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 36rpx;
    }
    .monitor-stati-divide-line
    {
      background: #FFFFFF;
      box-shadow: 0px 1px 0px 0px #E6E6E6;
      height: 1rpx;
      margin: -1rpx 8rpx 40rpx 8rpx;
    }

    .monitor-stati-row
    {
      display: flex;
    }

    .monitor-stati-item
    {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 335rpx;
      height: 112rpx;
      background: #F5F7FA;
      border-radius: 8rpx;
      .monitor-stati-item-value
      {
        margin-bottom: 8rpx;
      }
      .monitor-stati-item-value-number
      {
        font-size: 40rpx;
        font-weight: 600;
        color: #4D87FF;
        line-height: 40rpx;
      }
    }

    .today-alarm-chart
    {
      width: 100%;
      height: 315rpx;
      position: relative;
    }
  }

  .monitor-list
  {
    height: 100%;
    background: #FFFFFF;
    border-radius: 12rpx;
    .alarm-list-item
    {
      height: 128rpx;
      padding: 24rpx;
      .alarm-list-item-title
      {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14rpx;
        .alarm-list-item-title-status
        {
          height: 36rpx;
          border: 1px solid transparent;
          line-height: 32rpx;
          font-size: 24rpx;
          padding: 0 8rpx;
          border-radius: 4px;
        }
      }

      .alarm-list-item-content
      {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>