import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import { updateProfile } from 'firebase/auth'
import { auth } from '@/config/firebase'

export const createUser = async (data, id) => {
  try {
    const usersCollection = doc(db, 'Users', id)
    await setDoc(usersCollection, data)
  } catch (error) {
    console.log('🚀 ~ createUser ~ error:', error)
  }
}

export const countCandidates = async () => {
  const postRef = collection(db, 'Users')
  const count = await getCountFromServer(postRef)
  return count.data().count
}

export const getAllUsers = async () => {
  const usersRef = collection(db, 'Users')
  const snapShot = await getDocs(usersRef)
  const users = []

  snapShot.docs.map((doc) => {
    users.push({
      id: doc.id,
      ...doc.data()
    })
  })
  return users
}

export const getUserById = async (id) => {
  try {
    const user = await getDoc(doc(collection(db, 'Users'), id))
    if (user.exists()) {
      return {
        id: user.id,
        ...user.data()
      }
    } else {
      return null
    }
  } catch (error) {
    console.log('🚀 ~ getUserById ~ error:', error)
  }
}

export const updateUser = async (id, data) => {
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
