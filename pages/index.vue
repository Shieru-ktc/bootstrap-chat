<script setup lang="ts">

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
          <div v-for="(message, index) in messages" :key="index" :class="['chat-bubble', message.type]">
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
  
  <script>
  export default {
    data() {
      return {
        isMenuVisible: false,
        newMessage: "",
        messages: [
          { text: "こんにちは!", type: "bot" },
        ],
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuVisible = !this.isMenuVisible;
      },
      closeMenu(event) {
        if (event.target.tagName === "LI") {
          this.isMenuVisible = false;
        }
      },
      sendMessage() {
        const trimmedMessage = this.newMessage.trim();
        if (trimmedMessage) {
          this.messages.push({ text: trimmedMessage, type: "user" });
          this.newMessage = "";
          this.$nextTick(() => {
            const chatContainer = this.$refs.chatContainer;
            chatContainer.scrollTop = chatContainer.scrollHeight;
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    height: 100vh;
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
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: #ffffff;
    padding: 10px;
    overflow-y: auto;
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
  

