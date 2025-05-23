<!-- src/components/FormSelect.vue -->

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

type FormSelectProps = {
  label: string;
  name: string;
  modelValue: string;
  options: string[];
};

const props = defineProps<FormSelectProps>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="selectContainer">
    <label :for="props.name" class="label">{{ props.label }}</label>
    <select
      :id="props.name"
      class="select"
      :name="props.name"
      :value="props.modelValue"
      @change="onChange"
    >
      <option
        v-for="(option, index) in props.options"
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.selectContainer {
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

.select {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #f9fafb;
  color: #4b5563;
  outline: none;
  appearance: none;
  transition: all 0.3s ease;
}

.select:focus {
  border-color: #10b981;
  background-color: #ffffff;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
}

.select:disabled {
  background-color: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}

.select option {
  background-color: #f9fafb;
}

@media (max-width: 600px) {
  .select {
    font-size: 0.9rem;
  }
}
</style>
