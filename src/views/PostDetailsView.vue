<template>
  <div class="container min-h-screen px-4 py-8 mx-auto">
    <div>
      <h2 class="mb-4 text-3xl font-bold">posted by</h2>
      <p class="p-2 underline border">{{ state.user.displayName }}</p>
    </div>
    <div class="flex justify-between w-full my-5 sm:w-1/2">
      <h2 class="mb-4 text-3xl font-bold">Job Details</h2>
      <button
        :disabled="isLoading"
        @click="applyJob"
        class="w-56 p-2 text-white bg-green-600 rounded-md disabled:bg-green-200 hover:bg-green-500 active:bg-green-800"
      >
        <span v-if="!isLoading">APPLY JOB</span>
        <span v-else>LOADING...</span>
      </button>
    </div>

    <div class="flex flex-wrap gap-4 mb-4">
      <div class="">
        <span class="text-lg font-medium">Job Title: </span>
        <span class="p-2 text-white bg-black rounded-full w-fit">{{ state.post.jobTitle }}</span>
      </div>
      <div class="">
        <span class="text-lg font-medium">Location: </span>
        <span class="p-2 text-white bg-black rounded-full w-fit">{{ state.post.location }}</span>
      </div>
      <div class="">
        <span class="text-lg font-medium">Employment Type: </span>
        <span class="p-2 text-white bg-black rounded-full w-fit">{{
          state.post.employmentType
        }}</span>
      </div>
      <div class="">
        <span class="text-lg font-medium">Experience Level: </span>
        <span class="p-2 text-white bg-black rounded-full w-fit">{{
          state.post.experienceLevel
        }}</span>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <h2 class="text-xl font-medium">Skills Required</h2>
        <ul class="space-y-1">
          <li
            v-for="skill in state.post.skills?.split(',')"
            :key="skill"
            class="p-2 text-white bg-black rounded-full w-fit"
          >
            {{ skill }}
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-medium">Tags</h2>
        <ul class="space-y-1 list-disc">
          <li
            v-for="tag in state.post.tags?.split(',')"
            :key="tag"
            class="p-2 text-white underline bg-black rounded-full w-fit"
          >
            #{{ tag }}
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-medium">Base Salary</h2>
        <p class="p-2 text-white bg-black rounded-full w-fit">{{ state.post.basedSalary }}$</p>
      </div>
      <div>
        <h2 class="text-xl font-medium">Application Deadline</h2>
        <p class="p-2 text-white bg-red-600 rounded-full w-fit">
          {{ state.post.applicationDeadline }}
        </p>
      </div>
      <div class="space-y-2">
        <h2 class="text-xl font-medium">Job Description</h2>
        <p class="p-2 text-white bg-black rounded-md w-fit">
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
import { auth } from '@/config/firebase'
import { reactive } from 'vue'
import { getPostById, applications } from '@/services/firestore/jobService'

const route = useRoute()
const { id } = route.params
const isLoading = ref(false)

const applyJob = async () => {
  isLoading.value = true
  const user = auth.currentUser
  if (user) {
    await applications(id, { userID: user.uid, applicationDate: new Date() })
  }

  isLoading.value = false
}

const state = reactive({
  user: {},
  post: {}
})

onMounted(async () => {
  const { userData, postData } = await getPostById(id)
  state.post = postData
  state.user = userData
})
</script>

<style lang="scss" scoped></style>
