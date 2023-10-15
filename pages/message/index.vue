<template>
  <view class="message-list">
    <message-item v-for="message in messageList" :key="message.id" :message="message" />
  </view>
</template>

<script setup>
import { ref } from 'vue';
import MessageItem from './components/message-item.vue';

const messageList = ref([]);

const getMessageList = () => {
  uni.$service.messageService
    .getMessageList()
    .then((res) => {
      messageList.value = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

getMessageList();
</script>

<style lang="scss" scoped></style>
