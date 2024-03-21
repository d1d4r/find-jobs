<template>
  <div class="min-h-screen">
    <div class="grid grid-cols-1 grid-rows-1">
      <div class="col-start-1 col-end-1 row-start-1 row-end-1 grayscale">
        <img src="../assets/images/explore.jpeg" />
      </div>
      <div class="z-50 col-start-1 col-end-1 row-start-1 row-end-1 p-5 m-auto border border-black rounded-md">
        <div class="flex flex-col gap-5">
          <h2 class="text-4xl font-bold">Start Your Journey. Find Your Career Path.</h2>
          <RouterLink
            :to="{ name: 'jobs' }"
            class="self-center px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 active:bg-slate-900"
            >explore jobs</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
