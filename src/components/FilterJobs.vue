<template>
  <div class="flex flex-wrap justify-center gap-2">
    <input type="text" class="p-5 border rounded-md" placeholder="serach for job posting" />
    <select class="p-2 border rounded-md" v-model="location">
      <option selected value="All-Location">All-Location</option>
      <option value="Silemani">Silemani</option>
      <option value="Duhok">Duhok</option>
      <option value="Kerkuk">Kerkuk</option>
      <option value="Erbil">Erbil</option>
    </select>
    <select class="p-2 border rounded-md" v-model="experince">
      <option selected value="Experience-Level">Experience-Level</option>
      <option value="Entry Level">Entry Level</option>
      <option value="Mid Level">Mid Level</option>
      <option value="Senior Level">Senior Level</option>
    </select>
    <select class="p-2 border rounded-md" v-model="employment">
      <option selected value="Employment-Type">Employment-Type</option>
      <option value="Full Time">Full Time</option>
      <option value="Part Time">Part Time</option>
      <option value="Contract">Contract</option>
    </select>
    <button
      @click="getPosts"
      class="self-center px-4 py-2 text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900"
    >
      SEARCH
    </button>
    <button
      @click="cleanFilters"
      class="self-center px-4 py-2 text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900"
    >
      clean Filters
    </button>
  </div>
</template>

<script setup>
import { useFilterJobsStore } from '@/stores/useFilterJobsStore'
import { onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useJobs } from '@/services/firestore/useJobs'

const props = defineProps({
  getPosts: {
    type: Function,
    reqierd: true
  }
})

// const route = useRoute()
const router = useRouter()
const { getPosts: getPost } = useJobs()

let { setFilter } = useFilterJobsStore()
const location = ref('All-Location')
const experince = ref('Experience-Level')
const employment = ref('Employment-Type')

// const pushQuery = () => {
//   router.push({
//     name: 'jobs',
//     query: {
//       location: location.value,
//       experienceLevel: experince.value,
//       employmentType: employment.value
//     }
//   })
// }

const cleanFilters = () => {
  router.push({
    name: 'jobs',
    query: {}
  })

  location.value = 'All-Location'
  experince.value = 'Experience-Level'
  employment.value = 'Employment-Type'
}

onUpdated(() => {
  router.push({
    name: 'jobs',
    query: {
      location: location.value,
      experienceLevel: experince.value,
      employmentType: employment.value
    }
  })

  // getPosts()
})
</script>

<style scoped></style>
