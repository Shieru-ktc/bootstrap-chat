<template #default>
  <ChatMessagesWrapper>
    <ChatMessage
      v-for="(message, index) in messages"
      :key="index"
      :message="message.text"
      :type="message.type"
    />
  </ChatMessagesWrapper>
  <ChatInput />
</template>

<script setup lang="ts">
const { messages } = useChat();
</script>
