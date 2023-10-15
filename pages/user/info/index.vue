<template>
  <view class="">
    <view v-for="(item, index) in cellGroup" :key="index">
      <view class="info-cells">
        <view
          v-for="(cell, cellIndex) in item"
          :key="cellIndex"
          class="info-cell u-border-bottom"
          @click="handleCellClick(cell)"
        >
          <text class="info-cell-title">{{ cell.title }}</text>
          <view class="info-cell-content">
            <miot-avatar v-if="cell.type === cellType.image" size="120" />
            <text
              v-if="cell.type === cellType.password || cell.type === cellType.text"
              :class="{
                'info-cell-password': cell.type === cellType.password,
              }"
            >
              {{ cell.content }}
            </text>
          </view>
          <view v-if="index !== 0" class="info-cell-arrow">
            <miot-icon name="youjiantou" color="#999999" size="30" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { watch, reactive } from 'vue';
import { useUserStore } from '@/store/modules/user';

const isFromHome = getApp().globalData.fromHome == '1';

// 通过 useUserStore 获取用户信息
const userStore = useUserStore();
// 获取用户信息
const userInfo = userStore.userInfo;

console.log(userInfo);

// 定义类型: text、image、password
const cellType = {
  text: 'text',
  image: 'image',
  password: 'password',
};

watch(
  () => userStore.userInfo,
  (newVal) => {
    console.log(newVal);
    // 修改cellGroup中的用户名
    cellGroup[1][0].content = newVal.account;
  },
);

const cellGroup = reactive([
  isFromHome
    ? [
        {
          title: '姓名',
          content: userInfo.name,
          type: cellType.text,
        },
      ]
    : [
        {
          title: '姓名',
          content: userInfo.name,
          type: cellType.text,
        },
        {
          title: '角色',
          content: userInfo.roleName,
          type: cellType.text,
        },

        {
          title: '岗位',
          content: userInfo.stationName,
          type: cellType.text,
        },
      ],
  [
    {
      title: '头像',
      content: userInfo.avatar,
      type: cellType.image,
      action: 'avatar',
    },
    {
      title: '电话',
      content: userInfo.mobile,
      type: cellType.text,
      action: 'phone',
    },
    {
      title: '用户名',
      content: userInfo.username,
      type: cellType.text,
      action: 'username',
    },
    {
      title: '密码',
      content: '********',
      type: cellType.password,
      action: 'password',
    },
  ],
]);

const handleCellClick = (cell) => {
  // 判断 action 不为空
  const { action } = cell;
  if (!action) {
    return;
  }

  if (action === 'username') {
    // 跳转到编辑页面
    uni.navigateTo({
      url: '/pages/user/info/edit',
    });
  } else if (action === 'avatar') {
    // 跳转到头像页面
    uni.navigateTo({
      url: '/pages/user/info/avatar',
    });
  } else if (action === 'phone') {
    // 跳转到头像页面
    uni.navigateTo({
      url: '/pages/user/info/phone',
    });
  } else if (action === cellType.password) {
    // 跳转到密码页面
    uni.navigateTo({
      url: '/pages/user/info/password',
    });
  }
};
</script>

<style lang="scss" scoped>
.info-cells {
  margin-top: 28rpx;
  background-color: #ffffff;
  .info-cell {
    padding: 28rpx 32rpx;
    display: flex;
    align-items: center;
    .info-cell-title {
      width: 140rpx;
      flex-shrink: 0;
      font-size: 28rpx;
      color: #181818;
    }
    .info-cell-content {
      flex: 1;
      font-size: 28rpx;
      color: #666666;
    }
    .info-cell-image {
      width: 120rpx;
      height: 120rpx;
      border-radius: 16rpx;
    }
    .info-cell-password {
      color: #999999;
      // 隐藏密码
      // -webkit-text-security: disc;
    }
    .info-cell-arrow {
      flex-shrink: 0;
    }
  }
}
</style>
