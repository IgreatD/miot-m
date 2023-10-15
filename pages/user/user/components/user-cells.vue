<template>
  <view class="">
    <view v-for="item in cellGroup" :key="item" class="user-cells">
      <view
        v-for="(cell, cellIndex) in item"
        :key="cellIndex"
        class="user-cells-item"
        @click="handleCellClick(cell)"
      >
        <view class="user-cells-item-left">
          <miot-icon class="user-cells-item-left-icon" size="44" :name="cell.icon" />
        </view>
        <view
          class="user-cells-item-right"
          :class="{
            'u-border-top': cellIndex !== 0,
          }"
        >
          <text class="user-cells-item-right-text">{{ cell.text }}</text>
          <miot-icon v-if="cell.arrow" name="youjiantou" size="40" color="#999999" />
          <u-switch
            v-if="cell.switch"
            :model-value="cell.value"
            size="40"
            active-color="#009999"
            inactive-color="#CAD0DB"
          ></u-switch>
        </view>
      </view>
    </view>
    <u-modal
      v-model:modelValue="showModal"
      :show-cancel-button="true"
      content="切换内外网后，需要重新登录"
      @confirm="switchNetwork"
    />
  </view>
</template>

<script>
import { defineComponent, computed, ref, reactive } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { getConfig, ips, setConfig } from '@/config/config';
export default defineComponent({
  name: 'UserCells',
  props: {},
  setup() {
    const appConfig = getConfig();

    console.log(appConfig.baseUrl);

    const networkIsLocal = ref(appConfig.baseUrl === ips[1]);

    const showModal = ref(false);

    const cells1 = [
      {
        icon: 'yonghufankui',
        text: '用户反馈',
        arrow: true,
        action: 'feedback',
      },
      {
        icon: 'qingchuhuancun',
        text: '清除缓存',
        arrow: true,
      },
      {
        icon: 'guanyu',
        text: '关于',
        arrow: true,
        action: 'about',
      },
      {
        icon: 'banbenjiancha',
        text: '版本检查',
        arrow: true,
        action: 'versionCheck',
      },
    ];

    const cells2 = reactive([
      {
        icon: 'saomaanzhuang',
        text: '扫我安装',
        arrow: true,
        action: 'scanInstall',
      },
      {
        icon: 'neiwanghuanjing',
        text: '内网环境',
        switch: true,
        value: networkIsLocal,
        action: 'switchNetwork',
      },
    ]);

    const cellGroup = computed(() => {
      return [cells1, cells2];
    });

    // cell click
    const handleCellClick = (cell) => {
      console.log('handleCellClick', cell);
      // 判断 action
      if (cell.action) {
        switch (cell.action) {
          case 'previewFile':
            // 导航到文件预览页面
            uni.navigateTo({
              url: '/pages/file-preview/index',
            });
            break;
          case 'feedback':
            uni.navigateTo({
              url: '/pages/user/feedback',
            });
            break;
          case 'about':
            uni.navigateTo({
              url: '/pages/user/about',
            });
            break;
          case 'scanInstall':
            uni.navigateTo({
              url: '/pages/user/scan-app',
            });
            break;
          case 'versionCheck':
            uni.navigateTo({
              url: '/pages/user/version',
            });
            break;
          case 'switchNetwork':
            showModal.value = true;
            break;
          default:
            break;
        }
      }
    };

    const switchNetwork = () => {
      appConfig.baseUrl = networkIsLocal.value ? ips[0] : ips[1];
      console.log('switchNetwork', appConfig.baseUrl);
      networkIsLocal.value = !networkIsLocal.value;
      setConfig(appConfig);
      useUserStore()
        .logout()
        .then(() => {
          // #ifdef APP-PLUS
          plus.runtime.restart();
          // #endif
        });
    };

    return {
      cells1,
      cells2,
      cellGroup,
      showModal,
      handleCellClick,
      switchNetwork,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-cells {
  background-color: #ffffff;
  padding: 0 28rpx;
  // 非第一个元素
  &:not(:first-child) {
    margin-top: 28rpx;
  }
  .user-cells-item {
    display: flex;
    align-items: center;
    .user-cells-item-left {
      flex-shrink: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .user-cells-item-left-icon {
        color: #00999999;
      }
    }
    .user-cells-item-right {
      padding: 30rpx 0;
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 28rpx;
      .user-cells-item-right-text {
        font-size: 28rpx;
        color: #333333;
      }
      .user-cells-item-right-arrow {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .user-cells-item-right-arrow-icon {
          width: 20rpx;
          height: 20rpx;
        }
      }
    }
  }
}
</style>
