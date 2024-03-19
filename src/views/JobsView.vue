<template>
  <div class="">
    <div class="p-2 bg-black">
      <h2 class="flex items-center justify-center h-40 text-3xl text-white">
        {{ postState.count }} jobs found
      </h2>
    </div>
    <div class="flex justify-center mt-[-2rem] bg-white m-8 rounded-lg border p-2">
      <FilterJobs :getPostsService="getPostsService" />
    </div>
    <div class="flex flex-col w-full min-h-screen p-5 m-auto space-y-1 border md:w-1/2">
      <span class="self-start pb-5 text-2xl">job listing</span>
      <!-- <template v-if="postState.loading">
        <p class="text-center">Loading jobs...</p>
      </template> -->
      <template v-if="!countJobs">
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
      <!-- <button
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
      </button> -->
      <!-- <button :disabled="isLastPage" @click="next">next</button> -->
    </div>
  </div>
</template>

<script setup>
import JobCard from '@/components/JobCard.vue'
import FilterJobs from '@/components/FilterJobs.vue'
import { onMounted, computed, ref, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOffsetPagination } from '@vueuse/core'
import { getPostsService, countJobs } from '@/services/firestore/jobService'
import { reactive } from 'vue'
import { onSnapshot } from 'firebase/firestore'
import { useFilterJobsStore } from '@/stores/useFilterJobsStore'

const { filters } = useFilterJobsStore()
const route = useRoute()
const router = useRouter()
const placesLength = computed(() => postState.count)
const page = ref(route.query.page)
const pageSize = ref(4)

// const { currentPage, pageCount, isFirstPage, isLastPage, prev, next } = useOffsetPagination({
//   total: 4,
//   page,
//   pageSize,
//   onPageChange: fetchData,
//   onPageSizeChange: fetchData
// })

const itemTop = (item) => {
  window.scrollTo(0, 0)
  router.push({
    name: 'jobs',
    query: { page: item }
  })
}

const postState = reactive({
  posts: [],
  post: {},
  jobById: [],
  count: null,
  loading: false,
  error: null
})
let unsubscribe

async function fetchData({ currentPage, currentPageSize }) {
  try {
    // await fetchJobs(currentPage, currentPageSize)
  } catch (error) {
    console.log('🚀 ~ fetchData ~ error:', error.message)
  }
}
const fetchJobs = async () => {
  try {
    const q = await getPostsService(1)

    unsubscribe = onSnapshot(q, (querySnapshot) => {
      const jobs = []
      querySnapshot.forEach((doc) => {
        jobs.push({ id: doc.id, ...doc.data() })
      })
      postState.posts = jobs
    })
  } catch (error) {
    console.error('Error fetching jobs:', error)
  }
}
onMounted(async () => {
  const count = await countJobs()
  postState.count = count
  fetchJobs()

  //await fetchData({ currentPage: page.value, currentPageSize: pageSize.value })
})

watch(filters, () => {
  fetchJobs()
})

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})
</script>

<style lang="scss" scoped></style>
