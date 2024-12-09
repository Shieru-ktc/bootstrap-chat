<script setup lang="ts">
import { onMounted, ref } from "vue";

const isMenuVisible = ref(false);
const newMessage = ref("");
const messages = ref([{ text: "こんにちは!", type: "bot" }]);
let socket = null;

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const closeMenu = (event: MouseEvent) => {
  if ((event.target as HTMLElement).tagName === "LI") {
    isMenuVisible.value = false;
  }
};

const sendMessage = () => {
  const trimmedMessage = newMessage.value.trim();
  if (trimmedMessage) {
    messages.value.push({ text: trimmedMessage, type: "user" });
    newMessage.value = "";
  }
};

onMounted(() => {
  socket = new WebSocket("ws://localhost:8080/ws");
  socket.onmessage = (event) => {
    messages.value.push({ text: event.data, type: "bot" });
  };
});
</script>
<template>
  <div id="app">
    <header>
      <div class="menu" @click="toggleMenu">☰ ご案内</div>
      <div class="logo">アイコン</div>
      <ul v-show="isMenuVisible" class="menu-list" @click="closeMenu">
        <li>a-1</li>
        <li>a-2</li>
        <li>b-1</li>
        <li>設定</li>
      </ul>
    </header>
    <main>
      <div class="chat-container" ref="chatContainer">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['chat-bubble', message.type]"
        >
          {{ message.text }}
        </div>
      </div>
    </main>
    <footer>
      <input
        type="text"
        v-model="newMessage"
        placeholder="メッセージを入力..."
        @keydown.enter="sendMessage"
      />
      <button @click="sendMessage">送信</button>
    </footer>
  </div>
</template>

<style scoped>
body {
  margin: 0; /* 変更なし */
  font-family: Arial, sans-serif; /* 変更なし */
  display: flex; /* 変更なし */
  flex-direction: column; /* 変更なし */
  height: 100vh; /* 変更なし */
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #0055d4;
  color: #fffdfd;
  position: relative;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.menu {
  cursor: pointer;
  font-size: 18px;
}
.logo {
  font-size: 18px;
  font-weight: bold;
}
.menu-list {
  position: absolute;
  top: 50px;
  left: 10px;
  background-color: white;
  color: black;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  list-style: none;
  padding: 10px 0;
  margin: 0;
  border-radius: 5px;
  z-index: 1000;
}
.menu-list li {
  padding: 10px 20px;
  cursor: pointer;
}
.menu-list li:hover {
  background-color: #000000;
  color: white;
}
main {
  flex: 1; /* 変更なし */
  display: flex; /* 変更なし */
  flex-direction: column; /* 変更なし */
  overflow-y: auto; /* 変更なし */
  padding: 10px; /* 変更なし */
  background-color: #ffffff; /* 変更なし */
  flex-grow: 1;
}

.chat-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.chat-bubble {
  max-width: 60%;
  padding: 10px;
  border-radius: 10px;
  background-color: #0055d4;
  color: white;
  align-self: flex-start;
}
.chat-bubble.user {
  background-color: #ccc;
  color: black;
  align-self: flex-end;
}
footer {
  display: flex;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #ccc; /* 追加 */
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  margin-left: 10px;
  padding: 10px;
  background-color: #0055d4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
