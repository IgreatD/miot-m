<template>
  <view class="content-wraper">
    <view v-for="(item, index) in list" :key="index" class="item">
      <card :item="item" @tap="cardTapAction(item)"></card>
    </view>
  </view>
</template>

<script>
import Card from "./components/card.vue";
export default {
  components: { Card },
  data() {
    return {
      list: [],
    };
  },
  onLoad() {
    this.getFileStorageList();
  },
  methods: {
    getFileStorageList() {
      this.list=[
    {
        "id": "1631588246234333184",
        "name": "a3",
        "fileNum": "1244",
        "createUsername": "李随机",
        "createTime": "2023-03-03 17:32:06"
    },
    {
        "id": "1631588158602739712",
        "name": "a2",
        "fileNum": "1244",
        "createUsername": "李随机",
        "createTime": "2023-03-03 17:31:45"
    },
    {
        "id": "1631587842012479488",
        "name": "a",
        "fileNum": "1244",
        "createUsername": "李随机",
        "createTime": "2023-03-03 17:30:30"
    },
    {
        "id": "1631585215606423552",
        "name": "123",
        "fileNum": "1244",
        "createUsername": "李随机",
        "createTime": "2023-03-03 17:20:03"
    },
    {
        "id": "1631584285867638784",
        "name": "12",
        "fileNum": "1244",
        "createUsername": "李随机",
        "createTime": "2023-03-03 17:16:22"
    }
]
      // uni.$service.fileService.getFileStorageList().then((res) => {
      //   this.list = res;
      // });
    },
    cardTapAction(val) {
      uni.$u.route({
        url: "/pages/work-assistant/document/second",
        params: {
          title: val.name,
          id: val.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content-wraper
{
  padding: 0rpx 32rpx 16rpx;
  // height: 100%;
  // overflow-y: scroll;
  .item
  {
    margin-top: 16rpx;
    height: 160rpx;
  }
}
</style>
