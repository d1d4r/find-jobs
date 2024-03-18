<template>
  <div class="container px-4 py-8 mx-auto min-h-screen">
    <div class="my-5 flex justify-between w-1/2">
      <h1 class="mb-4 text-3xl font-bold">Job Details</h1>
      <button
        :disabled="isLoading"
        @click="applyJob"
        class="bg-green-600 disabled:bg-green-200 hover:bg-green-500 active:bg-green-800 w-56 text-white p-2 rounded-md"
      >
        <span v-if="!isLoading">APPLY JOB</span>
        <span v-else>LOADING...</span>
      </button>
    </div>

    <div class="flex flex-wrap gap-4 mb-4">
      <div class="">
        <span class="text-lg font-medium">Job Title: </span>
        <span class="bg-black w-fit text-white p-2 rounded-full">{{
          postState.post.jobTitle
        }}</span>
      </div>
      <div class="">
        <span class="text-lg font-medium">Location: </span>
        <span class="bg-black w-fit text-white p-2 rounded-full">{{
          postState.post.location
        }}</span>
      </div>
      <div class="">
        <span class="text-lg font-medium">Employment Type: </span>
        <span class="bg-black w-fit text-white p-2 rounded-full">{{
          postState.post.employmentType
        }}</span>
      </div>
      <div class="">
        <span class="text-lg font-medium">Experience Level: </span>
        <span class="bg-black w-fit text-white p-2 rounded-full">{{
          postState.post.experienceLevel
        }}</span>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 w-1/2">
      <div>
        <h2 class="text-xl font-medium">Skills Required</h2>
        <ul class="space-y-1">
          <li
            v-for="skill in postState.post.skills?.split(',')"
            :key="skill"
            class="bg-black w-fit text-white p-2 rounded-full"
          >
            {{ skill }}
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-medium">Tags</h2>
        <ul class="space-y-1 list-disc">
          <li
            v-for="tag in postState.post.tags?.split(',')"
            :key="tag"
            class="bg-black w-fit text-white p-2 rounded-full underline"
          >
            #{{ tag }}
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-medium">Base Salary</h2>
        <p class="bg-black w-fit text-white p-2 rounded-full">{{ postState.post.basedSalary }}$</p>
      </div>
      <div>
        <h2 class="text-xl font-medium">Application Deadline</h2>
        <p class="bg-red-600 w-fit text-white p-2 rounded-full">
          {{ postState.post.applicationDeadline }}
        </p>
      </div>
      <div class="space-y-2">
        <h2 class="text-xl font-medium">Job Description</h2>
        <p class="bg-black w-fit text-white p-2 rounded-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ducimus laborum inventore
          quas eos esse aliquam, officia fugiat quaerat veritatis minima sunt? Vel nihil nesciunt
          consequuntur maiores fuga quos ea, tenetur doloribus perspiciatis nulla? Provident
          aspernatur reiciendis enim rem veniam itaque quisquam animi ullam, hic eveniet nesciunt!
          Deleniti cupiditate repellendus, odio repudiandae in officiis nostrum eaque quia id cum
          debitis laboriosam, quis, rem dolor! Quisquam, illo! Laboriosam aliquid accusamus nihil
          earum, illum totam! Nihil natus quasi fugiat quas suscipit, molestias in accusantium
          corporis quam dolorem totam minus libero alias iste temporibus doloremque ipsum excepturi?
          Quos delectus mollitia reiciendis incidunt pariatur.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useJobs } from '@/services/firestore/useJobs'
import { auth } from '@/config/firebase'

const route = useRoute()
const { id } = route.params
const isLoading = ref(false)

const { getPostById, applications, postState } = useJobs()

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

const applyJob = async () => {
  isLoading.value = true
  //await delay(2000)

     await applications(id, { userID: 'OykF86gdN0NQUZTmw85SkF0Yzak1' ,applicationDate: new Date() })

  isLoading.value = false
}
onMounted(async () => {
  await getPostById(id)
})
</script>

<style lang="scss" scoped></style>
