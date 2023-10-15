<template>
  <view class="u-flex-col item-wraper" @tap="cardTapAction">
    <view class="bg">
      <u-image class="bg-image" height="200" :src="bgSrc" mode="widthFix"></u-image>
      <view class="u-font-22 date">
        <view class="date-start">{{ startDate }}</view>
        <view class="u-flex" style="justify-content: center; margin-top: 2rpx; margin-bottom: 2rpx">
          <view class="date-line" :style="{ 'background-color': typeColor }">
          </view>
        </view>
        <view class="date-end">{{ endDate }}</view>
      </view>
    </view>
    <view class="u-flex-col info">
      <view class="u-line-2 top-name">{{ item.name }}</view>
      <view class="u-line-1 bottom-name">创建于{{ createDate }}</view>
    </view>
  </view>
</template>

<script>
import { reportType } from "../mixins/data";
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    reportType: {
      type: Symbol,
      default: reportType.custom,
    },
  },
  data() {
    return {};
  },
  computed: {
    bgSrc() {
      let tempSrc = "/static/imgs/report_custom.png";
      switch (this.item.reportType) {
        case reportType.week:
          tempSrc = "/static/imgs/report_week.png";
          break;
        case reportType.month:
          tempSrc = "/static/imgs/report_month.png";
          break;
        case reportType.custom:
          tempSrc = "/static/imgs/report_custom.png";
          break;
        default:
          break;
      }
      return tempSrc;
    },
    startDate() {
      return this.item.startDate.replace(/-/g, "/");
    },
    endDate() {
      return this.item.endDate.replace(/-/g, "/");
    },
    createDate() {
      return this.item.createDate.replace(/-/g, "/");
    },
    typeColor() {
      let temp = "#d8d8d8";
      switch (this.item.reportType) {
        case reportType.week:
          temp = "#008D9A";
          break;
        case reportType.month:
          temp = "#457AE6";
          break;
        case reportType.custom:
          temp = "#D97E21";
          break;

        default:
          break;
      }
      return temp;
    },
  },
  methods: {
    cardTapAction() {
      // openPage({
      //   url: statisReportDetailPage,
      //   params: {
      //     id: this.item.id,
      //     detailUrl: encodeURIComponent(JSON.stringify(this.item.redirectUrl)),
      //   },
      // });
      uni.$u.route({
        url: "/pages/data-application/device-report/components/report-detail",
        params: {
          id: "",
          detailUrl: encodeURIComponent(
            JSON.stringify("https://www.baidu.com")
          ),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.item-wraper
{
  .bg
  {
    position: relative;

    &-image
    {
      width: 100%;
    }
    .date
    {
      position: absolute;
      color: #333333;
      line-height: 28rpx;
      z-index: 10rpx;
      top: 16rpx;
      right: 24rpx;
      &-line
      {
        width: 24rpx;
        height: 2rpx;
      }
    }
  }
  .info
  {
    padding: 16rpx;
    background-color: #ffffff;
    .top-name
    {
      font-size: 24rpx;
      line-height: 32rpx;
      color: #333333;
    }

    .bottom-name
    {
      margin-top: 8rpx;
      font-size: 22rpx;
      line-height: 28rpx;
      color: #999999;
    }
  }
}
</style>
