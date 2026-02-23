<script setup lang="ts">
  import type { TeamWithScore } from '~/types/front/Match'

  type Props = {
    team: TeamWithScore
    isWinner: boolean
  }
  defineProps<Props>()
</script>

<template>
  <div class="flex items-center mx-3">
    <span :class="{ 'text-primary-500': isWinner && team.score !== 0 }">
      {{ team.score != 0 || !isWinner ? team.score : '-' }}
    </span>
  </div>
</template>
