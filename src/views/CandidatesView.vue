<template>
  <div class="grid grid-cols-1 gap-5 m-2 sm:grid-cols-2 md:grid-cols-4 place-items-center">
      <div
        class="w-full mx-auto overflow-hidden bg-white border rounded-lg"
        v-for="i in 9"
        :key="i"
      >
        <img class="object-cover object-center w-full h-56" :src="user.imageUrl" alt="User Image" />
        <div class="p-4">
          <h2 class="text-2xl font-semibold text-gray-800">{{ user.name }}</h2>
          <p class="text-sm font-medium text-gray-500">{{ user.email }}</p>
        </div>
      </div>
  </div>
</template>

<script setup>
const user = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  imageUrl: 'https://via.placeholder.com/150' // Replace with actual image URL
}
</script>

<style lang="scss" scoped></style>
