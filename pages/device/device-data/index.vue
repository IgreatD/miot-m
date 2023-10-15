<template>
  <!-- <view class="content-wraper"> -->
  <u-mask :show="show" :custom-style="{ background: 'rgba(0,0,0,0.5)' }" @click="onMaskTap">
    <view class="u-flex mask-content">
      <view class="u-flex mask-content-tool" :style="{ bottom: `${keyboardHeight}rpx` }">
        <u-input v-model="searchText" class="search-text" type="text" placeholder="请输入"
          placeholder-style="color: #A4ACB3; font-size: 28rpx" :custom-style="{
            'margin-left': '32rpx',
            color: '#333333',
            'font-size': '28rpx',
          }" :focus="show" @confirm="getData" />
        <view class="line"></view>
        <view @tap.stop="scanAction">
          <miot-icon name="saoma" color="#009999" size="38"></miot-icon>
        </view>
      </view>
    </view>
  </u-mask>
  <!-- </view> -->
</template>

<script>
export default {
  props: {
    showMask: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["deviceDataClose"],
  data() {
    return {
      searchText: "1674594841293488128", // FIXME: 临时测试数据
      keyboardHeight: -0,
    };
  },
  computed: {
    show() {
      return this.showMask;
    },
  },
  mounted() {
    // #ifdef APP-PLUS
    // uni.onKeyboardHeightChange((res) => {
    //   console.log(res.height);
    //   // that.keyboardHeight = res.height;
    // });
    // #endif
  },
  unmounted() {
    // #ifdef APP-PLUS
    // uni.offKeyboardHeightChange(); // 需传入与监听时同一个的函数对象
    // #endif
  },
  methods: {
    scanAction() {
      //#ifdef APP-PLUS
      uni.scanCode({
        // onlyFromCamera: true,
        autoZoom: false,
        scanType: ["qrCode"],
        success: (res) => {
          console.log("扫码结果",res);
          this.searchText=res.result;
          this.onMaskTap();
          this.getData();
        },
      })
      //#endif
      //#ifdef H5
      this.onMaskTap();
      this.getData();
      //#endif
   
    },
    detailAction() {
      uni.$u.route({
        url: "/pages/tasks/task-attributes/index",
        params: {
          taskTypeName: "repair",
          title: "设备数据详情",
          deviceId: this.searchText,
          fromHome: 1,
          index:0
        },
      });
    },
    onMaskTap() {
      this.$emit("deviceDataClose", false);
    },
    getData() {
      // 验证 searchText
      if (this.searchText) {
        this.detailAction();
        this.onMaskTap();
      } else {
        uni.showToast({
          title: "请输入设备编号",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mask-content {
  height: 100%;
  justify-content: center;
  position: relative;

  &-tool {
    position: absolute;
    left: 0rpx;
    right: 0rpx;
    bottom: 0rpx;
    padding: 24rpx 40rpx;
    background-color: #ffffff;

    .search-text {
      border-radius: 40rpx;
      border: 2rpx solid #dddddd;
      background-color: #f2f4f7;
    }

    .line {
      margin: 0rpx 40rpx;
      width: 2rpx;
      height: 72rpx;
      background: #e6e6e6;
      border-radius: 2rpx;
    }
  }
}
</style>
