import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import { getUserById } from './userService'
import { useFilterJobsStore } from '@/stores/useFilterJobsStore'

export const countJobs = async () => {
  const postRef = collection(db, 'Jobs')
  const count = await getCountFromServer(postRef)
  return count.data().count
}

export const applyFilters = () => {
  const { filters } = useFilterJobsStore()
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

export const applyPagination = async (currentPage, currentPageSize) => {
  const startAtDoc =
    currentPage === 1 ? null : await getNthDocBasedOnField(currentPage * currentPageSize - 1)
  return startAtDoc
}
export const getPostsService = async (currentPage) => {
  const currentPageSize = 5
  if (currentPage < 1 || currentPageSize < 1 || isNaN(currentPage)) {
    throw new Error('Invalid currentPage or currentPageSize. Both must be positive integers.')
  }

  const jobsCollection = collection(db, 'Jobs')

  const queryConstraints = applyFilters()

  const startAtDoc = await applyPagination(currentPage, currentPageSize)

  const dublicate = [orderBy('applicationDeadline'), startAt(startAtDoc), limit(currentPageSize)]

  const q =
    queryConstraints.length === 0
      ? query(jobsCollection, ...dublicate)
      : query(jobsCollection, ...queryConstraints, ...dublicate)

  return q
}

export const getPostById = async (id) => {
  const post = await getDoc(doc(collection(db, 'Jobs'), id))
  if (post.exists()) {
    const postData = post.data()
    const userData = await getUserById(post.data().userID)
    return { userData, postData }
  } else {
    console.log('No such document!')
    return {}
  }
}

export const createPost = async (postData, id) => {
  try {
    await addDoc(collection(db, 'Jobs'), { ...postData, userID: id })
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

// const updatePost = async (postId, postData) => {
//   // await updateDoc(doc(db, 'Posts', postId), postData)
// }

// const deletePost = async (postId) => {
//   //await deleteDoc(doc(db, 'Posts', postId))
// }

export const getNthDocBasedOnField = async (index) => {
  const postRef = collection(db, 'Jobs')
  const q = query(postRef, orderBy('applicationDeadline'), limit(index + 1))

  const snapshot = await getDocs(q)

  if (snapshot.size <= index) {
    return null
  }

  return snapshot.docs[index]
}

export const getJobsByUserId = async (userID) => {
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

  return jobs
}

//sub collections
export const applications = async (jobId, data) => {
  try {
    const applicationRef = collection(db, `Jobs/${jobId}/Applications`)
    const application = await addDoc(applicationRef, data)
    return application
  } catch (error) {
    console.log('🚀 ~ applications ~ error:', error)
  }
}

export const getApplicationsCandidates = async (jobId) => {
  const applicationRef = collection(db, `Jobs/${jobId}/Applications`)
  const snapShot = await getDocs(applicationRef)
  const candidates = []
  snapShot.docs.map((doc) => {
    candidates.push({
      id: doc.id,
      ...doc.data()
    })
  })
  return candidates
}
