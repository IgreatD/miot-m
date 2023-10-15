<template>
  <view class="">
    <!-- 
        关于 u-cell-group 的使用
     -->
    <u-cell-group>
      <u-cell-item v-for="item in group" :key="item.label" :title="item.label" :value="item.value"
        :arrow="false"></u-cell-item>
    </u-cell-group>
  </view>
</template>

<script setup>
const group = [
  { label: "软件版权", value: "国机工业互联网研究院（河南）有限公司" },
  { label: "网址", value: "http://www.sippr.cn/" },
  { label: "联系方式", value: "0371-56161677" },
  { label: "邮箱", value: "gigyhlwyij@126.com" },
];
</script>

<style lang="scss" scoped></style>
