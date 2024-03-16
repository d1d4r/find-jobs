<template>
  <div class="flex items-center justify-center min-h-screen border">
    <form @submit.prevent="submitForm">
      <div class="border flex flex-col size-[30rem] p-4 rounded-md gap-4">
        <label for="name" class="flex flex-col gap-2">
          <span>name:</span>
          <input
            id="name"
            type="text"
            class="p-1 border rounded-md"
            placeholder="enter name"
            v-model="formData.name"
            required
          />
          <!-- <span class="text-sm ">password must be at least 6 charachter</span> -->
          <!-- <span>error</span> -->
        </label>
        <label for="email" class="flex flex-col gap-2">
          <span>email:</span>
          <input
            id="email"
            type="email"
            class="p-1 border rounded-md"
            placeholder="email@example.com"
            v-model="formData.email"
            required
          />
          <span class="text-sm text-red-600">{{ formData.error.emaiAlready }}</span>
        </label>
        <label for="password" class="flex flex-col gap-2">
          <span>password:</span>
          <input
            id="password"
            type="password"
            class="p-1 border rounded-md"
            placeholder="**********"
            v-model="formData.password"
            required
          />
          <span class="text-sm text-red-600">{{ formData.error.weak }}</span>
        </label>

        <button
          :disabled="formData.loading"
          type="submit"
          class="px-4 py-2 text-white bg-black border rounded-md hover:bg-gray-800 active:bg-slate-900 disabled:bg-slate-400"
        >
          <span v-if="!formData.loading">CREATE ACCOUNTE</span>
          <span v-if="formData.loading">LOADING...</span>
        </button>
        <div class="mt-3">
          <span class="pr-2">already have account</span>
          <RouterLink to="/signin" class="text-blue-800 underline">signin</RouterLink>
        </div>
        <span class="text-sm text-red-600">{{ formData.error.manyReq }}</span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import Auth from '@/services/Auth'
import { useRouter } from 'vue-router'

const auth = new Auth()
const router = useRouter()

const formData = reactive({
  name: '',
  email: '',
  password: '',
  loading: false,
  error: {
    weak: null,
    emaiAlready: null,
    manyReq: null
  }
})

const resetFormData = () => {
  formData.name = ''
  formData.email = ''
  formData.password = ''
  formData.loading = false
}

// watch(()=>{

// })
const validationFields = computed(() => {
  if (formData.password.length < 6) {
    return false
  } else if (!formData.email.includes('@')) {
    return false
  } else {
    return true
  }
})

const submitForm = async () => {
  try {
    formData.loading = true
    const user = await auth.createUser(formData.email, formData.password, formData.name)
    router.push({ path: '/' })
    //console.log('🚀 ~ submitForm ~ user:', user)
  } catch (error) {
    switch (error.code) {
      case 'auth/weak-password':
        formData.error.weak = 'password must be at least 6 charachter'
        break
      case 'auth/email-already-in-use':
        formData.error.emaiAlready = 'Email already in use'
        break
      case 'auth/too-many-requests':
        formData.error.manyReq = 'Too many requests'
        break
      case 'auth/network-request-failed':
        formData.error.manyReq = 'failed request'
        break
      default:
        break
    }
  } finally {
    resetFormData()
  }
}
</script>

<style lang="scss" scoped></style>
