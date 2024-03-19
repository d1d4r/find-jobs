<template>
  <div class="grid grid-cols-1 gap-5 m-2 sm:grid-cols-2 md:grid-cols-4 place-items-center">
    <div
      class="w-full mx-auto overflow-hidden bg-black border rounded-lg"
      v-for="candidate in state.candidates"
      :key="candidate.id"
    >
      <img
        class="object-cover object-center w-full h-56"
        src="https://via.placeholder.com/150"
        alt="User Image"
      />
      <div class="p-4">
        <h2 class="text-2xl font-semibold text-white">{{ candidate.displayName }}</h2>
        <p class="text-sm font-medium text-white">{{ candidate.bio }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAllUsers } from '@/services/firestore/userService'
import { onMounted, reactive } from 'vue'

const state = reactive({
  candidates: []
})
onMounted(async () => {
  const users = await getAllUsers()
  state.candidates = users
})
</script>

<style lang="scss" scoped></style>
