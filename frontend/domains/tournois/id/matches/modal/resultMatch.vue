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
    <div
      class="grid grid-cols-3 bg-gray-600 rounded-2xl py-4 mt-3 text-lg sm:text-xl md:text-2xl"
    >
      <div class="flex flex-col items-center gap-1 m-auto">
        <LogoTeam
          :team="match.team_one"
          class="h-10 w-10 sm:h-20 sm:w-20"
        />
        <span>{{ match.team_one!.name }}</span>
      </div>
      <div class="grid grid-cols-[1fr_4fr_1fr]">
        <span class="my-auto">{{
          !match?.team_one
            ? '-'
            : scoreDiff(match) == 0 && match?.team_one?.score == 0
              ? '-'
              : match?.team_one?.score || '0'
        }}</span>
        <img
          alt="Versus"
          class="h-10 w-10 sm:h-20 sm:w-20 m-auto"
          src="/versus.svg"
        />
        <span class="my-auto">{{
          !match?.team_two
            ? '-'
            : scoreDiff(match) == 0 && match?.team_two?.score == 0
              ? '-'
              : match?.team_two?.score || '0'
        }}</span>
      </div>
      <div class="flex flex-col items-center gap-1 m-auto">
        <LogoTeam
          :team="match.team_two"
          class="h-10 w-10 sm:h-20 sm:w-20"
        />
        <span>{{ match.team_two!.name }}</span>
      </div>
    </div>
  </UCard>
</template>
