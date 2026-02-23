<script setup>
import { computed } from "vue";
import { useProductsStore } from "../stores/products";
import { useCartStore } from "../stores/cart";

const props = defineProps({
  productId: {
    type: [Number, String],
    required: true,
  },
});

const productsStore = useProductsStore();
const cartStore = useCartStore();

const product = computed(() => productsStore.getById(props.productId));
const stock = computed(() => productsStore.stockFor(props.productId));

const discountedPrice = computed(() => {
  const price = product.value?.price ?? 0;
  const discount = product.value?.discount ?? 0;
  return Math.max(price - discount, 0);
});

const isOutOfStock = computed(() => (stock.value ?? 0) <= 0);

function onBuy() {
  if (isOutOfStock.value) return;
  const ok = productsStore.buy(props.productId);
  if (ok) cartStore.add(props.productId, 1);
}
</script>

<template>
  <section class="w-full">
    <div v-if="product" class="card bg-base-100 shadow">
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
              <div v-if="product.badge" class="badge badge-primary">
                {{ product.badge }}
              </div>
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
              <span
                v-if="(product.discount ?? 0) > 0"
                class="text-base-content/50 line-through"
                >${{ product.price }}</span
              >
              <span v-if="(product.discount ?? 0) > 0" class="badge badge-ghost"
                >- ${{ product.discount }}</span
              >
            </div>

            <div v-if="product.tags?.length" class="mt-4 flex flex-wrap gap-2">
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

    <div v-else class="alert alert-warning">
      <span>Product is not available.</span>
    </div>
  </section>
</template>

<style scoped></style>
