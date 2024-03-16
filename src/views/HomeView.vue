<template>
  <NavBar />
  
  <RouterView />
  <footer class="h-20 p-2 bg-black border">
    <div class="flex items-center justify-center w-full h-full text-white border">
      <p>
        developed by
        <a
          href="https://github.com/d1d4r"
          target="_blank"
          class="p-1 text-black underline bg-white rounded-md"
        >
          d1d4r
        </a>
      </p>
    </div>
  </footer>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { RouterView } from 'vue-router'
</script>

<style lang="scss" scoped></style>
