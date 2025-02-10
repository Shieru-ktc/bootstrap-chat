<template #default>
  <div
    class="d-flex flex-column flex-grow-1 overflow-auto p-3"
    style="max-height: calc(100vh - 80px)"
  >
    <div ref="chatContainer" class="d-flex flex-column gap-3">
      <ChatMessage
        v-for="(message, index) in messages"
        :key="index"
        :message="message.text"
        :type="message.type"
      />
    </div>
  </div>

  <ChatInput @sendMessage="sendMessage" />
</template>

<script setup lang="ts">
const messages = ref<
  {
    text: string;
    type: "user" | "other";
  }[]
>([]);
const clientId = ref("");
const { data, send } = useWebSocket("wss://chat-backend.shieru-lab.com/ws");

watch(data, (newData) => {
  const data = JSON.parse(newData);
  if (data) {
    if (data["type"] == "CONNECT") {
      clientId.value = data["id"];
      messages.value.push({
        text: "接続が完了し、あなたのIDが割り振られました！",
        type: "other",
      });
    }
    if (data["type"] == "MESSAGE") {
      messages.value.push({
        text: data["content"],
        type: clientId.value === data["sender"] ? "user" : "other",
      });
    }
  }
});

const sendMessage = (message: string) => {
  const trimmedMessage = message.trim();
  if (trimmedMessage) {
    send(JSON.stringify({ type: "MESSAGE", content: trimmedMessage }));
  }
};
</script>
