<template>
  <div class="flex gap-2 p-3 border cursor-pointer hover:border-black" @click="toDetails(post.id)">
    <div class="">
      <img
        class="object-cover m-auto size-14 rounded-xl"
        src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
        alt=""
      />
    </div>
    <div class="grow">
      <p class="text-2xl">{{ post.jobTitle }}</p>
      <span class="text-sm">{{ post.location }}</span>
    </div>
    <div class="flex flex-col justify-between">
      <p class="p-1 text-center text-white bg-black rounded-lg">{{ post.employmentType }}</p>
      <p class="text-sm">{{ post.applicationDeadline }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  post: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const toDetails = (id) => {
  router.push({ path: `jobs/${id}` })
}
</script>

<style lang="scss" scoped></style>
