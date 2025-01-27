<template>
  <div id="app" class="d-flex flex-column vh-100">
    <Navbar />

    <div
      class="d-flex flex-column flex-grow-1 overflow-auto p-3"
      style="max-height: calc(100vh - 80px)"
    >
      <div ref="chatContainer" class="d-flex flex-column gap-3">
        <Message
          v-for="(message, index) in messages"
          :key="index"
          :message="message"
        />
      </div>
    </div>

    <div class="d-flex p-3">
      <InputBox @sendMessage="sendMessage" v-model="newMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputBox from "@/components/InputBox.vue";
import Message from "@/components/Message.vue";
import Navbar from "@/components/Navbar.vue";
import { useWebSocket } from "@vueuse/core";
import { ref, watch } from "vue";

const newMessage = ref("");
const messages = ref<
  {
    text: string;
    type: "user" | "other";
  }[]
>([]);
const clientId = ref("");
const { data, send } = useWebSocket("ws://localhost:8080/ws");

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
    newMessage.value = "";
  }
};
</script>

<style scoped>
.chat-bubble.user {
  background-color: #ccc;
  color: black;
  align-self: flex-end;
}

.chat-bubble.other {
  background-color: #007bff;
  color: white;
  align-self: flex-start;
}
</style>
