<script setup lang="ts">
  import type { Round } from '~/types/front/Round'

  type Props = {
    rounds: Round[]
    length: number
  }

  defineProps<Props>()
</script>

<template>
  <div
    class="flex h-full"
    :class="{
      'justify-evenly': length <= 2,
      'justify-around': length > 2,
    }"
  >
    <span
      v-for="round of rounds"
      :key="round.id"
    >
      {{ round.name }}
    </span>
  </div>
</template>
