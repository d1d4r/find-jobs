<template>
  <div class="border-[5px] overflow-hidden sm:rounded-lg p-6">
    <!-- User Image -->
    <img
      src="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"
      alt="User Avatar"
      class="rounded-full h-20 w-20 mx-auto mb-4"
    />
    <!-- <div class="mb-4">
      <label for="email" class="block">Email</label>
      <p id="email" class="mt-1 text-sm text-gray-900">{{ user?.email }}</p>
    </div> -->
    <!-- Display Name -->
    <div class="mb-4">
      <label for="displayName" class="block">Display Name</label>
      <input
        v-model="displayName"
        type="text"
        id="displayName"
        class="border-black border rounded-md p-1"
      />
    </div>

    <!-- Email -->

    <!-- Bio -->
    <div class="mb-4">
      <label for="bio" class="block">Bio</label>
      <textarea
        v-model="userState.user.bio"
        id="bio"
        rows="3"
        class="border-black border rounded-md w-full p-2"
      ></textarea>
    </div>

    <!-- Save Button -->
    <button
      @click="saveProfile"
      class="px-4 py-2 text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900 disabled:bg-slate-400"
    >
      Save
    </button>
    <div class="w-full h-1 bg-black rounded-full my-4"></div>
    <h2 class="text-4xl">posted jobs</h2>
    <JobCard v-for="post in postState.jobById" :post="post" :key="post.id" />
  </div>
</template>

<script setup>
import { useUser } from '@/services/firestore/useUsers'
import { useJobs } from '@/services/firestore/useJobs'
import { onMounted, onUpdated } from 'vue'
import { auth } from '@/config/firebase'
import { ref } from 'vue'
import JobCard from '@/components/JobCard.vue'

const { getUserById, userState, updateUser } = useUser()
const { getJobsByUserId, postState } = useJobs()

const userId = ref(null)
const displayName = ref('')
const bio = ref('')

const saveProfile = () => {
  updateUser(userId.value, { displayName: displayName.value, bio: bio.value })
}

onMounted(() => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      userId.value = user.uid
      await getUserById(userId.value)
      await getJobsByUserId(userId.value)
    }
  })
})

onUpdated(() => {
  displayName.value = userState.user.displayName
  bio.value = userState.user.bio
})
</script>

<style lang="scss" scoped></style>
