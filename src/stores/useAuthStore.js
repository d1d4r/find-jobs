import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useRouter } from 'vue-router'
import { createUser as createUserCollection } from '@/services/firestore/userService'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref(false)

  const router = useRouter()
  const isAuthenticated = computed(() => user.value)
  const isLoading = ref(false)
  const userId = ref(null)

  const setUser = (payload) => {
    user.value = payload
  }

  const createUser = async (email, password, displayName) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      const user = credential.user
      await updateProfile(user, { displayName })
      await createUserCollection({ displayName, bio: null }, credential.user.uid)
      return user
    } catch (error) {
      console.log('🚀', error.message)
      throw error
    }
  }

  const signIn = async (email, password) => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      const user = credential.user
      return user
    } catch (error) {
      console.log('🚀', error.message)
      throw error
    }
  }

  const logOut = async () => {
    await signOut(auth)
    router.push({
      path: '/'
    })
  }

  const monitor = () => {
    onAuthStateChanged(auth, (user) => {
      isLoading.value = true
      if (user) {
        setUser(true)
      } else {
        setUser(false)
      }
      isLoading.value = false
    })
  }
  monitor()

  const currentUserId = async () => {
    const currentUserID = auth.currentUser
    if (currentUserID) {
      console.log('🚀 ~ currentUser ~  user.uid:', currentUserID.uid)
      userId.value = currentUserID.uid
      return currentUserID.uid
    }
  }

  currentUserId()
  return { user, isAuthenticated, logOut, signIn, createUser, monitor, currentUserId, userId }
})
