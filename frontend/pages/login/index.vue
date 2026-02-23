<script setup lang="ts">
  import type { FormSubmitEvent } from '@nuxt/ui'
  import * as zod from 'zod'
  import type { User } from '~/types/front/User'
  import { getMessageError } from '~/methods/getMessageError'
  import LoginForm from '~/domains/login/loginForm.vue'

  definePageMeta({
    layout: 'login',
    middleware: ['guest'],
  })

  const router = useRouter()
  const route = useRoute()
  const auth = useAuthStore()

  const loading = ref(false)
  const error = ref<string>('')

  const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    loading.value = true
    const user: User = event.data
    try {
      await auth.login(user)
      const redirect = (route.query?.redirect as string) || '/'
      await router.push(redirect)
    } catch (err: unknown) {
      error.value = getMessageError(err)
    } finally {
      setTimeout(() => (loading.value = false), 500)
    }
  }
  const schema = zod.object({
    email: zod.email('Email invalide'),
    password: zod
      .string('Mot de passe requis')
      .min(8, 'Le mot de passe doit faire minimum 8 caractères'),
  })
  type Schema = zod.output<typeof schema>
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <UPageCard class="max-w-md w-384">
      <LoginForm
        :loading="loading"
        :error="error"
        :schema="schema"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
