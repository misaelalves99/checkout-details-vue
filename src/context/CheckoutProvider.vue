<script lang="ts" setup>
import { reactive, provide } from 'vue';
import type { CheckoutForm } from '../types/checkout';

type CheckoutContextType = {
  form: CheckoutForm;
  setForm: (form: CheckoutForm) => void;
};

const CHECKOUT_KEY = Symbol('checkout');

const form = reactive<CheckoutForm>({
  name: '',
  address: '',
  paymentMethod: 'credit_card',
});

function setForm(newForm: CheckoutForm) {
  Object.assign(form, newForm);
}

provide<CheckoutContextType>(CHECKOUT_KEY, {
  form,
  setForm,
});
</script>

<template>
  <slot />
</template>
