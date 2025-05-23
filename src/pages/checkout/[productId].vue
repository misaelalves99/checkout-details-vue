<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { getProductById } from '../../services/productService';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
}

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  deliveryTime: string;
}

interface Address {
  isPrincipal: boolean;
  name: string;
  street: string;
  cityState: string;
  cep: string;
}

const mockShippingOptions: ShippingOption[] = [
  { id: 'normal', name: 'Normal', price: 0, deliveryTime: '15 de maio, quinta' },
  { id: 'rapido', name: 'Retirar Rápido', price: 0, deliveryTime: 'Retirar em 2h' },
];

const mockAddress: Address = {
  isPrincipal: true,
  name: 'Misael Alves dos Santos',
  street: 'Rua Francisco De Souza Campos, 131 - casa',
  cityState: 'Rio Pretinho, Teófilo Otoni - MG',
  cep: '39808-000',
};

const route = useRoute();
const productId = Number(route.params.productId);
const product = ref<Product | null>(null);
const quantity = ref(1);
const selectedShipping = ref<ShippingOption>(mockShippingOptions[0]);

watchEffect(async () => {
  if (!productId) {
    product.value = null;
    return;
  }

  const result = await getProductById(productId);
  product.value = result ?? null;
});

function handleQuantityChange(type: 'increment' | 'decrement') {
  if (type === 'increment') quantity.value++;
  else if (type === 'decrement' && quantity.value > 1) quantity.value--;
}

function handleShippingSelect(option: ShippingOption) {
  selectedShipping.value = option;
}

function calculateTotal(): number {
  if (!product.value) return 0;
  return product.value.price * quantity.value + selectedShipping.value.price;
}

function handleGoToPayment() {
  if (!product.value) return;

  alert('Ir para a página de pagamento (não implementado).');
  console.log('Produto:', product.value);
  console.log('Quantidade:', quantity.value);
  console.log('Frete:', selectedShipping.value);
}

const total = computed(() => calculateTotal());
const pixDiscount = computed(() => total.value * 0.05);
const totalPix = computed(() => total.value - pixDiscount.value);
</script>

<template>
  <div class="checkoutContainer">
    <div class="checkoutPanel">
      <section class="deliveryAddress">
        <h2>Endereço de entrega</h2>
        <div class="addressCard">
          <span v-if="mockAddress.isPrincipal" class="principalAddress">Endereço principal</span>
          <p>{{ mockAddress.name }}</p>
          <p>{{ mockAddress.street }}</p>
          <p>{{ mockAddress.cityState }}</p>
          <p>CEP: {{ mockAddress.cep }}</p>
          <button class="changeAddressButton">Novo endereço</button>
          <button class="changeAddressButton">Escolher outro endereço</button>
        </div>
      </section>

      <section class="shippingOptions">
        <h2>Escolha a entrega</h2>
        <div
          v-for="option in mockShippingOptions"
          :key="option.id"
          :class="['shippingOption', selectedShipping.id === option.id ? 'selected' : '']"
          @click="handleShippingSelect(option)"
        >
          <input
            type="radio"
            :id="option.id"
            name="shipping"
            :value="option.id"
            :checked="selectedShipping.id === option.id"
            @change="handleShippingSelect(option)"
          />
          <label :for="option.id">
            <span class="shippingName">{{ option.name }}</span>
            <span class="deliveryTime">{{ option.deliveryTime }}</span>
            <span class="shippingPrice">
              {{ option.price > 0 ? `R$ ${option.price.toFixed(2)}` : 'Grátis' }}
            </span>
          </label>
        </div>
      </section>
    </div>

    <div class="orderSummary" v-if="product">
      <h2>Resumo do pedido</h2>
      <div class="summaryItem">
        <div class="productInfo">
          <img
            v-if="product.imageUrl"
            :src="product.imageUrl"
            :alt="product.name"
            width="80"
            height="80"
            class="summaryImage"
          />
          <p class="summaryProductName">{{ product.name }}</p>
        </div>
        <div class="quantityControl">
          <button @click="handleQuantityChange('decrement')">-</button>
          <span>{{ quantity }}</span>
          <button @click="handleQuantityChange('increment')">+</button>
        </div>
        <p class="summaryPrice">R$ {{ (product.price * quantity).toFixed(2) }}</p>
      </div>

      <div class="summarySubtotal">
        <span>Subtotal ({{ quantity }} Produto{{ quantity > 1 ? 's' : '' }})</span>
        <span>R$ {{ (product.price * quantity).toFixed(2) }}</span>
      </div>
      <div class="summaryShipping">
        <span>Entrega</span>
        <span>{{ selectedShipping.price > 0 ? `R$ ${selectedShipping.price.toFixed(2)}` : 'Grátis' }}</span>
      </div>
      <div class="summaryTotal">
        <span>Total</span>
        <span>R$ {{ total.toFixed(2) }}</span>
      </div>
      <div class="paymentInfo">
        <p>ou R$ {{ totalPix.toFixed(2) }} à vista no Pix</p>
      </div>

      <button class="goToPaymentButton" @click="handleGoToPayment">
        Ir para pagamento
      </button>
    </div>

    <div v-else class="notFound">
      Produto não encontrado.
    </div>
  </div>
</template>

<style scoped>
.checkoutContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 3rem;
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.checkoutPanel {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.deliveryAddress h2,
.shippingOptions h2,
.orderSummary h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  text-align: left;
}

.addressCard {
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 1rem;
  color: #374151;
}

.principalAddress {
  font-weight: 600;
  color: #10b981;
}

.changeAddressButton {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.changeAddressButton:hover {
  background-color: #2563eb;
}

.shippingOptions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.shippingOption {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.shippingOption:hover {
  background-color: #f3f4f6;
}

.shippingOption.selected {
  border-color: #10b981;
  background-color: #d1fae5;
}

.shippingName {
  font-weight: 600;
  color: #111827;
  margin-right: auto;
}

.deliveryTime {
  color: #6b7280;
  font-size: 0.9rem;
  margin-right: 1rem;
}

.shippingPrice {
  font-weight: 600;
  color: #10b981;
}

.orderSummary {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.summaryItem {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.productInfo {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.summaryImage {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid #e5e7eb;
}

.summaryProductName {
  font-weight: 600;
  font-size: 1.1rem;
  color: #111827;
}

.quantityControl {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantityControl button {
  width: 28px;
  height: 28px;
  border: 1px solid #d1d5db;
  background: white;
  cursor: pointer;
  font-weight: 600;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.quantityControl button:hover {
  background-color: #f3f4f6;
}

.summaryPrice {
  font-weight: 600;
  color: #10b981;
  min-width: 80px;
  text-align: right;
}

.summarySubtotal,
.summaryShipping,
.summaryTotal {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.summaryTotal {
  font-size: 1.3rem;
  color: #111827;
}

.paymentInfo {
  font-size: 0.95rem;
  color: #6b7280;
  margin-top: 1rem;
  font-weight: 500;
}

.goToPaymentButton {
  margin-top: 2rem;
  width: 100%;
  padding: 1rem;
  background-color: #10b981;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.goToPaymentButton:hover {
  background-color: #059669;
}

.notFound {
  text-align: center;
  font-size: 1.5rem;
  color: #ef4444;
  font-weight: 700;
  margin-top: 3rem;
}
</style>
