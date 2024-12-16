<template>
  <div id="app" style="height: 100vh; display: flex; flex-direction: column">
    <Navbar expand="lg" background-color="primary" theme="dark">
      <Container type="fluid">
        <NavbarBrand>Nuxt チャットツール</NavbarBrand>
      </Container>
    </Navbar>
    <b-div margin="x-2" flex flex-direction="column" style="flex-grow: 1">
      <b-div
        ref="chatContainer"
        flex
        gap="10"
        flex-direction="column"
        flex-grow="1"
        style="overflow-y: auto"
      >
        <b-div
          v-for="(message, index) in messages"
          :key="index"
          :class="['chat-bubble', message.type]"
          rounded
          margin="y-2"
          padding="2"
        >
          {{ message.text }}
        </b-div>
      </b-div>
      <b-div flex gap="2" relative-width="100" margin="2">
        <BFormInput
          flex
          type="text"
          v-model="newMessage"
          placeholder="メッセージを入力..."
          @keydown.enter="sendMessage"
        />
        <b-button @click="sendMessage" color="white">✈️</b-button>
      </b-div>
    </b-div>
  </div>
</template>

<script setup lang="ts">
// Reactive properties
const newMessage = ref("");
const messages = ref([{ text: "こんにちは！そしてさようなら。", type: "bot" }]);
const chatContainer = ref<HTMLDivElement | null>(null);

// メッセージ送信機能
const sendMessage = () => {
  const trimmedMessage = newMessage.value.trim();
  if (trimmedMessage) {
    messages.value.push({ text: trimmedMessage, type: "user" });
    newMessage.value = ""; // 入力欄をクリア

    // 自動スクロール
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    });
  }
};
</script>

<style scoped>
.chat-bubble.user {
  background-color: #ccc;
  color: black;
  align-self: flex-end;
}
.chat-bubble.bot {
  background-color: #007bff;
  color: white;
  align-self: flex-start;
}
</style>
