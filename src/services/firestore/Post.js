import app from '@/config/firebase'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where
} from 'firebase/firestore'

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

  getPosts = () => {
    const postCollection = collection(this.db, 'Posts')
    const q = query(postCollection, null)

    onSnapshot(q, (querySnapshot) => {
      const posts = []
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data()
        })
      })
    })
  }

  getPostById = async (id) => {
    const post = await getDoc(doc(collection(this.db, 'Posts'), id))
    if (post.exists()) {
      return post.data()
    } else {
      console.log('No such document!')
      return null
    }
  }
}

export default Post
