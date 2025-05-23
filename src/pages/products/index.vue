<!-- src/pages/products/index.vue -->

<template>
  <div class="container">
    <h1 class="title">Lista de Produtos</h1>
    <ProductList :products="products" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ProductList from '../../components/ProductList.vue';
import type { Product } from '../../types/product';
import { getProducts } from '../../services/productService';

const products = ref<Product[]>([]);

onMounted(async () => {
  products.value = await getProducts();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding: 2rem 1rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.loadingMessage {
  font-size: 1.25rem;
  color: #666;
  text-align: center;
}

.errorMessage {
  font-size: 1.25rem;
  color: #f44336;
  text-align: center;
}

.noProductsText {
  font-size: 1.125rem;
  color: #888;
  text-align: center;
}

.productListContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
</style>
