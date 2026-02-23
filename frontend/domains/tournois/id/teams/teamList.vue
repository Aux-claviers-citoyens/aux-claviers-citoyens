<script lang="ts" setup>
  import type { Team } from '~/types/front/Team'
  import TeamListItem from '~/domains/tournois/id/teams/teamListItem.vue'

  interface Props {
    teams: Team[]
  }

  const { isAuthenticated } = useAuthStore()

  const { teams } = defineProps<Props>()
  const isModeView = defineModel<boolean>('isModeView')
  const team = defineModel<Team>('team')
  const isOpenModalTeam = defineModel<boolean>('isOpenModalTeam')

  const onClick = (teamClick: Team) => {
    if (isAuthenticated.value) {
      isOpenModalTeam.value = true
      isModeView.value = true
      team.value = JSON.parse(JSON.stringify(teamClick))
    }
  }
</script>

<template>
  <UCard
    v-for="teamInCard in teams"
    :key="teamInCard.id"
    class="bg-gray-700 flex items-center justify-center"
    @click="onClick(teamInCard)"
  >
    <teamListItem :team="teamInCard" />
  </UCard>
</template>
