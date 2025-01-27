<template>
  <BNavbar expand="lg" background-color="primary" theme="dark">
    <BContainer fluid>
      <BNavbarBrand>Nuxt チャットツール</BNavbarBrand>
    </BContainer>
  </BNavbar>
</template>

<script setup lang="ts">
import { BNavbar, BContainer, BNavbarBrand } from "bootstrap-vue-3";
</script>

<style scoped>
.b-navbar {
  background-color: #007bff !important;

.b-navbar-brand {
  color: white;
  font-size: 1.5rem;
}
</style>
