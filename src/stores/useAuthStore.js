import { defineStore } from 'pinia'
import Auth from '@/services/Auth'
import { computed, ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '@/config/firebase'

const auth = getAuth()

export const useAuthStore = defineStore('authStore', () => {
  const user = ref(false)

  const isLoagged = computed(() => !!user.value)

  const setUser = (payload) => {
    user.value = payload
    localStorage.setItem('isLoagged', JSON.stringify(payload))
  }

  const tryLogging = () => {
    if (localStorage.getItem('isLoagged')) {
      user.value = true
    } else {
      user.value = false
    }
  }

  const monitor = () => {
    const users = new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(setUser(user))
        } else {
          //reject()
          setUser(false)
        }
      })
    })
    return users
  }

  return { user, isLoagged, monitor, tryLogging }
})
