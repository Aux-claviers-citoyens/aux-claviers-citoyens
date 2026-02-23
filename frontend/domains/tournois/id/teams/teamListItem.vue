<script lang="ts" setup>
  import type { Team } from '~/types/front/Team'

  interface Props {
    team: Team
  }
  defineProps<Props>()
</script>

<template>
  <div class="flex justify-center mb-1">
    <LogoTeam :team="team" />
  </div>
  <div class="text-center font-bold font-family">
    {{ team.name }}
  </div>
</template>
