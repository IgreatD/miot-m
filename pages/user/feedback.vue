<template>
  <view class="feedback-page">
    <!-- 渲染反馈数组 -->
    <view class="feedback-type">
      <view v-for="(item, index) in feedbackType" :key="index" class="feedback-type-item" :class="{
        'feedback-type-item-active': item.value === currentFeedbackType,
      }" @click="handleFeedbackTypeClick(item)">
        <view class="feedback-type-item-icon">
          <u-icon :name="item.icon" />
        </view>
        <view class="feedback-type-item-text">{{ item.text }}</view>
      </view>
    </view>
    <!-- 
        1. 联系方式：左边是文本，右边是输入框
        2. 我要反馈：上边是文本，下边是输入框
     -->
    <view class="feedback-contact">
      <view class="feedback-contact-item u-border-bottom">
        <view class="feedback-contact-item-title u-m-r-60">联系方式</view>
        <view class="feedback-contact-item-input">
          <u-input v-model="contact" placeholder="请输入手机号/QQ/微信" :maxlength="20" type="number" />
        </view>
      </view>
      <view class="feedback-contact-item flex-column">
        <view class="feedback-contact-item-title">我要反馈</view>
        <view class="feedback-contact-item-input u-m-t-24">
          <u-input v-model="feedback" :auto-height="false" placeholder="请输入反馈内容" :maxlength="-1" type="textarea"
            :custom-style="{
              height: '300rpx',
              background: '#F2F4F7',
              padding: '24rpx',
              borderRadius: '4rpx',
            }" />
        </view>
      </view>
      <miot-bottom-btn @click="handleSubmitFeedback">提交</miot-bottom-btn>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
// 定义反馈类型数组
const feedbackType = [
  {
    text: "页面闪退",
    value: 1,
    icon: "",
  },
  {
    text: "传输问题",
    value: 2,
    icon: "",
  },
  {
    text: "操作体验",
    value: 3,
    icon: "",
  },
  {
    text: "界面审美",
    value: 4,
    icon: "",
  },
  {
    text: "功能建议",
    value: 5,
    icon: "",
  },
  {
    text: "其他反馈",
    value: 6,
    icon: "",
  },
];

// 定义当前选中的反馈类型 ref
const currentFeedbackType = ref(1);

// 定义点击反馈类型的方法
const handleFeedbackTypeClick = (item) => {
  currentFeedbackType.value = item.value;
};

// 定义联系方式 ref
const contact = ref("");

// 定义反馈内容 ref
const feedback = ref("");

// 定义提交反馈的方法
const handleSubmitFeedback = () => {
  // 1. 校验联系方式和反馈内容
  if (!contact.value) {
    uni.showToast({
      title: "请输入联系方式",
      icon: "none",
    });
    return;
  }
  if (!feedback.value) {
    uni.showToast({
      title: "请输入反馈内容",
      icon: "none",
    });
    return;
  }
  // 2. 提交反馈
  uni.showToast({
    title: "提交成功",
    icon: "none",
  });
};
</script>

<style lang="scss" scoped>
// .feedback-page {
//   overflow: hidden;
// }
.feedback-type
{
  background: #ffffff;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 20rpx;
  column-gap: 20rpx;
  padding: 32rpx 40rpx;
  .feedback-type-item
  {
    // width: 30%;
    padding: 20rpx 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f2f4f7;
    color: #9ba2a8;
    border-radius: 8rpx;
    &-active
    {
      background: #009999;
      color: #ffffff;
    }
    .feedback-type-item-icon
    {
      width: 80rpx;
      height: 80rpx;
      margin-bottom: 12rpx;
    }
    .feedback-type-item-text
    {
      font-size: 24rpx;
    }
  }
}
.feedback-contact
{
  padding: 16rpx 0;
  .feedback-contact-item
  {
    padding: 28rpx 32rpx;
    background: #ffffff;
    padding-bottom: 30rpx;
    display: flex;
    align-items: center;

    &.flex-column
    {
      flex-direction: column;
      align-items: flex-start;
      padding-top: 30rpx;
    }
    .feedback-contact-item-title
    {
      font-size: 28rpx;
      flex-shrink: 0;
      color: #181818;
    }
    .feedback-contact-item-input
    {
      flex: 1;
      width: 100%;
    }
  }
}
</style>
