<script lang="ts" setup>
import { useRouter } from 'vue-router';
import type { Product } from '../types/product';
import { Heart, ShoppingCart } from 'lucide-vue-next';

interface Props {
  product: Product;
  onBuyNow?: (product: Product) => void;
}
const props = defineProps<Props>();

const router = useRouter();

const goToProduct = () => {
  router.push(`/products/${String(props.product.id)}`);
};

const handleBuyNow = () => {
  if (props.onBuyNow) props.onBuyNow(props.product);
};
</script>

<template>
  <div class="card">
    <div class="favoriteIcon">
      <Heart :size="18" color="#ff4d4f" title="Adicionar aos favoritos" />
    </div>

    <div class="imageWrapper" @click="goToProduct" style="cursor: pointer;">
      <img
        :src="props.product.imageUrl || '/images/product-placeholder.png'"
        :alt="props.product.name"
        width="300"
        height="300"
        class="productImage"
      />
    </div>

    <div class="details">
      <h3 class="productName" @click="goToProduct" style="cursor: pointer;">
        {{ props.product.name }}
      </h3>
      <p class="productDescription">
        {{ props.product.description }}
      </p>
      <p class="productPrice">
        R$ {{ props.product.price.toFixed(2) }}
      </p>

      <div class="buttonGroup" style="display: flex; gap: 8px;">
        <button class="cartButton" type="button" title="Adicionar ao carrinho">
          <ShoppingCart :size="20" />
        </button>
        <button class="buyButton" @click="handleBuyNow" type="button">
          Comprar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.favoriteIcon {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  background: white;
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.imageWrapper {
  width: 100%;
  height: 250px;
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
}

.productImage {
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.productImage:hover {
  transform: scale(1.05);
}

.details {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 230px;
}

.productName {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-transform: capitalize;
  cursor: pointer;
}

.productDescription {
  font-size: 0.95rem;
  color: #777;
  margin-bottom: 16px;
  line-height: 1.4;
}

.productPrice {
  font-size: 1.1rem;
  font-weight: 500;
  color: #d9534f;
  margin-bottom: 16px;
}

.buttonGroup {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.cartButton {
  width: 42px;
  height: 42px;
  padding: 0;
  background-color: #5bc0de;
  color: white;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buyButton {
  flex: 1;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.9rem;
}

.cartButton:hover {
  background-color: #31b0d5;
}

.buyButton:hover {
  background-color: #218838;
}

button:focus {
  outline: none;
}

@media (max-width: 768px) {
  .buttonGroup {
    flex-direction: column;
    align-items: stretch;
  }

  .cartButton,
  .buyButton {
    width: 100%;
  }
}
</style>
