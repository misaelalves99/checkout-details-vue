<!-- src/pages/products/[productId].vue -->

<template>
  <div class="container">
    <ProductDetails
      v-if="product"
      :product="product"
    />
    <div v-else-if="loading" class="loading">Carregando produto...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="error">Produto não encontrado.</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ProductDetails from '../../components/ProductDetails.vue';
import type { Product } from '../../types/product';
import { getProductById } from '../../services/productService';

const route = useRoute();
const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref('');

async function loadProduct(productId: string) {
  loading.value = true;
  error.value = '';
  product.value = null;

  try {
    const fetchedProduct = await getProductById(Number(productId));
    if (!fetchedProduct) {
      error.value = 'Produto não encontrado';
    } else {
      product.value = fetchedProduct;
    }
  } catch (err) {
    error.value = 'Erro ao carregar o produto';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

watch(
  () => route.params.productId,
  (productId) => {
    if (typeof productId === 'string') {
      loadProduct(productId);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
  background-color: #fff;
}

.loading,
.error {
  width: 100%;
  text-align: center;
  font-size: 1.25rem;
  padding: 2rem;
  color: #333;
}

.loading {
  color: #0070f3;
  font-weight: 500;
}

.error {
  color: #d32f2f;
  background-color: #fff3f3;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
}

.detailsWrapper {
  flex: 1 1 600px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 1rem;
  }
}
</style>
