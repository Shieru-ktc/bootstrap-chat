<template>
  <b-div id="app" flex flex-direction="column" viewport-height>
    <Navbar expand="lg" background-color="primary" theme="dark">
      <Container type="fluid">
        <NavbarBrand>Nuxt チャットツール</NavbarBrand>
      </Container>
    </Navbar>
    <b-div margin="x-2" flex flex-direction="column" flex-grow="1">
      <MessageBox>
        <Message
          v-for="(message, index) in messages"
          :key="index"
          :text="message.text"
          :type="message.type"
        />
      </MessageBox>

      <b-div flex gap="2" relative-width="100" margin="2">
        <InputBox @sendMessage="sendMessage" v-model="newMessage" />
      </b-div>
    </b-div>
  </b-div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import MessageBox from "@/components/MessageBox.vue";
import Message from "@/components/Message.vue";
import InputBox from "@/components/InputBox.vue";
import { useWebSocket } from "@vueuse/core";

// Reactive properties
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

const sendMessage = () => {
  const trimmedMessage = newMessage.value.trim();
  if (trimmedMessage) {
    send(JSON.stringify({ type: "MESSAGE", content: trimmedMessage }));
    newMessage.value = ""; // 入力欄をクリア
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
