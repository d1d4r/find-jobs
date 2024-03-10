import { defineStore } from 'pinia'
import Auth from '@/services/Auth'

const auth = new Auth()

export const useAuthStore = defineStore('authStore', () => {
  const monitorState = () => {
    const x = auth.monitorUserState()
    console.log('🚀 ~ monitorState ~ x:', x)
  }
})
