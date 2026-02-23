<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

import { useProductsStore } from "../stores/products";

const props = defineProps({
  productId: {
    type: [Number, String],
    required: true,
  },
});

const router = useRouter();
const productsStore = useProductsStore();

const product = computed(() => productsStore.getById(props.productId));

const discountedPrice = computed(() =>
  Math.max((product.value?.price ?? 0) - (product.value?.discount ?? 0), 0),
);

function onView() {
  router.push({ name: "product-details", params: { id: props.productId } });
}
</script>

<template>
  <div v-if="product" class="card bg-base-100 shadow">
    <figure>
      <img
        :src="product.image"
        :alt="product.name"
        class="h-48 w-full object-cover"
      />
    </figure>
    <div class="card-body">
      <h3 class="card-title">{{ product.name }}</h3>
      <div class="flex items-center gap-2">
        <span class="font-bold">${{ discountedPrice }}</span>
        <span
          v-if="(product.discount ?? 0) > 0"
          class="text-base-content/50 line-through"
          >${{ product.price }}</span
        >
      </div>
      <div class="card-actions justify-end">
        <button class="btn btn-outline btn-sm" @click="onView">
          View details
        </button>
      </div>
    </div>
  </div>

  <div v-else class="skeleton h-64 w-full"></div>
</template>

<style scoped></style>
