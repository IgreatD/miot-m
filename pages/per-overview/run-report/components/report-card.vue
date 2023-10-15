<template>
  <view class="card-wraper">
    <view class="u-flex-col list-containter">
      <u-grid class="card" :col="3" :border="false">
        <u-grid-item
          v-for="(item, index) in list"
          :key="index"
          :index="index"
          bg-color="#F2F4F7"
          :custom-style="{ margin: '24rpx 0rpx 0rpx', padding: '0rpx' }"
        >
          <item-card class="item" :item="item"></item-card>
        </u-grid-item>
      </u-grid>
    </view>
  </view>
</template>
  
  <script>
import itemCard from "./report-item-card.vue";
export default {
  components: { itemCard },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
  
  <style lang="scss" scoped>
.card-wraper {
  .list-containter {
    align-items: flex-start;
    padding-bottom: 24rpx;
    .item {
      width: 216rpx;
    }
  }
  .not-first-line-containter {
    margin-top: 17rpx;
  }
}
</style>