<script setup>
import { computed, onMounted, ref, watch } from "vue";

import MainProduct from "../components/MainProduct.vue";
import RelativeProducts from "../components/RelativeProducts.vue";

import { useProductsStore } from "../stores/products";
const productsStore = useProductsStore();

const selectedId = ref(null);

onMounted(() => {
  productsStore.loadProducts();
});

watch(
  () => productsStore.products,
  (products) => {
    if (selectedId.value == null && products.length > 0) {
      selectedId.value = products[0].id;
    }
  },
  { immediate: true },
);

const selectedProduct = computed(() =>
  selectedId.value == null ? null : productsStore.getById(selectedId.value),
);

const relativeProducts = computed(() =>
  selectedId.value == null
    ? []
    : productsStore.relativeById(selectedId.value, 3),
);
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-8">
    <div v-if="productsStore.loading" class="skeleton h-80 w-full"></div>

    <div v-else-if="productsStore.error" class="alert alert-error">
      <span>{{ productsStore.error }}</span>
    </div>

    <MainProduct v-else-if="selectedProduct" :product-id="selectedId" />

    <div v-else class="alert alert-warning">
      <span>No products found.</span>
    </div>

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
