<script lang="ts" setup>
  import type { Match } from '~/types/front/Match'

  type Props = {
    match?: Match
  }

  const { match } = defineProps<Props>()

  const scoreDiff = (match?: Match): number => {
    const score1 = match?.team_one?.score ?? 0
    const score2 = match?.team_two?.score ?? 0
    return score1 - score2
  }
</script>

<template>
  <div class="flex flex-row justify-evenly bg-gray-700 rounded-2xl p-3">
    <div class="flex flex-col w-40 items-center">
      <LogoTeam :team="match?.team_one" />
      <p :class="['text-center', { 'text-gray-400': scoreDiff(match) < 0 }]">
        {{ match?.team_one?.name || 'Aucune équipe assignée' }}
      </p>
    </div>
    <div class="flex items-center w-30 justify-between">
      <p
        :class="{
          'text-green-500': scoreDiff(match) > 0,
          'text-gray-400': scoreDiff(match) <= 0,
        }"
      >
        {{
          !match?.team_one
            ? '-'
            : scoreDiff(match) == 0 && match?.team_one?.score == 0
              ? '-'
              : match?.team_one?.score || '0'
        }}
      </p>
      <p class="text-gray-400">:</p>
      <p
        :class="{
          'text-green-500': scoreDiff(match) < 0,
          'text-gray-400': scoreDiff(match) >= 0,
        }"
      >
        {{
          !match?.team_two
            ? '-'
            : scoreDiff(match) == 0 && match?.team_two?.score == 0
              ? '-'
              : match?.team_two?.score || '0'
        }}
      </p>
    </div>
    <div class="flex flex-col w-40 items-center">
      <LogoTeam :team="match?.team_two" />
      <p :class="['text-center', { 'text-gray-400': scoreDiff(match) > 0 }]">
        {{ match?.team_two?.name || 'Aucune équipe assignée' }}
      </p>
    </div>
  </div>
</template>
