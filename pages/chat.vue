<template #default>
  <div
    class="d-flex flex-column flex-grow-1 overflow-auto p-3"
    style="max-height: calc(100vh - 80px)"
  >
    <ChatMessagesWrapper>
      <ChatMessage
        v-for="(message, index) in messages"
        :key="index"
        :message="message.text"
        :type="message.type"
      />
    </ChatMessagesWrapper>
  </div>

  <ChatInput />
</template>

<script setup lang="ts">
const { messages } = useChat();
</script>
