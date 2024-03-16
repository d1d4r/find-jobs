<script setup>
import { computed, onMounted, ref } from 'vue'
import { UseOffsetPagination } from '@vueuse/components'
import { useOffsetPagination } from '@vueuse/core'
import { useJobs } from '@/services/firestore/useJobs'
defineProps(['page-size-change','page-change'])

// const { getPosts, postState, countJobs } = useJobs()

// const placesLength = computed(() => postState.count)
// const page = ref(3)
// const pageSize = ref(5)

// const { currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next } =
//   useOffsetPagination({
//     total: placesLength,
//     page: 1,
//     pageSize,
//     onPageChange: fetchData,
//     onPageSizeChange: fetchData
//   })

// async function fetchData({ currentPage, currentPageSize }) {
//   await getPosts(currentPage, currentPageSize)
// }
// onMounted(async () => {
//   countJobs()
//   await getPosts(page.value, pageSize.value)
  
// })

// fetchData({
//   currentPage: page.value,
//   currentPageSize: pageSize.value
// })


//console.log('🚀 ~ pageCount:', placesLength.value)
// const database = ref([])

// for (let i = 0; i < 80; i++) database.value.push({ id: i, name: `user ${i}` })

// // const data = ref([])

// // async function fetch(page, pageSize) {
// //   await getPosts(page, pageSize)
// // }
</script>

<template>
  <UseOffsetPagination
    v-slot="{ currentPage, currentPageSize, next, prev, pageCount, isFirstPage, isLastPage }"
    :total="3"
    @page-change="fetchData"
    @page-size-change="fetchData"
  >
    <div class="gap-x-4 gap-y-2 grid-cols-2 inline-grid items-center">
      <div opacity="50">total:</div>
      <div>{{  }}</div>
      <div opacity="50">pageCount:</div>
      <div>{{ pageCount }}</div>
      <div opacity="50">currentPageSize:</div>
      <div>{{ currentPageSize }}</div>
      <div opacity="50">currentPage:</div>
      <div>{{ currentPage }}</div>
      <div opacity="50">isFirstPage:</div>
      <div>{{ isFirstPage }}</div>
      <div opacity="50">isLastPage:</div>
      <div>{{ isLastPage }}</div>
    </div>
    <div>
      <button :disabled="isFirstPage" @click="prev">prev</button>
      <button :disabled="isLastPage" @click="next">next</button>
    </div>
  </UseOffsetPagination>
</template>
