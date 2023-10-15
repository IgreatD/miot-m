<template>
  <view class="u-flex-col content-wraper">
    <view class="u-flex-col center">
      <view v-for="(item, index) in list" :key="index">
        <card :item="item" @card-tap-action="cardTapAction"></card>
      </view>
      <view class="u-flex time" v-if="showCalendarText">
        <view class="u-flex-col time-start" :class="{ 'is-active-start': currentDateClickType == startType }"
          @tap="clickDateAction(startType)">
          <view class="u-flex time-start-key">开始时间</view>
          <view class="u-flex time-start-value">{{ startDate }}</view>
        </view>
        <view class="u-flex time-line"></view>
        <view class="u-flex-col time-end" :class="{ 'is-active-end': currentDateClickType == endType }"
          @tap="clickDateAction(endType)">
          <view class="u-flex time-end-key">结束时间</view>
          <view class="u-flex time-end-value">{{ endDate }}</view>
        </view>
      </view>
    </view>
    <u-calendar v-model="showCalendar" mode="date" safe-area-inset-bottom :min-date="minDate" :max-date="maxDate"
      active-bg-color="#009999" @change="changeDate"></u-calendar>
    <miot-bottom-btn @click="confirmAction">确定</miot-bottom-btn>
  </view>
</template>

<script>
import Card from "./components/card.vue";
export const dateClickType = {
  none: "none",
  start: "start",
  end: "end",
};

export default {
  components: { Card },
  data() {
    return {
      list: [
        { name: "在岗", selected: true },
        { name: "不在岗", selected: false },
      ],
      date: {
        start: "",
        end: "",
      },
      currentDateClickType: dateClickType.none,
      showCalendar: false,
      showCalendarText:false,
      minDate: this.$u.timeFormat(Date.now(), "yyyy-mm-dd"),
      maxDate: "2100-01-01",
    };
  },
  computed: {
    startDate() {
      return this.date.start || this.$u.timeFormat(Date.now(), "yyyy-mm-dd");
    },
    endDate() {
      return this.date.end || this.$u.timeFormat(Date.now(), "yyyy-mm-dd");
    },
    startType() {
      return dateClickType.start;
    },
    endType() {
      return dateClickType.end;
    },
  },
  methods: {
    cardTapAction(e) {
      this.showCalendarText=e.name=='不在岗'
      this.list.forEach((element) => {
        element.selected = element.name == e.name;
      });
    },
    clickDateAction(type) {
      if (type == this.startType) {
        this.currentDateClickType = dateClickType.start;
      } else if (type == this.endType) {
        this.currentDateClickType = dateClickType.end;
      } else {
        this.currentDateClickType = dateClickType.none;
      }
      this.showCalendar = true;
    },
    changeDate(e) {
      if (this.currentDateClickType == this.startType) {
        this.date.start = e.result;
      } else if (this.currentDateClickType == this.endType) {
        this.date.end = e.result;
      } else {
        //
      }
      // 该语句控制日期选择成功后，是否取消开始日期或结束日期的选中状态，注释时为不取消，反之为取消（用户可以以此来判断刚才切换的是开始时间，还是结束时间）
      // this.currentDateClickType = dateClickType.none;
    },
    // 检查开始时间和结束时间是否符合要求
    testTime() {
      this.date.start = this.startDate;
      this.date.end = this.endDate;
      let now = this.$u.timeFormat(Date.now(), "yyyy-mm-dd");
      let nowTime = new Date(now.replace(/-/g, "/"));
      let startTime = new Date(this.date.start.replace(/-/g, "/"));
      let endTime = new Date(this.date.end.replace(/-/g, "/"));
      console.log("now:", nowTime, "startTime:", startTime);
      if (this.date.start != "") {
        if (startTime.getTime() < nowTime.getTime()) {
          uni.showToast({
            title: "开始时间不能小于当前时间",
            icon: "none",
          });
          return false;
        }
        if (this.date.end != "") {
          if (endTime.getTime() < startTime.getTime()) {
            uni.showToast({
              title: "结束时间不能小于开始时间",
              icon: "none",
            });
            return false;
          }
        }
      } else {
        if (this.date.end != "") {
          if (endTime.getTime() <= nowTime.getTime()) {
            uni.showToast({
              title: "结束时间不能小于开始时间",
              icon: "none",
            });
            return false;
          }
        }
      }
      return true;
    },
    confirmAction() {
      if (this.testTime()) {
        // backPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content-wraper
{
  height: 100%;
  overflow: hidden;
  .center
  {
    flex: 1;
    overflow-y: scroll;
    .time
    {
      padding: 24rpx 0rpx;
      justify-content: center;
      background-color: #ffffff;
      &-start,
      &-end
      {
        flex: 1;
        justify-content: center;
        align-items: center;
        &-key
        {
          color: #999999;
          font-size: 24rpx;
          line-height: 32rpx;
        }
        &-value
        {
          margin-top: 4rpx;
          color: #999999;
          font-size: 28rpx;
          line-height: 36rpx;
        }
      }
      .is-active-start
      {
        .time-start-key,
        .time-start-value
        {
          color: $u-type-primary;
        }
      }
      .is-active-end
      {
        .time-end-key,
        .time-end-value
        {
          color: #009999;
        }
      }
      &-line
      {
        flex-shrink: 0;
        width: 40rpx;
        height: 4rpx;
        background-color: #d8d8d8;
      }
    }
  }
  .bottom
  {
    flex-shrink: 0;
    z-index: 99;
    padding: 24rpx 95rpx;
    background-color: #ffffff;
    .confirm
    {
      flex: 1;
      background: #009999;
      border-radius: 48rpx;

      color: #ffffff;
      line-height: 72rpx;
      justify-content: center;
    }
  }
}
</style>
