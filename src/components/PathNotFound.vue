<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col gap-3">
      <span class="font-bold text-center text-red-600 text-7xl">404</span>
      <p class="text-7xl">page not found</p>
      <RouterLink
        to="/"
        class="px-4 py-2 text-center text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900"
      >
        go home
      </RouterLink>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
