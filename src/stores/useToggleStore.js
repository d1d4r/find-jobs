import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToggleStore = defineStore('toggle', () => {
  const isOpen = ref(true)

  const toggleOpen = () => {
    isOpen.value = !isOpen.value
  }

  return { isOpen, toggleOpen }
})
