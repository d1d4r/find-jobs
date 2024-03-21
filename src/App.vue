<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterSrction from '@/components/FooterSection.vue'
</script>

<template>
  <NavBar />
  <RouterView />
  <FooterSrction />
</template>

<style scoped></style>
