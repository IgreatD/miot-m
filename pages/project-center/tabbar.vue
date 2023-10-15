<template>
  <message v-show="currentIndex == 0" />
  <dashboard v-show="currentIndex == 1" />
  <user v-show="currentIndex == 2" />
  <view style="height: 55px" />
  <u-tabbar
    v-model="currentIndex"
    active-color="#009999"
    inactive-color="#666666"
    :list="tabBarList"
    :hide-tab-bar="false"
    height="55px"
    @change="onTabbarChange"
  ></u-tabbar>
</template>

<script setup>
import message from '@/pages/message/index';
import dashboard from '@/pages/dashboard/index';
import user from '@/pages/user/user/index';
const tabBarList = [
  {
    iconPath: '/static/imgs/tabbar/tabbar_message.png',
    selectedIconPath: '/static/imgs/tabbar/tabbar_message_H.png',
    text: '消息',
  },
  {
    iconPath: '/static/imgs/tabbar/tabbar_dashboard.png',
    selectedIconPath: '/static/imgs/tabbar/tabbar_dashboard_H.png',
    text: '工作台',
  },
  {
    iconPath: '/static/imgs/tabbar/tabbar_user.png',
    selectedIconPath: '/static/imgs/tabbar/tabbar_user_H.png',
    text: '我的',
  },
];
const currentIndex = ref(0);
const onTabbarChange = (val) => {
  currentIndex.value = val;
  uni.setNavigationBarTitle({
    title: tabBarList[currentIndex.value].text,
  });
};

onTabbarChange(currentIndex.value);
</script>

<style lang="scss" scoped>
.tabbar {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
