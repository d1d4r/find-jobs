<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/useAuthStore'
import { onMounted } from 'vue'
const state = useAuthStore()

onMounted(() => {
  state.tryLogging()
  //await state.monitor()
  //console.log(state.isLoagged)
})
</script>

<template>
  <RouterView />
  
</template>

<style scoped></style>
