<script lang="ts" setup>
  import MatchesList from '~/domains/tournois/id/matches/matchesList.vue'
  import type { Round } from '~/types/front/Round'
  import Consultation from '~/components/consultation.vue'
  import type { Match } from '~/types/front/Match'

  type Props = {
    rounds: Round[]
  }

  const { rounds } = defineProps<Props>()
  const matchSelected = defineModel<Match | undefined>('matchSelected', {
    default: undefined,
  })

  const isShowMatchPast = defineModel<boolean>('isShowMatchPast', {
    default: true,
  })

  const allMatches = computed(() => rounds?.flatMap((r) => r?.matches))
</script>

<template>
  <Consultation title="Matchs">
    <div class="flex gap-4">
      <UButton
        :class="[!isShowMatchPast ? 'text-white' : null, 'cursor-pointer']"
        :color="!isShowMatchPast ? 'neutral' : 'primary'"
        :variant="!isShowMatchPast ? 'outline' : 'solid'"
        label="Derniers résultats"
        @click="isShowMatchPast = true"
      />
      <UButton
        :class="[isShowMatchPast ? 'text-white' : null, 'cursor-pointer']"
        :color="isShowMatchPast ? 'neutral' : 'primary'"
        :variant="isShowMatchPast ? 'outline' : 'solid'"
        label="À Venir"
        @click="isShowMatchPast = false"
      />
    </div>
    <MatchesList
      :limit="8"
      :matches="allMatches"
      :past="isShowMatchPast"
      v-model:matchSelected="matchSelected"
    />
  </Consultation>
</template>
