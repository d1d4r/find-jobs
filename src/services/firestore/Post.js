import app from '@/config/firebase'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

class Post {
  constructor() {
    this.db = getFirestore(app)
  }

  createPost = async (data) => {
    try {
      const Posts = collection(this.db, 'Posts')
      const dofRef = await addDoc(Posts, data)
      console.log('🚀 ~ Post ~ dofRef:', dofRef)
    } catch (error) {
      console.log('🚀 ~ Post ~ error:', error)
    }
  }
}

export default Post
