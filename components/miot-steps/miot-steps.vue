<template>
  <view class="steps">
    <view v-for="(item, index) in steps" :key="index" class="step">
      <view class="step__head">
        <view class="step__icon" :class="{
          'step__icon--active': item.active,
        }">
          <miot-icon size="40" :name="item.icon" :color="item.iconColor || '#0099997f'" />
        </view>
        <view class="step__title">
          {{ item.title }}
        </view>
      </view>
      <view class="step__body">
        <!-- 根据类型添加 class -->
        <view v-for="(content, contentIndex) in item.contents" :key="contentIndex" class="step__content" :class="{
          'step__content--text': content.type === 'text',
          'step__content--image': content.type === 'image',
          'step__content--score': content.type === 'score',
          'step__content--attachment': content.type === 'attachment'
        }">
          <view class="step__content__label">
            {{ content.label }}
          </view>
          <view v-if="content.type === 'text'" style="flex:1">
            <view class="step__text">
              {{ content.text }}
              <miot-icon v-if="content.showDetail" style="margin: 0 20rpx 0 auto;" name="gengduo1"
                @click="showPersonDetail(content)"></miot-icon>
            </view>
          </view>
          <view v-if="content.type === 'image'">
            <view class="step__image">
              <miot-images :value="content.images" :readonly="content.readonly" />
            </view>
          </view>
          <view v-if="content.type === 'attachment'">
            <view class="step__attachment">
              <view v-for="(item, idx) in content.attachments" :key="idx" class="step__attachment-item">
                <text class="reuse-common-text">{{ item.name }}</text>
                <miot-icon name="chakan" size="32" color="#0F9982" @click="clickAttachment(item)"></miot-icon>
              </view>
            </view>
          </view>
          <view v-if="content.type === 'score'">
            <view class="step__score">
              <u-rate v-model:modelValue="content.value" :count="content.count" active-color="#FF9600"
                inactive-color="#BCC1CC" :size="32" :disabled="content.readonly"></u-rate>
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import { defineComponent } from "vue";
import { previewFile } from "@/utils/file";
export default defineComponent({
  name: "MiotSteps",
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
  },
  setup(props,ctx) {
    const emit=ctx.emit
    function showPersonDetail(content){
     
      if(content.multilPerson){
        emit('showPersonDetail',content.multilPerson)
      }
    }
    const clickAttachment=(file)=>{
    previewFile({
        url: file.viewUrl,
        title: file.name,
        type: file.fileCategory,
      });
    }
    return {
      showPersonDetail,
      clickAttachment
    }
  }
});
</script>

<style lang="scss" scoped>
.steps {
  .step {
    display: flex;
    flex-direction: column;

    // padding-bottom: 24rpx;
    // 非第一个元素，margin-top: 24rpx
    &:not(:first-child) {
      margin-top: 24rpx;
    }

    .step__head {
      display: flex;
      align-items: center;

      .step__icon {
        width: 40rpx;
        height: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999999;

        &--active {
          color: #009999;
        }
      }

      .step__title {
        font-size: 28rpx;
        color: #333333;
        margin-left: 24rpx;
      }
    }

    .step__body {
      position: relative;
      margin-top: 24rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-left: 68rpx;

      // 左边框
      &::before {
        content: "";
        position: absolute;
        left: 20rpx;
        top: 0;
        bottom: 0;
        width: 2rpx;
        background: #e6e6e6;
      }

      .step__content {
        width: 100%;
        display: flex;
        align-items: flex-start;

        // 非第一个元素，margin-top: 16rpx
        &:not(:first-child) {
          margin-top: 16rpx;
        }

        .step__content__label {
          font-size: 28rpx;
          color: #8c9399;
          width: 140rpx;
          flex-shrink: 0;
        }

        &--text {
          .step__text {
            font-size: 28rpx;
            color: #333333;
            word-break: break-all;
            display: flex;
          }
        }

        &--image {
          flex-direction: column;
          align-items: flex-start;

          .step__image {
            margin-top: 16rpx;
          }

        }

        &--score {
          flex-direction: column;
          align-items: flex-start;

          .step__score {
            margin-top: 16rpx;
            margin-left: -8rpx;
          }
        }

        &--attachment {
          flex-direction: column;
          align-items: flex-start;

          .step__attachment {
            margin-top: 16rpx;

            .step__attachment-item {
              width: 616rpx;
              height: 64rpx;
              background: #F7F8FA;
              border-radius: 8rpx;
              padding: 0 16rpx;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 4rpx;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
