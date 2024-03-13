<template>
  <nav class="relative border sm:flex">
    <div class="flex justify-between p-3">
      <div class="flex items-center px-2 border">brand-log</div>
      <button
        @click="toggle"
        class="flex flex-col items-center gap-1 p-2 transition-all border active:bg-black group sm:hidden"
      >
        <div
          class="w-8 h-[0.3rem] bg-black rounded-full group-active:bg-white transition-all"
        ></div>
        <div
          class="w-8 h-[0.3rem] bg-black rounded-full group-active:bg-white transition-all"
        ></div>
        <div
          class="w-8 h-[0.3rem] bg-black rounded-full group-active:bg-white transition-all"
        ></div>
      </button>
    </div>
    <div
      class="absolute w-full p-5 bg-white border sm:static sm:w-1/2 sm:m-auto"
      :class="{ 'hidden sm:block': isOpen }"
    >
      <ul class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex flex-col gap-5 sm:flex-row">
          <li><RouterLink :to="{ name: 'jobs' }">jobs</RouterLink></li>
          <li><RouterLink :to="{ name: 'post-job' }" class="">post a job</RouterLink></li>
        </div>
        <li class="">
          <button
            v-if="state.isLoagged"
            @click="auth.logOut"
            class="px-4 py-2 text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900"
          >
            LOG OUT
          </button>
        </li>
        <li :class="{ hidden: state.isLoagged }">
          <RouterLink
            v-if="!state.isLoagged"
            to="/signup"
            class="px-4 py-2 text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900"
          >
            SIGN UP
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import Auth from '@/services/Auth'
import { ref } from 'vue'

const isOpen = ref(true)

const toggle = () => {
  isOpen.value = !isOpen.value
}
const auth = new Auth()
const state = useAuthStore()
</script>

<style scoped></style>
