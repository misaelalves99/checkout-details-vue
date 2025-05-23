import { inject } from 'vue';

type CheckoutForm = {
  name: string;
  address: string;
  paymentMethod: string;
};

type CheckoutContextType = {
  form: CheckoutForm;
  setForm: (form: CheckoutForm) => void;
};

const CHECKOUT_KEY = Symbol('checkout');

export function useCheckout(): CheckoutContextType {
  const context = inject<CheckoutContextType>(CHECKOUT_KEY);
  if (!context) {
    throw new Error('useCheckout deve ser usado dentro de um CheckoutProvider');
  }
  return context;
}
