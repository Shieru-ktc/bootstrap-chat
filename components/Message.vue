<template>
  <div :class="messageClass">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps({
  message: {
    type: String, 
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "user", 
  },
});

const messageClass = computed(() => {
  return props.type === "user"
    ? "bg-success text-white align-self-end"
    : "bg-light text-dark align-self-start";
});
</script>

<style scoped>
.message {
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
}

.bg-success {
  background-color: #28a745; 
}

.bg-light {
  background-color: #f8f9fa; 

.text-white {
  color: white;
}

.text-dark {
  color: black;
}

.align-self-end {
  align-self: flex-end; 
}

.align-self-start {
  align-self: flex-start; 
}
</style>
