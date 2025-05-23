<!-- src/components/FormInput.vue -->

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

type FormInputProps = {
  label: string;
  type: string;
  name: string;
  modelValue: string;
};

const props = defineProps<FormInputProps>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="inputContainer">
    <label :for="props.name" class="label">{{ props.label }}</label>
    <input
      :id="props.name"
      class="input"
      :type="props.type"
      :name="props.name"
      :value="props.modelValue"
      @input="onInput"
    />
  </div>
</template>

<style scoped>
.inputContainer {
  margin-bottom: 1.5rem;
  width: 100%;
}

.label {
  font-size: 1rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.5rem;
  display: block;
}

.input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #f9fafb;
  color: #4b5563;
  outline: none;
  transition: all 0.3s ease;
}

.input:focus {
  border-color: #10b981;
  background-color: #ffffff;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
}

.input:disabled {
  background-color: #e5e7eb;
  cursor: not-allowed;
}

.input::placeholder {
  color: #9ca3af;
}

@media (max-width: 600px) {
  .input {
    font-size: 0.9rem;
  }
}
</style>
