<template>
  <div class="flex items-center justify-center min-h-screen border">
    <form @submit.prevent="submitForm">
      <div class="border flex flex-col size-[30rem] p-4 rounded-md gap-4">
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
          <span v-if="!formData.loading">SIGN IN</span>
          <span v-if="formData.loading">LOADING...</span>
        </button>
        <div class="mt-3">
          <span class="pr-2">you have not account</span>
          <RouterLink to="/signup" class="text-blue-800 underline">create account</RouterLink>
        </div>
        <span class="text-sm text-red-600">{{ formData.error.manyReq }}</span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()

const { signIn } = useAuthStore()

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
  formData.email = ''
  formData.password = ''
  formData.loading = false
}

const submitForm = async () => {
  try {
    formData.loading = true
    await signIn(formData.email, formData.password)
    router.push({ path: '/' })
    //console.log('🚀 ~ submitForm ~ user:', user)
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-credential':
        formData.error.weak = 'invalid credential'
        break
      case 'auth/invalid-email':
        formData.error.weak = 'invalid email'
        break
      case 'auth/user-not-found':
        formData.error.emaiAlready = 'user not found'
        break
      case 'auth/wrong-password':
        formData.error.manyReq = 'wrong password'
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
