<!-- src/components/ProductDetails.vue -->
 
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Product } from '../types/product';

import { Heart, Share2, Star } from 'lucide-vue-next';

interface Props {
  product: Product;
  onAddToCart?: (product: Product) => void;
  oldPrice?: number;
}
const props = defineProps<Props>();

const router = useRouter();

const mainImage = ref<string>(
  props.product.imageUrl ||
  'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg'
);
const isFavorite = ref<boolean>(false);

function handleBuyNow() {
  router.push(`/checkout/${props.product.id}`);
}

function handleThumbnailClick(imageUrl: string) {
  mainImage.value = imageUrl;
}

function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
}

function handleShare() {
  console.log('Compartilhar produto');
}

function formatPrice(price: number | undefined): string | undefined {
  if (price === undefined) return undefined;
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const thumbnails = computed(() => {
  if (props.product.images && props.product.images.length > 0) {
    return props.product.images.filter((img): img is string => typeof img === 'string');
  }
  return props.product.imageUrl ? [props.product.imageUrl] : [];
});
</script>

<template>
  <div class="productDetails">
    <div class="imageGallery">
      <div class="mainImageWrapper">
        <img
          :src="mainImage"
          :alt="props.product.name"
          width="500"
          height="500"
          class="productImage"
        />
        <div class="imageActions">
          <button
            class="favoriteButton"
            @click="toggleFavorite"
            :aria-label="isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
            type="button"
          >
            <Heart :size="24" :color="isFavorite ? 'red' : 'grey'" />
          </button>
          <button
            class="shareButton"
            @click="handleShare"
            aria-label="Compartilhar"
            type="button"
          >
            <Share2 :size="24" />
          </button>
        </div>
      </div>

      <div class="thumbnails">
        <div
          v-for="(img, index) in thumbnails"
          :key="index"
          :class="['thumbnailWrapper', mainImage === img ? 'activeThumbnail' : '']"
          @click="() => handleThumbnailClick(img)"
        >
          <img
            :src="img"
            :alt="`Miniatura ${index + 1}`"
            width="80"
            height="80"
            class="thumbnailImage"
          />
        </div>
      </div>
    </div>

    <div class="details">
      <h1 class="productName">{{ props.product.name }}</h1>

      <div class="ratingAndReviews">
        <div class="rating">
          <Star color="#ffc107" :size="16" />
          <Star color="#ffc107" :size="16" />
          <Star color="#ffc107" :size="16" />
          <Star color="#ffc107" :size="16" />
          <Star color="grey" :size="16" />
          <span class="ratingValue">4.0</span>
        </div>
        <span class="reviewCount">(15 avaliações)</span>
      </div>

      <p v-if="props.oldPrice" class="oldPrice">{{ formatPrice(props.oldPrice) }}</p>
      <p v-if="props.product.oldPrice" class="oldPrice">{{ formatPrice(props.product.oldPrice) }}</p>
      <p class="productPrice">{{ formatPrice(props.product.price) }}</p>

      <div class="discount">
        <span class="discountPercentage">13% OFF</span>
      </div>

      <div class="paymentOptions">
        <span>Ver mais opções de pagamento</span>
      </div>

      <div class="buttonGroup">
        <button
          class="buyButton"
          @click="handleBuyNow"
          title="Comprar agora"
          type="button"
        >
          Comprar
        </button>
      </div>

      <div class="shippingCalculator">
        <label for="cep" class="shippingLabel">
          Calcular frete e prazo de entrega:
        </label>
        <div class="shippingInput">
          <input
            type="text"
            id="cep"
            placeholder="Digite seu CEP"
            class="cepInput"
          />
          <button class="calculateButton" type="button">Calcular</button>
        </div>
      </div>

      <div class="productFeatures">
        <span class="viewFeatures">Ver características do produto</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.productDetails {
  max-width: 1200px;
  display: flex;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fff;
}

.imageGallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 40%;
}

.mainImageWrapper {
  position: relative;
  margin-bottom: 10px;
  width: 100%;
}

.productImage {
  width: 100%;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  aspect-ratio: 1/1;
  object-fit: contain;
}

.imageActions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.favoriteButton,
.shareButton {
  background: none;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favoriteButton:hover,
.shareButton:hover {
  background-color: #eee;
}

.thumbnails {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  width: 100%;
}

.thumbnailWrapper {
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  flex-shrink: 0;
}

.activeThumbnail {
  opacity: 1;
  border-color: #333;
}

.thumbnailWrapper:hover {
  opacity: 1;
}

.thumbnailImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-basis: 60%;
}

.productName {
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: #333;
}

.ratingAndReviews {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #777;
  font-size: 0.9rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 2px;
}

.ratingValue {
  font-weight: bold;
  color: #333;
}

.oldPrice {
  font-size: 1rem;
  color: #777;
  text-decoration: line-through;
  margin-bottom: 5px;
}

.productPrice {
  font-size: 1.8rem;
  color: #2e7d32;
  font-weight: bold;
  margin-bottom: 15px;
}

.discount {
  background-color: #ffe0b2;
  color: #e65100;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 10px;
}

.paymentOptions {
  color: #1976d2;
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 15px;
}

.paymentOptions:hover {
  text-decoration: underline;
}

.buttonGroup {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.buyButton {
  background-color: #2e7d32;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.buyButton:hover {
  background-color: #1b5e20;
}

.shippingCalculator {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9rem;
  color: #555;
}

.shippingLabel {
  font-weight: bold;
}

.shippingInput {
  display: flex;
  gap: 5px;
}

.cepInput {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.calculateButton {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.calculateButton:hover {
  background-color: #e0e0e0;
}

@media (max-width: 768px) {
  .productDetails {
    flex-direction: column;
  }

  .imageGallery {
    width: 100%;
  }

  .productImage {
    width: 100%;
  }

  .thumbnails {
    width: 100%;
  }
}

.productFeatures {
  margin-top: 15px;
}

.viewFeatures {
  color: #1976d2;
  font-size: 0.9rem;
  cursor: pointer;
}

.viewFeatures:hover {
  text-decoration: underline;
}
</style>
