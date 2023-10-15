<template>
  <view class="content-wraper">
    <web-view class="" :src="htmlContent" :update-title="false"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      htmlContent: "",
      id: "",
    };
  },
  onLoad(params) {
    this.id = params.id;
    this.htmlContent = decodeURIComponent(JSON.parse(params.detailUrl));
  },
  onReady() {
    // #ifdef APP-PLUS
    const currentWebviews = plus.webview.all(); //获取当前页面的webview对象
    setTimeout(() => {
      let reportWebview = null;
      for (let index = 0; index < currentWebviews.length; index++) {
        const webview = currentWebviews[index];
        const url = webview.getURL();
        console.log(url);
        if (url.startsWith("http")) {
          reportWebview = webview;
          // return;
        }
      }
      console.log(reportWebview);
      if (reportWebview) {
        reportWebview.overrideUrlLoading({}, (event) => {
          console.log(event);
          this.handlerUrl(event.url);
        });
      }
    }, 1000);
    // #endif
  },
  // onNavigationBarButtonTap(e) {
  //   this.$store.dispatch("share/getShareInfo", {
  //     objectType: "REPORT",
  //     objectId: this.id,
  //   });
  // },
  methods: {
    handlerUrl(url) {
      console.log(url);
    },
  },
};
</script>

<style lang="scss" scoped></style>
