<!-- src/components/CheckoutActions.vue -->
 
<script lang="ts" setup>
type CheckoutActionsProps = {
  onFinish: () => void;
};

const props = defineProps<CheckoutActionsProps>();

const handleClick = () => {
  props.onFinish();
};
</script>

<template>
  <div class="actions">
    <button class="finishButton" @click="handleClick">
      Finalizar Pedido
    </button>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.message {
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  color: #16a34a;
}

.finishButton {
  padding: 0.75rem 2rem;
  background-color: #3b82f6;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.finishButton:hover {
  background-color: #2563eb;
}

.finishButton:active {
  background-color: #1d4ed8;
  transform: scale(0.98);
}
</style>
