<template>
  <view class="u-flex top-content-wraper">
    <view class="u-flex date" @tap="selectTimeAtion">
      <view v-show="showDate" class="u-flex-col u-font-22 date-text">
        <view class="date-text-top">{{ selectedDate.start }}</view>
        <view class="date-text-bottom">{{ selectedDate.end }}</view>
      </view>
      <miot-icon v-show="!showDate" name="rili" size="40" color="#ffffff"></miot-icon>
    </view>
    <view class="line"></view>
    <view class="u-flex u-flex-1 u-font-24 options">
      <view v-for="(item, index) in options" :key="index" class="u-flex u-flex-1 option"
        :class="{ 'selected-option': item.selected }" @tap="optionAction(item)">{{ item.name }}</view>
    </view>
    <date-picker v-model="showTimePicker" mode="time" title="选择时间区间" safe-area-inset-bottom
      :start-time="selectedDate.start || '开始时间'" :end-time="selectedDate.end || '结束时间'" @confirm="onPickerConfirm"
      @clear-action="clearSelectedDateAction"></date-picker>
  </view>
</template>
  
<script>
import datePicker from "./report-date-picker.vue";
export default {
  components: { datePicker },
  emits: ["typeChange", "dateChange"],
  data() {
    return {
      options: [
        {
          name: "全部",
          type: "0",
          selected: true,
        },
        {
          name: "周报",
          type: "1",
          selected: false,
        },
        {
          name: "月报",
          type: "2",
          selected: false,
        },
        {
          name: "自定义",
          type: "3",
          selected: false,
        },
      ],
      showDate: false,
      showTimePicker: false,
      selectedDate: {
        start: "",
        end: "",
      },
    };
  },
  methods: {
    selectTimeAtion() {
      this.showTimePicker = true;
    },
    optionAction(e) {
      this.options.forEach((val) => {
        if (val.name == e.name) {
          val.selected = true;
        } else {
          val.selected = false;
        }
      });
      this.$emit("typeChange", e.type);
    },
    onPickerConfirm(start, end) {
      if (this.testTime(start, end)) {
        this.selectedDate.start = start;
        this.selectedDate.end = end;
        this.$emit("dateChange", this.selectedDate);
        this.showDate = true;
      }
    },
    clearSelectedDateAction() {
      this.showDate = false;
      this.selectedDate.start = "";
      this.selectedDate.end = "";
      this.$emit("dateChange", this.selectedDate);
    },
    testTime(start, end) {
      let now = this.$u.timeFormat(Date.now(), "yyyy-mm-dd");
      let nowTime = new Date(now.replace(/\-/g, "/"));
      let startTime = new Date(start);
      let endTime = new Date(end);
      if (
        nowTime.getTime() < startTime.getTime() ||
        nowTime.getTime() < endTime.getTime()
      ) {
        uni.showToast({
          title: "当天之后日期不可选",
          icon: "none",
        });
        return;
      }
      if (endTime.getTime() < startTime.getTime()) {
        uni.showToast({
          title: "结束时间不能小于开始时间",
          icon: "none",
        });
        return false;
      }
      return true;
    },
  },
};
</script>
  
<style lang="scss" scoped>
.top-content-wraper
{
  height: 100%;
  .date
  {
    width: 146rpx;
    height: 100%;
    justify-content: center;
    &-text
    {
      color: #ffffff;
      line-height: 28rpx;
    }
  }
  .line
  {
    background-color: #ffffff;
    width: 2rpx;
    height: 48rpx;
    opacity: 0.3;
  }
  .options
  {
    height: 100%;
    padding: 12rpx 40rpx;
    justify-content: space-between;
    .option
    {
      color: #ffffff;
      justify-content: center;
      height: 48rpx;
    }
    .selected-option
    {
      color: #009999;
      background-color: #ffffff;
      border-radius: 24rpx;
      font-weight: 500;
    }
  }
}
</style>