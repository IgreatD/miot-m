<template>
  <view class="u-p-t-16">
    <view v-for="(item, index) in files" :key="index" class="u-flex bg-white u-p-l-24 u-p-r-24" style="height: 88rpx"
      @click="handleItemClick(item)">
      <miot-icon :color="getFileIcon(item.fileCategory).color" :name="getFileIcon(item.fileCategory).icon" size="42" />
      <view class="u-flex-1 u-line-1 u-p-l-8 u-p-r-8">
        {{ item.name }}
      </view>
      <miot-icon name="youjiantou" size="34" color="#999999" />
    </view>
  </view>
</template>

<script>
import { getFileIcon } from "@/utils/file";
import { defineComponent, onMounted, ref } from "vue";
import { previewFile } from "@/utils/file";
export default defineComponent({
  name: "DeviceFiles",
  props: {
    bizId: {
      type: String,
      default: "",
    },
    deviceId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const files = ref([]);

    const getDeviceData = () => {
      uni.$service.deviceService.getDeviceFileData({deviceId:props.deviceId}).then((resp) => {
        files.value = resp;
      });
    };

    const handleItemClick = (item) => {
      previewFile({
        url: item.viewUrl,
        title: item.name,
        type: item.fileCategory,
      });
    };

    onMounted(() => {
      getDeviceData();
    });
    return { files, getFileIcon, handleItemClick };
  },
});
</script>

<style lang="scss" scoped></style>
