<script setup lang="ts">
  import type { Tournament } from '~/types/front/Tournament'

  interface Props {
    tournament: Tournament
  }
  const props = defineProps<Props>()

  const registeredTeam = computed(
    () => props.tournament.teams?.filter((team) => !!team.id).length || 0,
  )
  const teamNeeded = computed(() => props.tournament.team_count || 0)

  const isTournamentFinished = computed<boolean>((): boolean => {
    const match = props.tournament.rounds?.at(-1)?.matches[0]
    return match?.team_one?.score! + match?.team_two?.score! > 0
  })
</script>

<template>
  <UBlogPost
    :title="tournament.name"
    :image="`/api/static/tournament-logos/${tournament.logo_path}`"
  >
    <template #description>
      <div class="flex content-start pt-2.5">
        <UButton
          v-if="!isTournamentFinished"
          class="text-white mx-1 bg-blue-500 hover:bg-blue-500/75 active:bg-blue-500/75"
          :to="`/tournois/${tournament.id}`"
        >
          <UIcon
            name="lucide:circle-play"
            class="text-red-500 size-5"
          />
          En cours
        </UButton>
        <UButton
          v-if="isTournamentFinished"
          icon="lucide-circle-check"
          class="text-white mx-1"
          :to="`/tournois/${tournament.id}`"
        >
          Terminé
        </UButton>
        <p>{{ registeredTeam }}/{{ teamNeeded }} Joueurs inscrits</p>
      </div>
    </template>
  </UBlogPost>
</template>
