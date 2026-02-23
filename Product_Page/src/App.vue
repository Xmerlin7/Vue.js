<script setup>
import Navbar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
