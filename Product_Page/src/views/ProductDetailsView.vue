<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import MainProduct from "../components/MainProduct.vue";
import RelativeProducts from "../components/RelativeProducts.vue";
import { useProductsStore } from "../stores/products";

const route = useRoute();
const productsStore = useProductsStore();

onMounted(() => {
  productsStore.loadProducts();
});

// Requirement: computed on route.params.id
const productId = computed(() => Number(route.params.id));

const resolvedId = computed(() => {
  const candidate = productId.value;
  if (!Number.isFinite(candidate)) return null;
  return candidate;
});

const selectedProduct = computed(() => {
  if (resolvedId.value == null) return null;
  return productsStore.getById(resolvedId.value);
});

const relativeProducts = computed(() => {
  if (!selectedProduct.value) return [];
  return productsStore.relativeById(selectedProduct.value.id, 3);
});
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-xl font-bold">Product details</h2>
      <RouterLink to="/products" class="btn btn-ghost btn-sm">
        Back to products
      </RouterLink>
    </div>

    <div v-if="selectedProduct">
      <MainProduct :product-id="selectedProduct.id" />

      <div class="mt-10">
        <h3 class="text-lg font-bold">Relative products</h3>
        <div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          <RelativeProducts
            v-for="p in relativeProducts"
            :key="p.id"
            :product-id="p.id"
          />
        </div>
      </div>
    </div>

    <div v-else-if="productsStore.loading" class="skeleton h-80 w-full"></div>

    <div v-else-if="productsStore.error" class="alert alert-error">
      <span>{{ productsStore.error }}</span>
    </div>

    <div v-else class="alert alert-error">
      <span>Product not found.</span>
    </div>
  </section>
</template>
