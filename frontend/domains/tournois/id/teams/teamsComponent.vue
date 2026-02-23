<script lang="ts" setup>
  import type { Team } from '~/types/front/Team'
  import TeamList from '~/domains/tournois/id/teams/teamList.vue'

  interface Props {
    teams: Team[]
  }
  const { teams } = defineProps<Props>()
  const isModeView = defineModel<boolean>('isModeView')
  const team = defineModel<Team>('team')
  const isOpenModalTeam = defineModel<boolean>('isOpenModalTeam')
</script>

<template>
  <Consultation title="Équipes inscrites">
    <div class="grid grid-cols-3 gap-4">
      <TeamList
        v-model:team="team"
        v-model:isModeView="isModeView"
        v-model:isOpenModalTeam="isOpenModalTeam"
        :teams="teams"
      />
    </div>
  </Consultation>
</template>
