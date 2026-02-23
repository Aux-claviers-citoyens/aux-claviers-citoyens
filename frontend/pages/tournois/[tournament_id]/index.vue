<script lang="ts" setup>
  import type { Tournament } from '~/types/front/Tournament'
  import type { Team } from '~/types/front/Team'
  import TournamentComponent from '~/domains/tournois/id/tournamentComponent.vue'
  import NavigationComponent from '~/domains/tournois/id/navigationComponent.vue'
  import MatchesModal from '~/domains/tournois/id/matches/modal/matchesModal.vue'
  import type { TabValue } from '~/types/front/Navigation'
  import TeamModal from '~/domains/tournois/id/teams/teamModal.vue'
  import type { Match } from '~/types/front/Match'
  import { toastError } from '~/methods/toasts'
  import { getMessageError } from '~/methods/getMessageError'

  const backend = useBackend()
  const route = useRoute()
  const tournamentId = computed<number>(() =>
    Number(route.params.tournament_id),
  )

  const tournament = ref<Tournament | null>()
  const teams = ref<Team[]>([])

  const loadTournament = async (tournamentId: number): Promise<void> => {
    try {
      tournament.value =
        await backend.getTournamentByIdWithMatches(tournamentId)
      teams.value = await backend.getAllTeam(tournamentId)
      if (tournament.value.team_count === teams.value.length)
        isOpenModalTeam.value = false
      match.value = undefined
    } catch (error: unknown) {
      toastError(getMessageError(error))
    }
  }

  const isOpenModalTeam = ref(false)
  const isModalTeamModeView = ref(false)
  const modalTeam = ref<Team>({
    name: '',
  })
  const match = ref<Match | undefined>(undefined)
  const currentTab = ref<TabValue>('match')
  const isMatchesPast = ref(true)
  const closeModalMatch = (): void => (match.value = undefined)

  watch(
    tournamentId,
    (newId) => {
      if (newId && newId > 0) loadTournament(newId)
    },
    {
      immediate: true,
    },
  )
</script>

<template>
  <TournamentComponent
    v-if="tournament"
    v-model:isOpenModalTeam="isOpenModalTeam"
    v-model:isModeView="isModalTeamModeView"
    v-model:team="modalTeam"
    v-model:match="match"
    :currentTab="currentTab"
    :loadTournament="loadTournament"
    :isMatchesPast="isMatchesPast"
    :teams="teams"
    :tournament="tournament"
  >
    <template #navigation>
      <NavigationComponent
        v-if="teams && tournament.rounds"
        v-model:currentTab="currentTab"
        v-model:isShowMatchPast="isMatchesPast"
        v-model:isOpenModalTeam="isOpenModalTeam"
        v-model:isModeView="isModalTeamModeView"
        v-model:team="modalTeam"
        v-model:matchSelected="match"
        :rounds="tournament.rounds"
        :teams="teams"
      />
    </template>
  </TournamentComponent>
  <MatchesModal
    v-if="tournament && match"
    v-model:match="match"
    :loadTournament="loadTournament"
    :tournament="tournament"
    :closeModal="closeModalMatch"
  />
  <TeamModal
    v-model:isOpenModal="isOpenModalTeam"
    v-model:isModeView="isModalTeamModeView"
    v-model:team="modalTeam"
    :refresh="loadTournament"
    :tournamentId="tournament?.id!"
    :teams="teams"
  />
</template>
