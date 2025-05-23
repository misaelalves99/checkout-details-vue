// src/composables/useProductContext.ts

import { inject, provide, ref } from 'vue';
import type { Ref } from 'vue';
import type { Product } from '../types/product';
import { getProducts } from '../composables/useProducts';

export type ProductContextType = {
  products: Ref<Product[]>;
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
};

const ProductSymbol = Symbol('ProductContext');

export function provideProductContext() {
  const products = ref<Product[]>([]);

  const setProducts = (newProducts: Product[]) => {
    products.value = newProducts;
  };

  const fetchProducts = async () => {
    try {
      const fetched = await getProducts();
      setProducts(fetched);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  provide<ProductContextType>(ProductSymbol, {
    products,
    setProducts,
    fetchProducts,
  });
}

export function useProductContext(): ProductContextType {
  const context = inject<ProductContextType>(ProductSymbol);
  if (!context) {
    throw new Error('useProductContext deve ser usado dentro de um ProductProvider');
  }
  return context;
}
