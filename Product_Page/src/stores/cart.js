import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    itemsById: {},
  }),
  getters: {
    totalItems: (state) =>
      Object.values(state.itemsById).reduce((sum, qty) => sum + qty, 0),
  },
  actions: {
    add(productId, qty = 1) {
      const id = Number(productId);
      const amount = Number(qty);
      if (!Number.isFinite(id) || !Number.isFinite(amount) || amount <= 0)
        return;

      const current = this.itemsById[id] ?? 0;
      this.itemsById = { ...this.itemsById, [id]: current + amount };
    },
    removeOne(productId) {
      const id = Number(productId);
      const current = this.itemsById[id] ?? 0;
      if (current <= 0) return;

      const next = { ...this.itemsById };
      if (current === 1) delete next[id];
      else next[id] = current - 1;
      this.itemsById = next;
    },
    clear() {
      this.itemsById = {};
    },
  },
});
