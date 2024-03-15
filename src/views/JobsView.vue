<template>
  <div class="min-h-screen">
    <div class="p-2 bg-black">
      <h2 class="flex items-center justify-center h-40 text-3xl text-white">
        {{ postState.count }} jobs found
      </h2>
    </div>
    <div class="flex justify-center mt-[-2rem] bg-white m-8 rounded-lg border p-2">
      <FilterJobs :getPosts="getPosts" />
      <!-- <button @click="getPosts">filter</button> -->
    </div>
    <div class="flex flex-col w-full p-5 m-auto space-y-1 border md:w-1/2">
      <span class="self-start pb-5 text-2xl">job listing</span>
      <template v-if="postState.loading">
        <p class="text-center">Loading jobs...</p>
      </template>
      <template v-else-if="!countJobs">
        <p class="text-center">No jobs available currently.</p>
      </template>
      <template v-else>
        <template v-if="postState.posts.length">
          <JobCard :post="post" v-for="post in postState.posts" :key="post.id" />
        </template>
        <template v-else>
          <p class="text-center">this city No jobs available currently.</p>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import JobCard from '@/components/JobCard.vue'
import FilterJobs from '@/components/FilterJobs.vue'
import { onMounted, onUpdated } from 'vue'
import { useJobs } from '@/services/firestore/useJobs'


const { getPosts, countJobs, postState } = useJobs()

onUpdated(() => {
  console.log('updated')
})


onMounted(async () => {
  //postState.loading = true
  await getPosts()
  await countJobs()
  // postState.loading = false
})
</script>

<style lang="scss" scoped></style>
