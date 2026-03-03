<script setup lang="ts">
  import type { TeamWithScore } from '~/types/front/Match'
  import { toastError } from '~/methods/toasts'
  import { getMessageError } from '~/methods/getMessageError'
  import Leaderboard from '~/domains/leaderboard/leaderboard.vue'

  const backend = useBackend()

  const unsortedTeams = ref<TeamWithScore[]>([])
  const globalFilter = ref('')

  const loadTeams = async () => {
    try {
      unsortedTeams.value = (await backend.getAllTournamentsWithMatches())
        .filter((tournament) => tournament.status !== 'Archivé')
        .flatMap((tournaments) =>
          tournaments.teams!.filter((team) => team?.name),
        )
    } catch (error: unknown) {
      toastError(getMessageError(error))
    }
  }

  onMounted(async () => await loadTeams())
</script>

<template>
  <div>
    <h2 class="text-5xl text-center font-bold mb-12">
      Leaderboard des équipes
    </h2>
    <div
      class="w-full space-y-4 pb-4 border border-accented rounded-lg bg-black"
    >
      <div class="flex px-4 py-3.5 border-b border-accented">
        <UInput
          v-model="globalFilter"
          class="max-w-sm"
          placeholder="Recherche..."
        >
          <template #leading>
            <UIcon
              name="mdi-magnify"
              class="text-neutral-500 size-6"
            />
          </template>
        </UInput>
      </div>
      <Leaderboard
        :unsortedTeams="unsortedTeams"
        v-model:globalFilter="globalFilter"
      />
    </div>
  </div>
</template>
