<script setup>
import { computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import MainProduct from "../components/MainProduct.vue";
import RelativeProducts from "../components/RelativeProducts.vue";
import { products } from "../data/products";

const route = useRoute();
const router = useRouter();

// Requirement: computed on route.params.id
const productId = computed(() => Number(route.params.id));

const resolvedId = computed(() => {
  const candidate = productId.value;
  if (!Number.isFinite(candidate)) return null;
  return candidate;
});

const stockById = reactive(Object.fromEntries(products.map((p) => [p.id, 5])));

const selectedProduct = computed(() => {
  if (resolvedId.value == null) return null;
  return products.find((p) => p.id === resolvedId.value) ?? null;
});

const selectedStock = computed(() =>
  resolvedId.value == null ? 0 : (stockById[resolvedId.value] ?? 0),
);

const relativeProducts = computed(() => {
  if (!selectedProduct.value) return [];
  return products.filter((p) => p.id !== selectedProduct.value.id).slice(0, 3);
});

function handleBuy() {
  if (resolvedId.value == null) return;
  const current = stockById[resolvedId.value] ?? 0;
  if (current <= 0) return;
  stockById[resolvedId.value] = current - 1;
}

function handleViewDetails(nextId) {
  router.push({ name: "product-details", params: { id: nextId } });
}
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
      <MainProduct
        :product="selectedProduct"
        :stock="selectedStock"
        @buy="handleBuy"
      />

      <div class="mt-10">
        <h3 class="text-lg font-bold">Relative products</h3>
        <div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          <RelativeProducts
            v-for="p in relativeProducts"
            :key="p.id"
            :product="p"
            @view="handleViewDetails"
          />
        </div>
      </div>
    </div>

    <div v-else class="alert alert-error">
      <span>Product not found.</span>
    </div>
  </section>
</template>
