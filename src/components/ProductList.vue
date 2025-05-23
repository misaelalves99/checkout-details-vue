<!-- src/components/ProductList.vue -->

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Product } from '../types/product';
import ProductCard from './ProductCard.vue';
import { getProducts } from '../services/productService';

const products = ref<Product[]>([]);
const router = useRouter();

onMounted(async () => {
  products.value = await getProducts();
});

function handleBuyNow(product: Product) {
  router.push(`/products/${product.id}`);
}
</script>

<template>
  <div>
    <p v-if="products.length === 0" class="noProductsMessage">
      Nenhum produto encontrado.
    </p>

    <div v-else class="productGrid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :onBuyNow="handleBuyNow"
      />
    </div>
  </div>
</template>

<style scoped>

.productGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  margin-top: 20px;
}

.productGrid > div {
  display: flex;
  justify-content: center;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 50px;
}

.error {
  color: #d9534f;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 50px;
}

.noProductsMessage {
  text-align: center;
  font-size: 1.1rem;
  color: #777;
  margin-top: 50px;
}

.filterContainer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.filterButton {
  background-color: #5bc0de;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.filterButton:hover {
  background-color: #31b0d5;
}

.filterButton:focus {
  outline: none;
}

@media (max-width: 768px) {
  .productGrid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .filterContainer {
    flex-direction: column;
    gap: 10px;
  }

  .filterButton {
    width: 100%;
    padding: 12px;
  }
}
</style>
