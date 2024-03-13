<template>
  <div class="p-2 bg-black">
    <h2 class="flex items-center justify-center h-40 text-3xl text-white">120 jobs found</h2>
  </div>
  <div class="flex justify-center mt-[-2rem] bg-white m-8 rounded-lg border p-2">
    <div class="flex flex-wrap gap-2">
      <input type="text" class="p-5 border rounded-md" placeholder="serach for job posting" />
      <select class="p-2 border rounded-md" v-model="location">
        <option selected value="all-location">all-location</option>
        <option value="suli">suli</option>
        <option value="ebil">ebil</option>
        <option value="dhok">dhok</option>
      </select>
      <button
        @click="search"
        class="self-center px-4 py-2 text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900"
      >
        SEARCH
      </button>
    </div>
  </div>
  <div class="flex flex-col w-full p-5 m-auto space-y-1 border md:w-1/2">
    <span class="self-start pb-5 text-2xl">job listing</span>

    <JobCard :post="post" v-for="post in postState.posts" :key="post.id" />
  </div>
</template>

<script setup>
import JobCard from '@/components/JobCard.vue'
import { onMounted, onUpdated, reactive, ref } from 'vue'
import Post from '@/services/firestore/Post'
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore'
import app from '@/config/firebase'

const db = getFirestore(app)
const post = new Post()
const postState = reactive({
  posts: [],
  loading: false,
  error: null
})

const location = ref('all-location')

const search = () => {
  console.log('🚀 ~ location:', location.value)
}
// const getPosts = async () => {
//   try {
//     postState.loading = true
//     const posts = await post.getPosts()
//     console.log('🚀 ~ getPosts ~ posts:', posts)

//     postState.posts = posts
//   } catch (error) {
//     console.log('🚀 ~ onMounted ~ error:', error)
//   } finally {
//     post.loading = false
//   }
// }

const getPosts = async () => {

  const postCollection = collection(db, 'Posts')
  let filterData
  if (location.value === 'all-location') {
    filterData = null
  } else {
    filterData = where('location', '==', location.value)
  }

  const q = query(postCollection, filterData)

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

onUpdated(async () => {
  await getPosts()
})

onMounted(async () => {
  await getPosts()
  console.log(location.value)
})
</script>

<style lang="scss" scoped></style>
