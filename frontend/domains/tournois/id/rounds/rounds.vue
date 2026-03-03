<script setup lang="ts">
  import type { Round } from '~/types/front/Round'
  import Bracket from 'vue-tournament-bracket'
  import RoundMatchTeamBlock from '~/domains/tournois/id/rounds/roundMatchTeamBlock.vue'
  import type { TeamWithScore } from '~/types/front/Match'
  import RoundName from '~/domains/tournois/id/rounds/roundName.vue'
  import { checkIfBottom } from '~/methods/checkBottom'
  import { breakpoints } from '~/methods/breakpoints'

  type Props = {
    rounds: Round[]
  }
  const props = defineProps<Props>()

  const isLaptop = breakpoints.greater('lg')

  const isAtBottom = ref(false)

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

  const showRounds = computed<Games[]>(() =>
    props.rounds.map(
      (round) =>
        <Games>{
          games: round.matches.map((match) => {
            const scoreOne = match.team_one?.score ?? 0
            const scoreTwo = match.team_two?.score ?? 0

            return {
              player1: {
                id: match.team_one?.id ?? 0,
                name: match.team_one,
                winner: scoreOne >= scoreTwo,
              },
              player2: {
                id: match.team_two?.id ?? 0,
                name: match.team_two,
                winner: scoreTwo >= scoreOne,
              },
            }
          }),
        },
    ),
  )

  const setIsAtBottom = () => (isAtBottom.value = checkIfBottom())

  onMounted(() => {
    window.addEventListener('scroll', setIsAtBottom)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', setIsAtBottom)
  })
</script>

<template>
  <div
    class="w-full"
    :class="`overflow-${isAtBottom && !isLaptop ? 'auto' : 'hidden'} ${isLaptop ? '' : 'max-h-[70vh]'}`"
  >
    <Consultation class="w-full">
      <div class="w-fit">
        <RoundName
          :rounds="rounds"
          :length="rounds.length"
          class="w-full sticky top-0 z-20 bg-slate-900 pb-2"
        />
        <div class="flex justify-center w-fit">
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
      </div>
    </Consultation>
  </div>
</template>
