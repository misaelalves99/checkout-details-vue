<!-- src/components/FormButton.vue -->

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

type FormButtonProps = {
  text: string;
  type: 'button' | 'submit' | 'reset';
};

const props = defineProps<FormButtonProps>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

function handleClick() {
  emit('click');
}
</script>

<template>
  <button :type="props.type" class="button" @click="handleClick">
    {{ props.text }}
  </button>
</template>

<style scoped>
.button {
  background-color: #10b981;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 200px;
  display: block;
  margin: 0 auto;
}

.button:hover {
  background-color: #059669;
}

.button:focus {
  outline: 3px solid #34d399;
}

.button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .button {
    width: 100%;
  }
}
</style>
