<template>
  <div
    class="flex gap-2 p-3 mt-2 border cursor-pointer hover:border-black"
    @click="toDetails(candidate.id)"
  >
    <div class="">
      <img
        class="object-cover m-auto size-14 rounded-xl"
        src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
        alt=""
      />
    </div>
    <div class="grow">
      <p class="text-2xl">{{ candidate.displayName }}</p>
      <span class="text-sm">{{ candidate.bio }}</span>
    </div>
    <div class="flex flex-col justify-between">
      <!-- <p class="p-1 text-center text-white bg-black rounded-lg">{{}}</p> -->
      <p class="text-sm">{{}}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
defineProps({
  candidate: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const toDetails = (id) => {
  router.push({ path: `/candidates/${id}` })
}
</script>

<style lang="scss" scoped></style>
