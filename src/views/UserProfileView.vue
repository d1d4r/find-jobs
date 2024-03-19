<template>
  <div class="border-[5px] overflow-hidden sm:rounded-lg p-6">
    <!-- User Image -->
    <img
      src="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"
      alt="User Avatar"
      class="w-20 h-20 mx-auto mb-4 rounded-full"
    />

    <div class="mb-4">
      <label for="displayName" class="block">Display Name</label>
      <input
        v-model="userState.displayName"
        type="text"
        id="displayName"
        class="p-1 border border-black rounded-md"
      />
    </div>

    <div class="mb-4">
      <label for="bio" class="block">Bio</label>
      <textarea
        v-model="userState.bio"
        id="bio"
        rows="3"
        class="w-full p-2 border border-black rounded-md"
      ></textarea>
    </div>

    <!-- Save Button -->
    <button
      @click="saveProfile"
      class="px-4 py-2 text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900 disabled:bg-slate-400"
    >
      Save
    </button>
    <div class="w-full h-1 my-4 bg-black rounded-full"></div>
    <h2 class="text-4xl">posted jobs</h2>
    <JobCard v-for="post in postState" :post="post" :key="post.id" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { auth } from '@/config/firebase'
import { ref } from 'vue'
import JobCard from '@/components/JobCard.vue'
import { getUserById, updateUser } from '@/services/firestore/userService'
import { getJobsByUserId } from '@/services/firestore/jobService'

const userId = ref(null)

const postState = ref([])
const userState = ref({})

const saveProfile = () => {
  updateUser(userId.value, { displayName: userState.value.displayName, bio: userState.value.bio })
}

onMounted(() => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      userId.value = user.uid
      const x = await getUserById(userId.value)
      userState.value = x
      const y = await getJobsByUserId(userId.value)
      postState.value = y
    }
  })
})
</script>

<style lang="scss" scoped></style>
