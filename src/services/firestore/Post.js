import { db } from '@/config/firebase'
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where
} from 'firebase/firestore'

class Post {
  constructor() {
    this.db = db
  }

  createPost = async (data) => {
    try {
      const Posts = collection(this.db, 'Posts')
      const dofRef = await addDoc(Posts, data)
      //console.log('🚀 ~ Post ~ dofRef:', dofRef)
    } catch (error) {
      console.log('🚀 ~ Post ~ error:', error)
    }
  }

  getPosts = () => {
    const postCollection = collection(this.db, 'Posts')
    const q = query(postCollection, null)

    let allPosts = []
    onSnapshot(q, (querySnapshot) => {
      const posts = []
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data()
        })
      })
      allPosts.push(posts)
      console.log('🚀 ~ Post ~ onSnapshot ~ posts:', posts)
    })

    console.log(allPosts)
    return allPosts
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

  CountJobs = async () => {
    const postRef = collection(this.db, 'Posts')
    const count = await getCountFromServer(postRef)
    return count.data().count
  }
}

export default Post
