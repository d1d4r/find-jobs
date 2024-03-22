<template>
  <div class="">
    <div class="grid grid-cols-1 grid-rows-1">
      <div class="col-start-1 col-end-1 row-start-1 row-end-1 grayscale">
        <img src="../assets/images/explore.jpeg" />
      </div>
      <div
        class="z-10 col-start-1 col-end-1 row-start-1 row-end-1 m-auto border border-black rounded-md"
      >
        <div class="flex flex-col gap-5">
          <h2 class="p-5 text-2xl font-bold md:text-4xl">
            Start Your Journey. <br />
            Find Your Career Path.
          </h2>
          <RouterLink
            :to="{ name: 'jobs' }"
            class="self-center px-4 py-2 mb-4 text-white bg-black rounded-md hover:bg-gray-800 active:bg-slate-900"
            >explore jobs</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
