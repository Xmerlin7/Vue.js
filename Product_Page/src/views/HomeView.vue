<script setup></script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-10">
    <div class="hero rounded-box bg-base-200">
      <div class="hero-content flex-col gap-6 text-center">
        <div class="max-w-md">
          <h1 class="text-3xl font-bold">Welcome</h1>
          <p class="py-4 text-base-content/70">
            Browse products, view details, and test stock.
          </p>
          <RouterLink to="/products" class="btn btn-primary">
            Go to products
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
