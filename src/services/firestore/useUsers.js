import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { reactive } from 'vue'
import { updateProfile } from 'firebase/auth'
import { auth } from '@/config/firebase'
export const useUser = () => {
  const userState = reactive({
    users: [],
    user: {},
    error: null,
    loading: false
  })
  const createUser = async (data, id) => {
    try {
      const usersCollection = doc(db, 'Users', id)
      await setDoc(usersCollection, data)
    } catch (error) {
      console.log('🚀 ~ createUser ~ error:', error)
    }
  }
  const getUserById = async (id) => {
    try {
      const user = await getDoc(doc(collection(db, 'Users'), id))
      if (user.exists()) {
        userState.user = user.data()
      } else {
        console.log('No such document!')
        userState.users = {}
      }
    } catch (error) {
      console.log('🚀 ~ getUserById ~ error:', error)
    }
  }

  const updateUser = async (id, data) => {
    try {
      const { displayName, bio } = data
      const userDocRef = doc(db, 'Users', id)
      await updateProfile(auth.currentUser, { displayName })

      await updateDoc(userDocRef, {
        displayName,
        bio
      })

    } catch (error) {
      console.log('🚀 ~ updateUser ~ error:', error)
    }
  }

 

  return { userState, createUser, getUserById, updateUser }
}
