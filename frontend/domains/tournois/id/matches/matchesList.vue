<script lang="ts" setup>
  import MatchesListItem from '~/domains/tournois/id/matches/matchesListItem.vue'
  import type { Match } from '~/types/front/Match'

  const { isAuthenticated } = useAuthStore()

  type Props = {
    matches: (Match | undefined)[]
    past: boolean
    limit: number
  }

  const props = defineProps<Props>()
  const matchSelected = defineModel<Match | undefined>('matchSelected', {
    default: undefined,
  })

  const matches = computed(() =>
    props.matches
      .filter((m) => {
        const score1 = m?.team_one?.score || 0
        const score2 = m?.team_two?.score || 0
        return props.past
          ? score1 != 0 || score2 != 0
          : score1 == 0 && score2 == 0
      })
      .sort((a, b) => (!props.past ? a!.id - b!.id : b!.id - a!.id))
      .slice(0, props.limit),
  )

  const selectMatch = (match: Match): void => {
    if (isAuthenticated.value)
      if (match.team_one && match.team_two) matchSelected.value = match
  }
</script>

<template>
  <MatchesListItem
    v-for="match in matches"
    :key="match?.id"
    :match="match"
    @click="selectMatch(match!)"
  />
</template>
