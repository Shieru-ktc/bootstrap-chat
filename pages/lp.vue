<template>
  <!-- ホームページメインコンテンツ -->
  <div
    class="d-flex flex-column flex-grow-1 align-items-center justify-content-center text-center p-4"
  >
    <h1 class="mb-4">Nuxt チャットツールへようこそ</h1>
    <p class="lead mb-4">
      このページは、チャットツールアプリケーションにアクセスするための入口です。
    </p>

    <!-- アプリへのリンクボタン -->
    <a class="btn btn-primary btn-lg mt-3" v-bind:href="url">{{ name }}</a>

    <h2>愉快な開発者たち</h2>
    <img src="/yukai.jpg" class="img-fluid w-25 h-25" />
  </div>

  <!-- フッター -->
  <footer class="bg-dark text-white text-center p-3">
    <p>© 2025 Nuxt チャットツール</p>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";

// リンク先URLを設定（例: チャットアプリページ）
const url = ref("/");

// ボタンのテキストを設定
const name = ref("チャットツールを開始する");
</script>
