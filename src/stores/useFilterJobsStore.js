import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useFilterJobsStore = defineStore('filter-store', () => {
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
// export const useFilterJobsStore = defineStore('filter-store', () => {
//   const location = ref('All-Location')
//   const setLocation = (payload) => {
//     location.value = payload
//   }

//   const experince = ref('Experince-Level')
//   const setExperince = (payload) => {
//     experince.value = payload
//   }

//   const employment = ref('Employment-Type')
//   const setEmployment = (payload) => {
//     employment.value = payload
//   }

//   return {
//     setLocation,
//     setExperince,
//     setEmployment,
//     location,
//     experince,
//     employment
//   }
// })

// export const useFilterJobsStore = defineStore('filter-store', () => {
//   const filters = {
//     location: ref('All-Location'),
//     experience: ref('Experience-Level'),
//     employment: ref('Employment-Type')
//   }

//   const setFilter = (filterName, payload) => {
//     filters[filterName].value = payload
//   }

//   return {
//     filters,
//     setFilter
//   }
// })
