import { ref } from 'vue'
export const useToggle = () => {
  const isOpen = ref(true)

  const toggleOpen = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    toggleOpen
  }
}
