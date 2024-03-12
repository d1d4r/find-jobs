<template>
  <div class="">
    <div class="p-2 bg-black">
      <h2 class="flex items-center justify-center h-40 text-3xl text-white">120 jobs found</h2>
    </div>
    <div class="flex justify-center mt-[-2rem] bg-white m-8 rounded-lg border p-2">
      <div class="flex flex-wrap gap-2">
        <input type="text" class="p-5 border rounded-md" placeholder="serach for job posting" />
        <select class="p-2 border rounded-md">
          <option selected disabled hidden>select location</option>
          <option value="suli">suli</option>
          <option value="ebl">erbil</option>
          <option value="dhok">dhok</option>
        </select>
        <button
          class="self-center px-4 py-2 text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900"
        >
          SEARCH
        </button>
      </div>
    </div>
    <div class="flex flex-col w-full p-5 m-auto space-y-1 border md:w-1/2">
      <span class="self-start pb-5 text-2xl ">job listing</span>
      <div v-for="i in 10" :key="i" class="flex gap-2 p-3 border">
      <JobCard />
    </div>
    </div>
  </div>
</template>

<script setup>
import JobCard from '@/components/JobCard.vue'
</script>

<style lang="scss" scoped></style>
