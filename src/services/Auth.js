import app from '@/config/firebase'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth'

export default class Auth {
  constructor() {
    this.auth = getAuth(app)
  }

  monitorUserState = () => {
    onAuthStateChanged(this.auth, (user) => {
      console.log('🚀 ~ Auth ~ onAuthStateChanged ~ user:', user)
      if (user) {
        return true
      } else {
        return false
      }
    })
  }
  
  

  createUser = async (email, password, displayName) => {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password)
      const user = credential.user
      await updateProfile(user, { displayName })
      return user
    } catch (error) {
      console.log('🚀', error.message)
      throw error
    }
  }

  signIn = async (email, password) => {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password)
      const user = credential.user
      return user
    } catch (error) {
      console.log('🚀', error.message)
      throw error
    }
  }

  logOut = async () => {
    await signOut(this.auth)
  }
}
