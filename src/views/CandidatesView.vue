<template>
  <div class="">
    <div class="p-2 bg-black">
      <h2 class="flex items-center justify-center h-40 text-3xl text-white">
        {{ state.count }} candidates found
      </h2>
    </div>
    <div class="flex justify-center mt-[-2rem] bg-white m-8 rounded-lg border p-2">
    <input type="text" class="w-1/2 p-5 border rounded-md " placeholder="serach for candidates" />
  </div>
    <div class="flex flex-col w-full min-h-screen p-5 m-auto space-y-1 border md:w-1/2">
      <span class="self-start pb-5 text-2xl">candidates listing</span>
      <!-- <template v-if="postState.loading">
        <p class="text-center">Loading jobs...</p>
      </template> -->
      <template v-if="!countCandidates">
        <p class="text-center">No candidates available currently.</p>
      </template>
      <template v-else>
        <template v-if="state.candidates.length">
          <CandidateCard
            :candidate="candidate"
            v-for="candidate in state.candidates"
            :key="candidate.id"
          />
        </template>
        <template v-else>
          <p class="text-center">candidate not found</p>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { getAllUsers, countCandidates } from '@/services/firestore/userService'
import { onMounted, reactive } from 'vue'
import CandidateCard from '@/components/CandidateCard.vue'

const state = reactive({
  candidates: [],
  count: null
})
onMounted(async () => {
  state.count = await countCandidates()
  const users = await getAllUsers()
  state.candidates = users
})
</script>

<style lang="scss" scoped></style>
