<template>
  <div class="">
    <div class="p-2 bg-black">
      <h2 class="flex items-center justify-center h-40 text-3xl text-white">
        {{ postState.count }} jobs found
      </h2>
    </div>
    <div class="flex justify-center mt-[-2rem] bg-white m-8 rounded-lg border p-2">
      <FilterJobs :getPosts="getPosts" />
    </div>
    <div class="flex min-h-screen flex-col w-full p-5 m-auto space-y-1 border md:w-1/2">
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
    <div class="flex justify-center my-5 space-x-2 text-xl">
      <!-- <button :disabled="isFirstPage" @click="prev">prev</button> -->
      <button
        class="p-2"
        :class="{ ' text-white bg-black rounded-md': currentPage === item }"
        v-for="item in pageCount"
        :key="item"
        :disabled="currentPage === item"
        @click="
          () => {
            itemTop(item)
            currentPage = item
          }
        "
      >
        {{ item }}
      </button>
      <!-- <button :disabled="isLastPage" @click="next">next</button> -->
    </div>
  </div>
</template>

<script setup>
import JobCard from '@/components/JobCard.vue'
//import PaginationJobs from '@/components/PaginationJobs.vue'
import FilterJobs from '@/components/FilterJobs.vue'
import { onMounted, computed, ref, onUpdated } from 'vue'
import { useJobs } from '@/services/firestore/useJobs'
import { useRoute, useRouter } from 'vue-router'
import { useOffsetPagination } from '@vueuse/core'
//import { UseOffsetPagination } from '@vueuse/components'

const { getPosts, postState, countJobs } = useJobs()
const route = useRoute()
const router = useRouter()
const placesLength = computed(() => postState.count)
const page = ref(route.query.page)
const pageSize = ref(1)

const { currentPage, pageCount, isFirstPage, isLastPage, prev, next } = useOffsetPagination({
  total: 4,
  page,
  pageSize,
  onPageChange: fetchData,
  onPageSizeChange: fetchData
})

const itemTop = (item) => {
  window.scrollTo(0, 0)
  router.push({
    name: 'jobs',
    query: { page: item }
  })
}

async function fetchData({ currentPage, currentPageSize }) {
  try {
    await getPosts(currentPage, currentPageSize)
  } catch (error) {
    console.log('🚀 ~ fetchData ~ error:', error.message)
  }
}
countJobs()

onMounted(async () => {
  await fetchData({ currentPage: page.value, currentPageSize: pageSize.value })
})

onUpdated(() => {
  //console.log('🚀 ~ currentPage:', currentPage.value)
  // console.log('🚀 ~ onUpdated ~ page updated')
})
</script>

<style lang="scss" scoped></style>
