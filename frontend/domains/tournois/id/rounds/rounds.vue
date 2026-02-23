<script setup lang="ts">
  import type { Round } from '~/types/front/Round'
  import Bracket from 'vue-tournament-bracket'
  import RoundMatchTeamBlock from '~/domains/tournois/id/rounds/roundMatchTeamBlock.vue'
  import type { TeamWithScore } from '~/types/front/Match'
  import RoundName from '~/domains/tournois/id/rounds/roundName.vue'

  type Props = {
    rounds: Round[]
  }
  const props = defineProps<Props>()

  type Player = {
    id: number
    name: TeamWithScore | undefined
    winner?: boolean
  }

  type Players = {
    player1: Player
    player2: Player
  }

  type Games = {
    games: Players[]
  }

  const showRounds = computed(() => {
    let formatRounds: Games[] = []
    props.rounds.forEach((round) => {
      let formaGame: Players[] = []
      round.matches.forEach((match) => {
        const score_one = match.team_one?.score || 0
        const score_two = match.team_two?.score || 0
        formaGame = [
          ...formaGame,
          {
            player1: {
              id: match.team_one?.id ?? 0,
              name: match.team_one,
              winner: score_one >= score_two,
            },
            player2: {
              id: match.team_two?.id ?? 0,
              name: match.team_two,
              winner: score_two >= score_one,
            },
          },
        ]
      })
      formatRounds = [
        ...formatRounds,
        {
          games: formaGame,
        },
      ]
    })
    return formatRounds
  })
</script>

<template>
  <Consultation>
    <RoundName
      :rounds="rounds"
      :length="rounds.length"
    />
    <div class="flex justify-center">
      <Bracket :rounds="showRounds">
        <template #player="{ player }">
          <div class="vtb-player-wrapper">
            <RoundMatchTeamBlock
              :team="player.name"
              :is-winner="player.winner"
              :length="rounds.length"
            />
          </div>
        </template>
      </Bracket>
    </div>
  </Consultation>
</template>
