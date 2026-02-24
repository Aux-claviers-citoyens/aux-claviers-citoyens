<script lang="ts" setup>
  import type { Team } from '~/types/front/Team'

  type Props = {
    team: Team | undefined
  }

  defineProps<Props>()

  const style = {
    width: '100%',
    height: '100%',
  }
</script>

<template>
  <div class="w-15 h-15">
    <UIcon
      v-if="!team"
      name="fluent:people-team-16-regular"
      :style="style"
    />
    <img
      v-else-if="team?.logo_path"
      alt="Logo équipe"
      :src="`/static/team-logos/${team?.logo_path}`"
      :style="style"
    />
    <UIcon
      v-else
      name="fluent:people-team-16-filled"
      :style="style"
    />
  </div>
</template>
