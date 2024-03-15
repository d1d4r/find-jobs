import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { db } from '@/config/firebase'
// import { useFilterJobsStore } from '@/stores/useFilterJobsStore'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

export function useJobs() {
  const postState = reactive({
    posts: [],
    count: null,
    loading: false,
    error: null
  })
  const route = useRoute()
  const countJobs = async () => {
    const postRef = collection(db, 'Posts')
    const count = await getCountFromServer(postRef)
    postState.count = count.data().count
  }

  const getPosts = async () => {
    // const state = useFilterJobsStore()

    const jobsCollection = collection(db, 'Posts')

    const queryConstraints = []
    for (const [filterName, filterValue] of Object.entries(route.query)) {
      if (
        filterValue !== 'All-Location' &&
        filterValue !== 'Experience-Level' &&
        filterValue !== 'Employment-Type'
      ) {
        queryConstraints.push(where(filterName, '==', filterValue))
      }
    }

    const q =
      queryConstraints.length === 0
        ? query(jobsCollection)
        : query(jobsCollection, ...queryConstraints)

    onSnapshot(q, (querySnapshot) => {
      const posts = []
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data()
        })
      })
      postState.posts = posts
    })
  }

  const createPost = async (postData) => {
    try {
      await addDoc(collection(db, 'Posts'), postData)
    } catch (error) {
      console.error('Error creating post:', error)
      throw error // Re-throw for error handling in component
    }
  }

  const updatePost = async (postId, postData) => {
    // await updateDoc(doc(db, 'Posts', postId), postData)
  }

  const deletePost = async (postId) => {
    //await deleteDoc(doc(db, 'Posts', postId))
  }

  // onMounted(getPosts)

  return { postState, countJobs, getPosts, createPost, updatePost, deletePost }
}
