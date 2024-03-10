import app from '@/config/firebase'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'

export default class Auth {
  constructor() {
    this.auth = getAuth(app)
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

  monitorUserState = () => {
    onAuthStateChanged(this.auth, (user) => {
      console.log("🚀 ~ Auth ~ onAuthStateChanged ~ user:", user)
      return user ? true : false
    })
  }
}
