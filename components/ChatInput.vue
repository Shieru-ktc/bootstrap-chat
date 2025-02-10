<template>
  <div class="d-flex p-3">
    <BFormInput
      class="flex-grow"
      type="text"
      v-model="inputMessage"
      placeholder="メッセージを入力..."
      @keydown.enter="handleSendMessage"
    />
    <b-button @click="handleSendMessage" color="white">✈️</b-button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "sendMessage"]);

const inputMessage = ref(props.modelValue);

const handleSendMessage = () => {
  if (inputMessage.value.trim()) {
    emit("sendMessage", inputMessage.value.trim());
    emit("update:modelValue", "");
    inputMessage.value = "";
  }
};
</script>
