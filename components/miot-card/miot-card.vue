<template>
  <view>
    <view v-if="subtitle.length > 0" class="card-subtitle">
      {{ showSubTitle ? subtitle : '' }}
    </view>
    <view class="card-wrapper">
      <slot name="header">
        <view class="card-header u-border-bottom">
          <view class="card-header-left">
            <view class="card-header-title">{{ title }}</view>
          </view>
          <slot name="header-right"></slot>
        </view>
      </slot>
      <slot name="body">
        <view v-if="content.length > 0" class="card-body">
          <!-- 渲染 content -->
          <view v-for="(item, index) in content" :key="index" class="card-body-item">
            <view class="card-body-item__label">
              {{ item.label }}
            </view>
            <view class="card-body-item__value">
              {{ item.value }}
            </view>
          </view>
          <slot name="body-bottom"></slot>
        </view>
      </slot>
      <!-- 
        判断 slot footer 是否有内容，如果有内容，则渲染 footer
       -->
      <view v-if="$slots.footer" class="card-footer u-border-top" :class="footerClass">
        <slot name="footer"> </slot>
      </view>
    </view>
  </view>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MiotCard',
  props: {
    showSubTitle:{
      type: Boolean,
      default:true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: Array,
      default: () => [],
    },
    footerClass: {
      type: [String, Array],
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.card-subtitle {
  font-size: 24rpx;
  padding: 12rpx 0;
  font-weight: 400;
  color: #999;
  text-align: center;
}

.card-wrapper {
  background-color: #ffffff;
  border-radius: 8rpx;
  box-shadow: 0px 1px 0px 0px #e6e6e6;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24rpx;
  height: 72rpx;

  .card-header-title {
    font-size: 28rpx;
    color: #333333;
    font-weight: 500;
  }
}

.card-body {
  padding: 24rpx 28rpx;

  .card-body-item {
    display: flex;
    align-items: flex-start;
    padding: 12rpx 0;

    // 非最后一个元素，padding-bottom: 16rpx
    &:not(:last-child) {
      padding-bottom: 16rpx;
    }

    &__label {
      font-size: 28rpx;
      color: #8c9399;
      width: 160rpx;
      flex-shrink: 0;
    }

    &__value {
      font-size: 28rpx;
      color: #333333;
    }
  }
}

.card-footer {
  padding: 24rpx 28rpx;
}
</style>
