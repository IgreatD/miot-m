<template>
  <!-- uni-app 图片选择组件 -->
  <view class="siiri-images">
    <view class="siiri-images__list">
      <view v-for="(item, index) in images" :key="index" class="siiri-images__item">
        <image
          class="siiri-images__item__img"
          :src="getFullUrl(item)"
          @click="previewImage(index)"
        />
        <view v-if="!readonly" class="siiri-images__item__close" @click="delImage(index)">
          <miot-icon name="x" size="24" />
        </view>
      </view>
      <view v-if="!readonly && images.length < max" class="siiri-images__item" @click="addImage">
        <view class="siiri-images__item__add">
          <view class="siiri-images__item__add_icon">
            <miot-icon name="a-" size="44" color="#009999FF" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { appConfig } from '@/config/config';
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => [],
    },
    max: {
      type: Number,
      default: 9,
    },
    cache: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const images = ref(props.value || []);

    function addImage() {
      uni.chooseImage({
        count: props.max - images.value.length,
        success: (res) => {
          if (props.cache) {
            // #ifdef APP-PLUS
            cacheFiles(res.tempFilePaths);
            // #endif
            // #ifdef H5
            uploadFiles(res.tempFilePaths);
            // #endif
          } else {
            uploadFiles(res.tempFilePaths);
          }
        },
      });
    }
    function delImage(index) {
      images.value.splice(index, 1);
    }

    // 批量上传图片
    const uploadFiles = (files) => {
      // 循环files，上传图片
      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        // 上传图片
        uni.$upload(element).then((res) => {
          // 上传成功后，将图片地址保存到images中
          images.value.push(res);
        });
      }
    };

    const cacheFiles = (files) => {
      // 循环files，上传图片
      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        uni.saveFile({
          tempFilePath: element,
          success: (save) => {
            let fileSaveUrl = plus.io.convertLocalFileSystemURL(save.savedFilePath);
            images.value.push({
              url: 'file://' + fileSaveUrl,
              cache: true,
            });
          },
        });
      }
    };

    // 获取图片全路径
    const getFullUrl = (item) => {
      if (item.cache) {
        return item.url;
      }
      return appConfig.fileUrl + item.url;
    };

    // 监听 images 变化
    watch(
      () => images.value,
      (val) => {
        // 触发 update:value 事件
        emit('update:value', val);
      },
    );

    // 监听 value 变化
    watch(
      () => props.value,
      (val) => {
        images.value = val;
      },
      {
        immediate: true,
      },
    );

    // 预览图片
    const previewImage = (index) => {
      uni.previewImage({
        current: index,
        urls: images.value.map((item) => getFullUrl(item)),
      });
    };

    return {
      images,
      addImage,
      delImage,
      getFullUrl,
      previewImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.siiri-images {
  .siiri-images__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16rpx;

    .siiri-images__item {
      position: relative;
      width: 140rpx;
      height: 140rpx;
      border-radius: 8rpx;
    }
  }

  position: relative;

  .siiri-images__item__img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 8rpx;
  }

  .siiri-images__item__close {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -10rpx;
    right: -10rpx;
    width: 32rpx;
    height: 32rpx;
    color: #ffffff;
    font-weight: bold;
    background: #dd524d;
    z-index: 10;
    border-radius: 100%;
  }

  .siiri-images__item__add {
    width: 100%;
    height: 100%;
    background: #f2f4f7;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dcdfe6;
    border-radius: 8rpx;
    .siiri-images__item__add_icon {
      width: 48rpx;
      height: 48rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border-radius: 50%;
    }
  }
}
</style>
