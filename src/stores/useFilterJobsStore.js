import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useFilterJobsStore = defineStore('filters', () => {
  const filters = reactive({
    location: 'All-Location',
    experienceLevel: 'Experience-Level',
    employmentType: 'Employment-Type'
  })

  const setFilter = (filterName, payload) => {
    filters[filterName] = payload
  }

  return {
    filters,
    setFilter
  }
})
