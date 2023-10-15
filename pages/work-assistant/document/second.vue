<template>
  <view>
    <luyj-tree
      ref="tree"
      v-slot="{ item }"
      :trees="trees"
      :search-if="false"
      :props="params"
      :step-reload="true"
      @send-value="sendValue"
      @click-item="clickItem"
    >
      <view class="u-flex">
        <view v-if="item.type.code === 'DIRECTORY'">
          <miot-icon name="wenjianjia" size="38" color="#5487FF" />
        </view>
        <view v-if="item.type.code === 'FILE'">
          <miot-icon v-if="item.fileCategory === 'PDF'" name="pdf" size="38" color="#f78132" />
          <miot-icon v-if="item.fileCategory === 'EXCEL'" name="exel" size="38" color="#62c558" />
          <miot-icon v-if="item.fileCategory === 'WORD'" name="word" size="38" color="#5487ff" />
          <miot-icon v-if="item.fileCategory === 'OTHER'" name="a-1" size="38" color="#dbdbdb" />
          <miot-icon v-if="item.fileCategory === 'VIDEO'" name="mp4" size="38" color="#9053ff" />
          <miot-icon v-if="item.fileCategory === 'IMAGE'" name="png" size="38" color="#f7b51c" />
        </view>
        <view class="u-flex-1 file-name u-p-l-16">
          {{ item.name }}
        </view>
        <view v-if="item.type.code === 'FILE'">
          <miot-icon name="gengduo" size="34" color="#999999" />
        </view>
      </view>
    </luyj-tree>
  </view>
</template>

<script>
import { previewFile } from '@/utils/file';
export default {
  data() {
    return {
      trees: [],
      params: {
        children: 'children',
        id: 'id',
        label: 'name',
        multiple: false,
        nodes: true,
      },
      keyword: '',
      currentItem: {},
    };
  },
  computed: {
    parentId() {
      return this.currentItem.id || -1;
    },
  },
  onLoad(props) {
    setTimeout(() => {
      uni.setNavigationBarTitle({
        title: props.title,
      });
    }, 200);
    this.storageId = props.id;
    this.getList();
  },
  methods: {
    getList() {
      uni.$service.fileService
        .getFileDirectoryList({
          storageId: this.storageId,
          parentId: this.parentId,
          keyword: this.keyword,
        })
        .then((res) => {
          this.trees = res;
        });
    },
    sendValue(val) {
      // uni.$u.route({
      //   url: "/pages/data-application/documentation/second",
      //   params: {
      //     title: val.name,
      //     id: val.id,
      //   },
      // });
    },
    clickItem(item) {
      console.log(item);
      if (item.type.code === 'DIRECTORY') {
        return;
      }
      previewFile({
        url: item.viewUrl,
        title: item.name,
        type: item.fileCategory,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.file-name {
  font-size: 26rpx;
  color: #181818;
}
</style>
