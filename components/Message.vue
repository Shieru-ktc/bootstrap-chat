<template>
  <div :class="messageClass">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

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
    ? "bg-success text-white align-self-end rounded p-2"
    : "bg-secondary text-white align-self-start rounded p-2";
});
</script>
