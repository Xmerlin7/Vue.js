<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import MainProduct from "../components/MainProduct.vue";
import RelativeProducts from "../components/RelativeProducts.vue";
import { products } from "../data/products";

const router = useRouter();

const selectedId = ref(products[0]?.id ?? 1);

const stockById = reactive(Object.fromEntries(products.map((p) => [p.id, 5])));

const selectedProduct = computed(() => {
  return products.find((p) => p.id === selectedId.value) ?? products[0];
});

const selectedStock = computed(() => stockById[selectedId.value] ?? 0);

const relativeProducts = computed(() =>
  products.filter((p) => p.id !== selectedId.value).slice(0, 3),
);

function handleBuy() {
  const current = stockById[selectedId.value] ?? 0;
  if (current <= 0) return;
  stockById[selectedId.value] = current - 1;
}

function handleViewDetails(productId) {
  selectedId.value = productId;
  router.push({ name: "product-details", params: { id: productId } });
}
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-8">
    <MainProduct
      v-if="selectedProduct"
      :product="selectedProduct"
      :stock="selectedStock"
      @buy="handleBuy"
    />

    <div class="mt-10">
      <h2 class="text-xl font-bold">Relative products</h2>
      <div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        <RelativeProducts
          v-for="p in relativeProducts"
          :key="p.id"
          :product="p"
          @view="handleViewDetails"
        />
      </div>
    </div>
  </section>
</template>
