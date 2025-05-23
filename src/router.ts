import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/home/HomePage.vue';
import ProductsPage from './pages/products/index.vue';
import ProductPage from './pages/products/[productId].vue';
import CheckoutPage from './pages/checkout/[productId].vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/products', name: 'ProductsPage', component: ProductsPage,},
  { path: '/products/:productId', name: 'ProductPage', component: ProductPage, props: true, },
  { path: '/checkout/:productId?', name: 'Checkout', component: CheckoutPage, props: true },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
