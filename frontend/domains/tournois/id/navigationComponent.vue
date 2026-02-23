<script lang="ts" setup>
  import type { TabValue } from '~/types/front/Navigation'
  import { items } from '~/types/front/Navigation'
  import MatchesComponent from '~/domains/tournois/id/matches/matchesComponent.vue'
  import type { Team } from '~/types/front/Team'
  import type { Round } from '~/types/front/Round'
  import TeamsComponent from '~/domains/tournois/id/teams/teamsComponent.vue'
  import Rounds from '~/domains/tournois/id/rounds/rounds.vue'
  import type { Match } from '~/types/front/Match'

  type Props = {
    teams: Team[]
    rounds: Round[]
  }

  const { teams, rounds } = defineProps<Props>()
  const isModeView = defineModel<boolean>('isModeView')
  const team = defineModel<Team>('team')
  const isOpenModalTeam = defineModel<boolean>('isOpenModalTeam')
  const matchSelected = defineModel<Match | undefined>('matchSelected', {
    default: undefined,
  })

  const currentTab = defineModel<TabValue>('currentTab', {
    default: items[0]?.value as TabValue,
  })
  const isShowMatchPast = defineModel('isShowMatchPast', { default: true })
</script>

<template>
  <UTabs
    v-model="currentTab"
    :items="items"
    class="text-white"
  >
    <template #progress>
      <Rounds :rounds />
    </template>
    <template #match>
      <MatchesComponent
        v-model:isShowMatchPast="isShowMatchPast"
        v-model:matchSelected="matchSelected"
        :rounds="rounds"
      />
    </template>
    <template #participants>
      <TeamsComponent
        v-model:team="team"
        v-model:isModeView="isModeView"
        v-model:isOpenModalTeam="isOpenModalTeam"
        :teams="teams"
      />
    </template>
  </UTabs>
</template>
