<script setup lang="ts">
  import LoginLeading from '~/domains/login/loginLeading.vue'
  import LoginFooter from '~/domains/login/loginFooter.vue'
  import type { AuthFormField, ButtonProps } from '@nuxt/ui'

  type Props = {
    loading: boolean
    error: string
  }

  const props = defineProps<Props>()

  const fields = ref<AuthFormField[]>([
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Entrer votre email',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Entrer votre mot de passe',
    },
  ])
</script>

<template>
  <UAuthForm
    title="ACC TOURNAMENT"
    :fields="fields"
    class="max-w-md"
    description="Veuillez entrer vos identifiants"
    :submit="{
      label: !props.loading ? 'Se connecter' : '',
      color: 'primary',
      disabled: props.loading,
      loading: props.loading,
    }"
  >
    <template
      #validation
      v-if="props.error"
    >
      <UAlert
        color="error"
        icon="i-lucide-info"
        :title="props.error"
      />
    </template>
    <template #leading>
      <LoginLeading />
    </template>
    <template #footer>
      <LoginFooter />
    </template>
  </UAuthForm>
</template>
