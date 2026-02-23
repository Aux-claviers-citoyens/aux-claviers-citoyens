<script setup lang="ts">
  import TeamModalFields from '~/domains/tournois/id/teams/TeamModalFields.vue'
  import TeamModalForm from '~/domains/tournois/id/teams/teamModalForm.vue'
  import type { Team } from '~/types/front/Team'

  type Props = {
    tournamentId: number
    refresh: (tournamentId: number) => Promise<void>
    teams: Team[]
    team: Team
    isModeView: boolean
  }

  defineProps<Props>()
  const form = defineModel<HTMLFormElement>('form')
  const isValid = defineModel<boolean>('isValid')
  const isLoading = defineModel<boolean>('isLoading')
</script>

<template>
  <TeamModalForm
    v-if="!isModeView"
    v-model:form="form"
    v-model:isValid="isValid"
    v-model:isLoading="isLoading"
    :tournamentId="tournamentId"
    :refresh="refresh"
    :team="team"
    :isModeView="isModeView"
    :teams="teams"
  />
  <TeamModalFields
    v-else
    :team
    :isModeView
  />
</template>
