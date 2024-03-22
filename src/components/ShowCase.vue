<template>
  <div class="container py-12 mx-auto">
    <section class="mb-12">
      <h2 class="mb-6 text-3xl font-bold">Testimonials</h2>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="p-6 bg-white border border-black rounded-lg"
        >
          <p class="text-lg">{{ testimonial.message }}</p>
          <p class="mt-4">- {{ testimonial.name }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const testimonials = [
  {
    name: 'John Doe',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce placerat arcu eget mi consectetur, sit amet laoreet nisl ullamcorper.'
  },
  {
    name: 'Jane Smith',
    message:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
  },
  {
    name: 'John Smith',
    message:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
  }
]
</script>


