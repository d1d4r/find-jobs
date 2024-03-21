<template>
  <nav class="relative border sm:flex">
    <div class="flex justify-between p-3">
      <RouterLink to="/" class="flex items-center text-2xl font-bold">find job</RouterLink>

      <button
        @click="toggleOpen"
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
      class="absolute w-full p-5 bg-white border-l border-r sm:static sm:w-1/2 sm:m-auto"
      :class="{ 'hidden sm:block': isOpen }"
    >
      <ul class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <li>
          <RouterLink @click="toggleOpen" :to="{ name: 'profile' }">
            <div
              class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full ring-2 ring-black dark:bg-gray-600"
            >
              <svg
                class="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </RouterLink>
        </li>
        <div class="flex flex-col gap-5 sm:flex-row">
          <li>
            <RouterLink @click="toggleOpen" :to="{ name: 'jobs', query: { page: '1' } }"
              >jobs</RouterLink
            >
          </li>
          <li>
            <RouterLink @click="toggleOpen" :to="{ name: 'post-job' }" class=""
              >post a job</RouterLink
            >
          </li>
          <li>
            <RouterLink @click="toggleOpen" :to="{ name: 'candidates' }" class=""
              >candidates</RouterLink
            >
          </li>
        </div>
        <li>
          <button
            v-if="state.isAuthenticated"
            @click="state.logOut"
            class="px-4 py-2 text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900"
          >
            LOG OUT
          </button>
        </li>

        <li :class="{ hidden: state.isAuthenticated }">
          <button
            class="px-4 py-2 text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900"
          >
            <RouterLink v-if="!state.isAuthenticated" to="/signin"> SIGN IN </RouterLink>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useToggle } from '@/hook/useToggle'
import { useAuthStore } from '@/stores/useAuthStore'

const { isOpen, toggleOpen } = useToggle()

const state = useAuthStore()
</script>

<style scoped></style>
