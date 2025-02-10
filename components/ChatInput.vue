<template>
  <div class="d-flex p-3">
    <BFormInput
      class="flex-grow"
      type="text"
      v-model="inputMessage"
      placeholder="メッセージを入力..."
      @keydown.enter="handleSendMessage"
    />
    <b-button @click="handleSendMessage" color="white">✈️</b-button>
  </div>
</template>

<script setup lang="ts">
const { sendMessage } = useChat();
const inputMessage = ref("");

const handleSendMessage = () => {
  sendMessage(inputMessage.value);
  inputMessage.value = "";
};
</script>
