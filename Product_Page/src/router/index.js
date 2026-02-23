import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProductsView from "../views/ProductsView.vue";
import ProductDetailsView from "../views/ProductDetailsView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/about", name: "about", component: AboutView },
    { path: "/products", name: "products", component: ProductsView },
    {
      path: "/products/:id",
      name: "product-details",
      component: ProductDetailsView,
    },
  ],
});

export default router;
