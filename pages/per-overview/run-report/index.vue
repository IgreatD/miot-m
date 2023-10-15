<template>
	<view class="u-flex-col content-wraper">
		<view class="u-flex-col top">
			<report-top @date-change="dateChange" @type-change="typeChange"></report-top>
		</view>
		<view class="u-flex-col list">
			<template v-if="showEmpty">
				<miot-empty></miot-empty>
			</template>
			<template v-else>
				<report-card :list="showList"></report-card>
			</template>
		</view>
	</view>
</template>

<script>
import reportTop from "./components/report-top.vue";
import reportCard from "./components/report-card.vue";
import dataMixin from "./mixins/data.js";
import { reportType } from "./mixins/data.js";
export default {
  components: { reportTop, reportCard },
  mixins: [dataMixin],
  data() {
    return {
      reportType: reportType.day,
      selectedDate: "",
    };
  },
  methods: {
    dateChange(e) {
      this.selectedDate = e;
      // this.getList();
    },
    typeChange(e) {
      this.currentReportType = e;
    },
  },
};
</script>

<style lang="scss" scoped>
.content-wraper
{
	height: 100%;
	overflow: hidden;
	.top
	{
		position: fixed;
		// #ifdef H5
		top: calc(var(--window-top));
		// #endif
		// #ifdef APP-PLUS
		top: 0;
		// #endif
		left: 0;
		right: 0;
		z-index: 100;
		width: 100vw;
		height: 72rpx;
		background-color: #00b3b3;
	}
	.list
	{
		margin-top: 72rpx;
		flex: 1;
		overflow-y: scroll;
		padding: 0rpx 8rpx;
	}
}
</style>
