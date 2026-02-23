import { defineStore } from "pinia";

import { fetchProducts } from "../api/productsApi";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    loading: false,
    error: null,
    stockById: {},
  }),
  getters: {
    getById: (state) => {
      return (id) => state.products.find((p) => p.id === Number(id)) ?? null;
    },
    relativeById: (state) => {
      return (id, count = 3) =>
        state.products.filter((p) => p.id !== Number(id)).slice(0, count);
    },
    stockFor: (state) => {
      return (id) => state.stockById[Number(id)] ?? 0;
    },
  },
  actions: {
    async loadProducts({ force = false } = {}) {
      if (this.loading) return;
      if (!force && this.products.length > 0) return;

      this.loading = true;
      this.error = null;

      try {
        const products = await fetchProducts();
        this.products = products;

        const nextStock = { ...this.stockById };
        for (const product of products) {
          if (nextStock[product.id] == null) nextStock[product.id] = 5;
        }
        this.stockById = nextStock;
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e);
      } finally {
        this.loading = false;
      }
    },
    buy(productId) {
      const id = Number(productId);
      const current = this.stockById[id] ?? 0;
      if (current <= 0) return false;
      this.stockById = { ...this.stockById, [id]: current - 1 };
      return true;
    },
  },
});
