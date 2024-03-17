import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
export const useUser = () => {
  const createUser = async (data, id) => {
    try {
      const usersCollection = doc(db, 'Users', id)
      await setDoc(usersCollection, data)
    } catch (error) {
      console.log('🚀 ~ createUser ~ error:', error)
    }
  }

  return { createUser }
}
