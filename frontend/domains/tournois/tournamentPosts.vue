<script setup lang="ts">
  import TournamentPost from '~/domains/tournois/tournamentPost.vue'
  import type { Games, Tournament } from '~/types/front/Tournament'

  interface Props {
    tournaments: Tournament[]
    filterGame: Games | null
    filterName: string
  }
  const props = defineProps<Props>()

  const filteredTournaments = computed(() =>
    props.tournaments.filter(
      (tournament) =>
        (!props.filterName ||
          tournament.name
            .toUpperCase()
            .includes(props.filterName.toUpperCase())) &&
        (!props.filterGame || tournament.game === props.filterGame) &&
        tournament.status !== 'Archivé',
    ),
  )
</script>

<template>
  <div class="content-center">
    <h2 class="text-5xl text-center font-bold pb-2 sm:pb-5 md:pb-8 lg:pb-10">
      Tournois
    </h2>
    <UBlogPosts class="flex flex-col gap-3 lg:gap-y-4">
      <TournamentPost
        v-for="tournament in filteredTournaments"
        :key="tournament.id"
        :tournament="tournament"
      />
    </UBlogPosts>
  </div>
</template>
