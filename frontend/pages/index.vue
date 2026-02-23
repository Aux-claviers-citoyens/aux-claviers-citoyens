<script setup lang="ts">
  import TournamentPosts from '~/domains/tournois/tournamentPosts.vue'
  import TournamentFilter from '~/domains/tournois/tournamentFilter.vue'
  import type { Games, Tournament } from '~/types/front/Tournament'
  import { toastError } from '~/methods/toasts'
  import { getMessageError } from '~/methods/getMessageError'

  const backend = useBackend()
  const isLoading = ref<boolean>(false)
  const tournaments = ref<Tournament[]>([])

  const filterGame = ref<Games | null>(null)

  const filterName = ref<string>('')
  const hasTournaments = computed<boolean>(() => {
    return tournaments.value && tournaments.value.length > 0
  })

  const handleFilterGame = (game: Games | null) => {
    filterGame.value = game
  }

  const handleFilterName = (name: string) => {
    filterName.value = name
  }

  onMounted(async () => {
    try {
      tournaments.value = await backend.getAllTournamentsWithMatches()
    } catch (err: unknown) {
      toastError(getMessageError(err))
    } finally {
      isLoading.value = false
    }
  })
</script>

<template>
  <div class="content-center">
    <TournamentFilter
      @filterGame="handleFilterGame"
      @filterName="handleFilterName"
    />
    <TournamentPosts
      v-if="hasTournaments"
      :tournaments="tournaments"
      :filterGame="filterGame"
      :filterName="filterName"
    />
  </div>
</template>
