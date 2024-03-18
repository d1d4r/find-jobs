import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAt,
  where
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useFilterJobsStore } from '@/stores/useFilterJobsStore'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

export function useJobs() {
  const postState = reactive({
    posts: [],
    post: {},
    jobById: [],
    count: null,
    loading: false,
    error: null
  })
  const route = useRoute()

  const countJobs = async () => {
    const postRef = collection(db, 'Jobs')
    const count = await getCountFromServer(postRef)
    postState.count = count.data().count
  }

  const applyFilters = () => {
    //const { page, ...filters } = route.query
    const queryConstraints = []
    for (const [filterName, filterValue] of Object.entries(filters)) {
      if (
        filterValue !== 'All-Location' &&
        filterValue !== 'Experience-Level' &&
        filterValue !== 'Employment-Type'
      ) {
        queryConstraints.push(where(filterName, '==', filterValue))
      }
    }
    return queryConstraints
  }
  const applyPagination = async (currentPage, currentPageSize) => {
    const startAtDoc =
      currentPage === 1 ? null : await getNthDocBasedOnField(currentPage * currentPageSize - 1)
    return startAtDoc
  }

  const getPosts = async (currentPage, currentPageSize) => {
    postState.loading = true

    if (currentPage < 1 || currentPageSize < 1 || isNaN(currentPage)) {
      throw new Error('Invalid currentPage or currentPageSize. Both must be positive integers.')
    }

    const jobsCollection = collection(db, 'Jobs')
    const { filters } = useFilterJobsStore()
    //console.log("🚀 ~ getPosts ~ filters:", filters)
    const queryConstraints = []
    for (const [filterName, filterValue] of Object.entries(filters)) {
      if (
        filterValue !== 'All-Location' &&
        filterValue !== 'Experience-Level' &&
        filterValue !== 'Employment-Type'
      ) {
        queryConstraints.push(where(filterName, '==', filterValue))
      }
    }

    const startAtDoc = await applyPagination(currentPage, currentPageSize)

    const dublicate = [orderBy('applicationDeadline'), startAt(startAtDoc), limit(currentPageSize)]

    const q =
      queryConstraints.length === 0
        ? query(jobsCollection, ...dublicate)
        : query(jobsCollection, ...queryConstraints, ...dublicate)

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
    postState.loading = false

    //const { page, ...filters } = route.query
  }

  const getPostById = async (id) => {
    const post = await getDoc(doc(collection(db, 'Jobs'), id))
    if (post.exists()) {
      postState.post = post.data()
    } else {
      console.log('No such document!')
      postState.post = {}
    }
  }

  const createPost = async (postData, id) => {
    try {
      await addDoc(collection(db, 'Jobs'), { ...postData, userID: id })
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

  const getNthDocBasedOnField = async (index) => {
    const postRef = collection(db, 'Jobs')
    const q = query(postRef, orderBy('applicationDeadline'), limit(index + 1))

    const snapshot = await getDocs(q)

    if (snapshot.size <= index) {
      return null
    }

    return snapshot.docs[index]
  }

  const getJobsByUserId = async (userID) => {
    const jobsRef = collection(db, 'Jobs')
    const q = query(jobsRef, where('userID', '==', userID))

    const snapshot = await getDocs(q)
    const jobs = []
    snapshot.docs.map((doc) => {
      jobs.push({
        id: doc.id,
        ...doc.data()
      })
    })

    postState.jobById = jobs
  }
  //sub collections
  const applications = async (jobId, data) => {
    try {
      const applicationDoc = collection(db, `Jobs/${jobId}/Applications`)
      const application = await addDoc(applicationDoc, data)
      return application
    } catch (error) {
      console.log('🚀 ~ applications ~ error:', error)
    }
  }

  // onMounted(getPosts)

  return {
    postState,
    countJobs,
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getPostById,
    applications,
    getJobsByUserId
  }
}
