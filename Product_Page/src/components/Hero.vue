<script setup>
import MainProduct from "./MainProduct.vue";
import RelativeProducts from "./RelativeProducts.vue";
import { ref } from "vue";
const product = ref({
  id: 1,
  name: "Cozy Sneakers",
  description: "High-quality sneakers that go with everything you wear.",
  image:
    "https://picsum.photos/300/300",
  badge: "NEW",
  price: 120,
  discount: 20,
  tags: ["Fashion", "Casual", "Sport"],
});
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-8">
    <MainProduct :product="product" />

    <div class="mt-10">
      <h2 class="text-xl font-bold">Relative products</h2>
      <div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        <RelativeProducts v-for="n in 3" :key="n" :product="product" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
