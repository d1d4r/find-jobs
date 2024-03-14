<template>
  <div class="flex flex-wrap gap-2">
    <input type="text" class="p-5 border rounded-md" placeholder="serach for job posting" />
    <select class="p-2 border rounded-md" v-model="location">
      <option selected value="all-location">all-location</option>
      <option value="Silemani">Silemani</option>
      <option value="Duhok">Duhok</option>
      <option value="Kerkuk">Kerkuk</option>
      <option value="Erbil ">Erbil</option>
    </select>
    <button
      @click="setLocation('Erbil')"
      class="self-center px-4 py-2 text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900"
    >
      SEARCH
    </button>
  </div>
</template>

<script setup>
import { useFilterJobsStore } from '@/stores/useFilterJobsStore'

const { location, setLocation } = useFilterJobsStore()
</script>

<style scoped></style>
