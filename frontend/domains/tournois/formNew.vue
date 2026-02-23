<script setup lang="ts">
  import { type Tournament } from '~/types/front/Tournament'
  import FormNewInformation from '~/domains/tournois/formNewInformation.vue'

  const tournament = defineModel<Tournament>({
    default: () =>
      <Tournament>{
        name: '',
        team_count: 2,
      },
  })

  watch(
    () => tournament.value.team_count,
    (newValue) => {
      if (!newValue || newValue < 2) tournament.value.team_count = 2
      if (newValue && newValue > 256) tournament.value.team_count = 256
    },
  )
</script>

<template>
  <div class="space-y-2">
    <UContainer class="border border-gray-800 rounded-2xl !p-3 space-y-2">
      <h2 class="text-xl font-bold text-left">Informations générales</h2>
      <FormNewInformation :tournament="tournament" />
    </UContainer>
    <UContainer class="border border-gray-800 rounded-2xl !p-3 space-y-2">
      <h2 class="text-xl font-bold text-left">Bannière</h2>
      <UFileUpload v-model="tournament.image" />
    </UContainer>
  </div>
</template>
