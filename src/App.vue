<!-- src/App.vue -->

<template>
  <ProductProvider>
    <CheckoutProvider>
      <Navbar />
      <main>
        <router-view />
      </main>
      <Footer />
    </CheckoutProvider>
  </ProductProvider>
</template>

<script lang="ts" setup>

import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import ProductProvider from './context/ProductProvider.vue';
import CheckoutProvider from './context/CheckoutProvider.vue';
</script>
