<template>
  <div class="container px-4 py-8 mx-auto">
    <h1 class="mb-4 text-3xl font-bold">Job Details</h1>

    <div class="flex flex-wrap gap-4 mb-4">
      <div class="w-full">
        <span class="text-lg font-medium">Job Title:</span>
        <span class="font-bold">{{ poststate.post.jobTitle }}</span>
      </div>
      <div class="w-full">
        <span class="text-lg font-medium">Location:</span>
        <span class="font-bold">{{ poststate.post.location }}</span>
      </div>
      <div class="w-full">
        <span class="text-lg font-medium">Employment Type:</span>
        <span class="font-bold">{{ poststate.post.employmentType }}</span>
      </div>
      <div class="w-full">
        <span class="text-lg font-medium">Experience Level:</span>
        <span class="font-bold">{{ poststate.post.experienceLevel }}</span>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="space-y-2">
        <h2 class="text-xl font-medium">Job Description</h2>
        <p>{{ poststate.post.description }}</p>
      </div>
      <div>
        <h2 class="text-xl font-medium">Skills Required</h2>
        <ul class="space-y-1 list-disc">
          <li v-for="skill in poststate.post.skills?.split(',')" :key="skill">
            {{ skill }}
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-medium">Tags</h2>
        <ul class="space-y-1 list-disc">
          <li v-for="tag in poststate.post.tags?.split(',')" :key="tag">{{ tag }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-medium">Base Salary</h2>
        <p>{{ poststate.post.basedSalary }}$</p>
      </div>
      <div>
        <h2 class="text-xl font-medium">Application Deadline</h2>
        <p>{{ poststate.post.applicationDeadline }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Post from '@/services/firestore/Post'
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const post = new Post()
const route = useRoute()
const { id } = route.params

const poststate = reactive({
  post: {},
  loading: false
})

// const formmatData = (data) => {
//   const newData = []

//   for (const key in data) {
//     if (data[key].includes(',')) {
//       const keyToarray = data[key].split(',')
//       newData.push({
//         key: keyToarray
//       })

//     }
//   }
//   console.log('🚀 ~ formmatData ~ newData:', newData)
// }

const getPostById = async () => {
  poststate.post = await post.getPostById(id)
}

onMounted(async () => {
  await getPostById()
})
</script>

<style lang="scss" scoped></style>
