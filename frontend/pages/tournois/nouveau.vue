<script setup lang="ts">
  import { Games, type Tournament } from '~/types/front/Tournament'
  import FormNew from '~/domains/tournois/formNew.vue'
  import { getMessageError } from '~/methods/getMessageError'
  import { toastError, toastSuccess } from '~/methods/toasts'
  import ValidationFooter from '~/components/validationFooter.vue'
  import { z } from 'zod'

  definePageMeta({ middleware: ['auth'] })

  const backend = useBackend()

  const tournament = ref<Tournament>({
    name: '',
    team_count: 2,
    game: '',
    status: 'En cours',
  })

  const isLoading = ref(false)

  const schema = z.object({
    name: z
      .string()
      .min(2, 'Le nom doit faire au moins 2 caractères')
      .max(30, 'Le nom est trop long'),
    game: z.enum(
      [Games.Fortnite, Games.LeagueOfLegends, Games.RocketLeague],
      'Un jeu doit être choisi',
    ),
  })

  async function onSubmit() {
    if (!tournament.value.name?.trim() || !tournament.value.game) return

    isLoading.value = true

    try {
      await backend.postTournament(tournament.value)
      await navigateTo('/tournois')
      toastSuccess('Tournoi créé avec succès!')
    } catch (err: unknown) {
      toastError(getMessageError(err))
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <UForm
    @submit.prevent="onSubmit"
    :schema="schema"
    :state="tournament"
  >
    <UCard class="w-full mx-auto">
      <template #header>
        <h1 class="text-5xl font-bold text-left">Nouveau tournoi</h1>
      </template>
      <template #default>
        <FormNew v-model="tournament" />
      </template>
      <template #footer>
        <ValidationFooter :validate="{ isLoading }" />
      </template>
    </UCard>
  </UForm>
</template>
