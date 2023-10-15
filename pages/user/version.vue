<template>
  <view class="version-page">
    <view class="version-wrapper">
      <miot-logo />
      <view class="u-p-t-40">
        <u-cell-group>
          <u-cell-item title="当前版本" :value="runtimeVersion" :arrow="false" />
          <u-cell-item title="最新版本" :value="latestVersion" :arrow="false" />
        </u-cell-group>
      </view>
    </view>
    <miot-bottom-btn>立即更新</miot-bottom-btn>
  </view>
</template>

<script setup>
import callCheckVersion from "@/utils/check_update/call_check_version";
import { ref } from "vue";
const runtimeVersion = ref("");
const latestVersion = ref("");
// #ifdef APP-PLUS
plus.runtime.getProperty(plus.runtime.appid, function (inf) {
  console.log(inf.version);
  runtimeVersion.value = inf.version;
});
// #endif
callCheckVersion().then((res) => {
  console.log(res);
  latestVersion.value = res;
});
</script>

<style lang="scss" scoped>
.version-page
{
  position: fixed;
  // #ifdef H5
  top: calc(var(--window-top));
  // #endif
  // #ifndef H5
  top: 0;
  // #endif
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  .version-wrapper
  {
    padding-top: 100rpx;
  }
}
</style>
