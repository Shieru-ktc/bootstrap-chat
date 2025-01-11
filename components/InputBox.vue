<template>
  <div class="input-box">
    <input type="text" placeholder="メッセージを入力してください" />
    <button>送信</button>
  </div>
</template>

<script>
export default {
  name: "InputBox",
};
</script>

<style scoped>
.input-box {
  display: flex;
  gap: 10px;
}
</style>
