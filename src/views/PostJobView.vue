<template>
  <div class="container p-4 mx-auto">
    <h1 class="mb-4 text-2xl font-bold">Job Posting Form</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="jobTitle" class="block mb-2 font-bold">Job Title:</label>
        <input
          required
          placeholder="write title or position job"
          v-model="formData.jobTitle"
          type="text"
          id="jobTitle"
          class="w-full px-3 py-2 leading-tight border border-black rounded appearance-none"
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block mb-2 font-bold">Description:</label>
        <textarea
          required
          placeholder="write simple description about position or job"
          v-model="formData.description"
          id="description"
          rows="5"
          class="w-full px-3 py-2 leading-tight border border-black rounded appearance-none"
        ></textarea>
      </div>
      <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <div>
          <label for="requirements" class="block mb-2 font-bold">Requirements:</label>
          <textarea
            required
            placeholder="write requirements for qualicaed canditate"
            v-model="formData.requirements"
            id="requirements"
            rows="3"
            class="w-full px-3 py-2 leading-tight border border-black rounded appearance-none"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="location" class="block mb-2 font-bold">location:</label>
          <select
            required
            v-model="formData.location"
            id="location"
            class="w-full px-3 py-2 leading-tight border border-black rounded appearance-none"
          >
            <option value="" selected disabled hidden>location</option>
            <option value="Silemani">Silemani</option>
            <option value="Duhok">Duhok</option>
            <option value="Kerkuk">Kerkuk</option>
            <option value="Erbil">Erbil</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <div>
          <label for="basedSalary" class="block mb-2 font-bold">Base Salary:</label>
          <input
            placeholder="write base salary $"
            required
            v-model="formData.basedSalary"
            type="number"
            id="basedSalary"
            class="w-full px-3 py-2 leading-tight border border-black rounded appearance-none"
          />
        </div>
        <div>
          <label for="skills" class="block mb-2 font-bold">Skills (comma separated):</label>
          <input
            placeholder="example js,frontend,api"
            required
            v-model="formData.skills"
            type="text"
            id="skills"
            class="w-full px-3 py-2 leading-tight border border-black rounded appearance-none"
          />
        </div>
      </div>
      <div class="mb-4">
        <label for="employmentType" class="block mb-2 font-bold">Employment Type:</label>
        <select
          required
          v-model="formData.employmentType"
          id="employmentType"
          class="w-full px-3 py-2 leading-tight border border-black rounded appearance-none"
        >
          <option value="" selected disabled hidden>Select Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="experienceLevel" class="block mb-2 font-bold">Experience Level:</label>
        <select
          required
          v-model="formData.experienceLevel"
          id="experienceLevel"
          class="w-full px-3 py-2 leading-tight border border-black rounded appearance-none"
        >
          <option value="" selected disabled hidden>Select Level</option>
          <option value="Entry Level">Entry Level</option>
          <option value="Mid Level">Mid Level</option>
          <option value="Senior Level">Senior Level</option>
        </select>
      </div>
      <!-- <div class="mb-4">
        <label for="postedDate" class="block mb-2 font-bold text-gray-700">Posted Date:</label>
        <input v-model="postedDate" type="date" id="postedDate" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" required>
        <div v-if="errors.postedDate" class="mt-1 text-xs text-red-500">{{ errors.postedDate }}</div> 
      </div> -->
      <div class="mb-4">
        <label for="applicationDeadline" class="block mb-2 font-bold">Application Deadline:</label>
        <input
          required
          v-model="formData.applicationDeadline"
          type="date"
          id="applicationDeadline"
          class="w-full px-3 py-2 leading-tight border border-black rounded"
        />
        <!-- <div v-if="errors.applicationDeadline" class="mt-1 text-xs text-red-500">{{ errors.applicationDeadline }}</div> -->
      </div>
      <div class="mb-4">
        <label for="tags" class="block mb-2 font-bold">Tags/Keywords (comma separated):</label>
        <input
          placeholder="react,js,c# ..."
          required
          v-model="formData.tags"
          type="text"
          id="tags"
          class="w-full px-3 py-2 leading-tight border border-black rounded appearance-none"
        />
      </div>
      <div class="flex items-center justify-center gap-2 p-5">
        <button
          :disabled="isLoading"
          class="px-4 py-2 text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900 disabled:bg-slate-400"
          type="submit"
        >
          <span v-if="!isLoading">POST</span>
          <span v-if="isLoading">LOADING...</span>
        </button>
        <button class="px-4 py-2 text-black bg-white border border-black rounded-md" type="submit">
          CANCEL
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import Post from '@/services/firestore/Post'
import { useJobs } from '@/services/firestore/useJobs'

const post = new Post()
const { createPost } = useJobs()
const isLoading = ref(false)

const formData = reactive({
  jobTitle: '',
  description: '',
  requirements: '',
  location: '',
  basedSalary: '',
  skills: '',
  employmentType: '',
  experienceLevel: '',
  applicationDeadline: '',
  tags: ''
})

const submitForm = async () => {
  try {
    isLoading.value = true
    //await post.createPost(formData)
    await createPost(formData)
  } catch (error) {
    console.log('🚀 ~ submitForm ~ error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
