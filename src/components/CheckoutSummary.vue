<!-- src/components/CheckoutSummary.vue -->

<script lang="ts" setup>
import type { Product } from '../types/product';

type CheckoutSummaryProps = {
  product?: Product;
};

const props = defineProps<CheckoutSummaryProps>();
</script>

<template>
  <div v-if="props.product" class="summaryContainer">
    <h2 class="title">Resumo do Pedido</h2>
    <p class="item"><strong>Produto:</strong> {{ props.product.name }}</p>
    <p class="item"><strong>Preço:</strong> R$ {{ props.product.price.toFixed(2) }}</p>
    <p class="item"><strong>Quantidade:</strong> 1</p>
    <hr class="divider" />
    <p class="total"><strong>Total:</strong> R$ {{ props.product.price.toFixed(2) }}</p>
  </div>
</template>

<style scoped>
.summaryContainer {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  min-width: 280px;
  flex: 1;
}

.title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #222;
}

.item {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #444;
}

.divider {
  margin: 1rem 0;
  border: none;
  border-top: 1px solid #ccc;
}

.total {
  font-size: 1.2rem;
  font-weight: bold;
  color: #007b55;
}
</style>
