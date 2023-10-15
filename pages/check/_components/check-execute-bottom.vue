<template>
  <u-popup v-model:model-value="showPopup" mode="bottom" @close="handlePopupClose">
    <view class="option-item u-border-bottom" @click="handleClick(true)">
      <miot-icon
        :name="isRun ? 'danxuankuang' : 'danxuankuangweixuan'"
        size="36"
        :color="isRun ? '#009999' : '#8C9399'"
      />
      <text class="text">运行</text>
    </view>
    <view class="option-item u-border-bottom" @click="handleClick(false)">
      <miot-icon
        :name="isRun ? 'danxuankuangweixuan' : 'danxuankuang'"
        size="36"
        :color="isRun ? '#8C9399' : '#009999'"
      />
      <text class="text">停止</text>
    </view>
    <view class="u-m-24">
      <miot-button block height="72" @click="handlePopupConfirm">确定</miot-button>
    </view>
  </u-popup>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:value', 'onConfirm']);

watch(
  () => props.value,
  (val) => {
    showPopup.value = val;
  },
);

const showPopup = ref(props.value);

// 是否运行
const isRun = ref(true);

const handleClick = (val) => {
  isRun.value = val;
};

const handlePopupClose = () => {
  showPopup.value = false;
  emit('update:value', false);
};

const handlePopupConfirm = () => {
  showPopup.value = false;
  emit('update:value', false);
  emit('onConfirm', isRun.value);
};

onMounted(() => {
  console.log('onMounted');
});
</script>

<style lang="scss" scoped>
.option-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 96rpx;
  .text {
    font-size: 28rpx;
    font-weight: 400;
    color: #333333;
    line-height: 36rpx;
    margin-left: 24rpx;
  }
}
</style>
