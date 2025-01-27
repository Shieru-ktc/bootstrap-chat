<template>
  <div class="input-box">
    <BFormInput
      class="flex-grow-1"
      type="text"
      v-model="inputMessage"
      placeholder="メッセージを入力..."
      @keydown.enter="handleSendMessage"
    />
    <b-button @click="handleSendMessage" color="white">✈️</b-button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

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
  }
};
</script>

<style scoped>
.input-box {
  display: flex;
  gap: 10px;
}
</style>
