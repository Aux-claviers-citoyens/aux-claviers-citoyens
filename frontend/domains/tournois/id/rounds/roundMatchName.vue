<script setup lang="ts">
  import type { TeamWithScore } from '~/types/front/Match'

  type Props = {
    team: TeamWithScore | undefined
    length: number
  }
  const props = defineProps<Props>()
</script>

<template>
  <span
    v-if="team?.name"
    class="truncate mx-3"
    :class="{
      'w-[90px]': length == 4,
      'w-[176px]': length == 3,
      'w-[264px]': length <= 2,
    }"
  >
    {{ team?.name }}
  </span>
  <span v-else> Attente d'une équipe </span>
</template>
