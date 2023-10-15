<template>
  <view class="project-head">
    <view class="left" @click="handleSelect">
      <text class="type">{{ sheetText }}</text>
      <uni-icons type="arrowdown" size="18" />
    </view>
    <view style="width: 500rpx">
      <uni-search-bar
        :radius="100"
        placeholder="搜索项目"
        bg-color="#ffffff"
        @confirm="confirm"
        @cancel="cancelSearch"
      />
    </view>
  </view>
</template>

<script setup>
import { isLogin } from '@/utils/auth';

const emit = defineEmits(['getProjects']);

const search = ref('');

const enterpriseList = ref([]);
const currentEnterprise = ref(null);

const sheetText = ref('显示全部');

watch(
  () => [currentEnterprise.value, search.value],
  ([currentEnterprise, search]) => {
    emit('getProjects', { id: currentEnterprise.id || 0, keyWord: search });
  },
);

const confirm = (val) => {
  search.value = val.value;
};

const cancelSearch = () => {
  search.value = '';
};

const handleSelect = () => {
  uni.showActionSheet({
    itemList: enterpriseList.value.map((item) => item.name),
    success: (res) => {
      currentEnterprise.value = enterpriseList.value[res.tapIndex];
      sheetText.value = currentEnterprise.value.name;
    },
  });
};

function getEnterprises() {
  uni.$service.enterpriseService.getAllEnterprise().then((res) => {
    if (res) {
      const result = res.filter((item) => item.state && !item.expire);
      enterpriseList.value = [{ id: '0', name: '显示全部', expire: false, state: true }].concat(
        result,
      );
      if (enterpriseList.value.length) {
        currentEnterprise.value = enterpriseList.value[0].id;
      }
    }
  });
}

onMounted(() => {
  if (isLogin()) {
    getEnterprises();
  }
});
</script>

<style lang="scss" scoped>
.project-head {
  // #ifndef APP-PLUS
  display: flex;
  // #endif
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 24rpx;
  .left {
    flex-direction: row;
    align-items: center;
  }
  .type {
    font-size: 28rpx;
    color: #333333;
    font-weight: 500;
  }
}
</style>
