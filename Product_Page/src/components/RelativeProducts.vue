<script setup>
import { computed } from "vue";

const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      id: 1,
      name: "Cozy Sneakers",
      image:
        "https://img.daisyui.com/images/stock/photo-1552068751-34cb5cf055b3.webp",
      price: 120,
      discount: 20,
    }),
  },
});

const emit = defineEmits(["view"]);

const discountedPrice = computed(() =>
  Math.max((props.product?.price ?? 0) - (props.product?.discount ?? 0), 0),
);

function onView() {
  emit("view", props.product?.id);
}
</script>

<template>
  <div class="card bg-base-100 shadow">
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
        <span class="text-base-content/50 line-through"
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
</template>

<style scoped></style>
