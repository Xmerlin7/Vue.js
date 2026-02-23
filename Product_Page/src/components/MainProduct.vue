<script setup>
import { computed } from "vue";
const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      id: 1,
      name: "Cozy Sneakers",
      description: "High-quality sneakers that go with everything you wear.",
      image:
        "https://img.daisyui.com/images/stock/photo-1552068751-34cb5cf055b3.webp",
      badge: "NEW",
      price: 120,
      discount: 20,
      tags: ["Fashion", "Casual", "Sport"],
    }),
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["buy"]);

const discountedPrice = computed(() => {
  return props.product.price - props.product.discount;
});

const isOutOfStock = computed(() => (props.stock ?? 0) <= 0);

function onBuy() {
  if (isOutOfStock.value) return;
  emit("buy");
}
</script>

<template>
  <section class="w-full">
    <div class="card bg-base-100 shadow">
      <div class="card-body">
        <div class="flex flex-col gap-6 md:flex-row md:items-start">
          <figure class="w-full md:w-1/2">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full rounded-box"
            />
          </figure>

          <div class="w-full md:w-1/2">
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-bold">{{ product.name }}</h1>
              <div class="badge badge-primary">{{ product.badge }}</div>
              <div
                class="badge"
                :class="isOutOfStock ? 'badge-error' : 'badge-success'"
              >
                {{ isOutOfStock ? "Out of stock" : `${stock} in stock` }}
              </div>
            </div>

            <p class="mt-3 text-base-content/70">{{ product.description }}</p>

            <div class="mt-4 flex items-center gap-3">
              <span class="text-3xl font-bold">${{ discountedPrice }}</span>
              <span class="text-base-content/50 line-through"
                >${{ product.price }}</span
              >
              <span class="badge badge-ghost">- ${{ product.discount }}</span>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="badge badge-outline"
              >
                {{ tag }}
              </span>
            </div>

            <div class="mt-6">
              <button
                class="btn btn-primary"
                :disabled="isOutOfStock"
                @click="onBuy"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
