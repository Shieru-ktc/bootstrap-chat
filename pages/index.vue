<template>
  <div id="app" class="d-flex flex-column vh-100">
    <Navbar expand="lg" background-color="primary" theme="dark">
      <Container type="fluid">
        <NavbarBrand>Nuxt チャットツール</NavbarBrand>
      </Container>
    </Navbar>

    <!-- メッセージ表示エリア -->
    <div
      class="d-flex flex-column flex-grow-1 overflow-auto p-3"
      style="max-height: calc(100vh - 80px)"
    >
      <div ref="chatContainer" class="d-flex flex-column gap-3">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'chat-bubble',
            message.type === 'user'
              ? 'align-self-end bg-success text-white rounded p-2'
              : 'align-self-start bg-light text-dark rounded p-2',
          ]"
        >
          {{ message.text }}
        </div>
      </div>
    </div>

    <!-- メッセージ入力欄 -->
    <div class="d-flex p-3">
      <BFormInput
        class="flex-grow-1"
        type="text"
        v-model="newMessage"
        placeholder="メッセージを入力..."
        @keydown.enter="sendMessage"
      />
      <b-button @click="sendMessage" color="white">✈️</b-button>
    </div>
  </div>
</template>

<script setup lang="ts">
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
    newMessage.value = "";
  }
};
</script>
