<!-- src/context/ProductProvider.vue -->
<template>
  <slot />
</template>

<script setup lang="ts">
import { provideProductContext } from '../composables/useProductContext';

provideProductContext();
</script>
