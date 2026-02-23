<script lang="ts" setup>
  import type { Match } from '~/types/front/Match'

  type Props = {
    match: Match
  }

  defineProps<Props>()

  const scoreDiff = (match?: Match): number => {
    const score1 = match?.team_one?.score ?? 0
    const score2 = match?.team_two?.score ?? 0
    return score1 - score2
  }
</script>

<template>
  <UCard
    :ui="{ body: '!p-2' }"
    class="text-center"
  >
    <span>Résultat</span>
    <div class="flex justify-evenly bg-gray-600 rounded-2xl p-4 mt-3">
      <div class="flex flex-col items-center gap-1">
        <LogoTeam :team="match.team_one" />
        <span>{{ match.team_one!.name }}</span>
      </div>
      <div class="flex justify-between gap-10">
        <span class="flex-1 my-auto">{{
          !match?.team_one
            ? '-'
            : scoreDiff(match) == 0 && match?.team_one?.score == 0
              ? '-'
              : match?.team_one?.score || '0'
        }}</span>
        <img
          alt="Versus"
          class="flex-1 h-20 w-20 my-auto"
          src="/versus.svg"
        />
        <span class="flex-1 my-auto">{{
          !match?.team_two
            ? '-'
            : scoreDiff(match) == 0 && match?.team_two?.score == 0
              ? '-'
              : match?.team_two?.score || '0'
        }}</span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <LogoTeam :team="match.team_two" />
        <span>{{ match.team_two!.name }}</span>
      </div>
    </div>
  </UCard>
</template>
