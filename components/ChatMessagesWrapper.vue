<template>
  <div class="d-flex flex-column gap-3 flex-grow-1 m-3">
    <ChatMessage
      v-for="(message, index) in messages"
      :key="index"
      :message="message.text"
      :type="message.type"
    />
  </div>
</template>

<script setup lang="ts">
const { messages } = useChat();
</script>
