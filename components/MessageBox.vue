<template>
  <div class="message-box">
    <slot />
  </div>
</template>

<script>
export default {
  name: "MessageBox",
};
</script>

<style scoped>
.message-box {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
