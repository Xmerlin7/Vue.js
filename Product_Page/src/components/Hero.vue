<script setup>
import MainProduct from "./MainProduct.vue";
import RelativeProducts from "./RelativeProducts.vue";
import { computed, onMounted } from "vue";

import { useProductsStore } from "../stores/products";

const productsStore = useProductsStore();

onMounted(() => {
  productsStore.loadProducts();
});

const productId = computed(() => productsStore.products[0]?.id ?? null);

const relativeProducts = computed(() =>
  productId.value == null ? [] : productsStore.relativeById(productId.value, 3),
);
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-8">
    <MainProduct v-if="productId" :product-id="productId" />

    <div class="mt-10">
      <h2 class="text-xl font-bold">Relative products</h2>
      <div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        <RelativeProducts
          v-for="p in relativeProducts"
          :key="p.id"
          :product-id="p.id"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
