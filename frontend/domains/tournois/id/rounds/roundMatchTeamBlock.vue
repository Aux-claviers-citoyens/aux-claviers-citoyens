<script setup lang="ts">
  import type { TeamWithScore } from '~/types/front/Match'
  import RoundMatchName from '~/domains/tournois/id/rounds/roundMatchName.vue'
  import RoundMatchScore from '~/domains/tournois/id/rounds/roundMatchScore.vue'

  type Props = {
    team: TeamWithScore | undefined
    isWinner: boolean
    length: number
  }
  defineProps<Props>()
</script>

<template>
  <div
    class="flex justify-between items-center p-2 bg-gray-700 h-[76px]"
    :class="{
      'text-slate-500': !isWinner,
      'w-[242px]': length == 4,
      'w-[328px]': length == 3,
      'w-[416px]': length <= 2,
    }"
  >
    <div class="justify-center h-[60px] my-2 ml-3">
      <LogoTeam :team="team" />
    </div>
    <RoundMatchName
      :team="team"
      :length="length"
    />
    <RoundMatchScore
      v-if="team"
      :team="team"
      :isWinner="isWinner"
    />
  </div>
</template>
