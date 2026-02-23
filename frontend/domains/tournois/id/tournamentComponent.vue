<script lang="ts" setup>
  import type { Tournament } from '~/types/front/Tournament'
  import type { Team } from '~/types/front/Team'
  import type { TabValue } from '~/types/front/Navigation'
  import { getNextMatch } from '~/methods/getNextMatch'
  import type { Match } from '~/types/front/Match'

  type Props = {
    tournament: Tournament
    teams?: Team[]
    currentTab?: TabValue
    isMatchesPast?: boolean
  }

  const slots = useSlots()

  const { tournament, teams, currentTab, isMatchesPast } = defineProps<Props>()

  const isOpenModalTeam = defineModel<boolean>('isOpenModalTeam', {
    default: false,
  })
  const isModeView = defineModel<boolean>('isModeView')
  const team = defineModel<Team>('team')
  const match = defineModel<Match | undefined>('match', {
    default: undefined,
  })

  const { isAuthenticated } = useAuthStore()

  const registeredTeam = computed<number>(() => teams?.length || 0)
  const teamNeeded = computed<number>(() => tournament.team_count || 0)

  const isInscriptionOpen = computed<boolean>(
    () =>
      currentTab === 'participants' &&
      registeredTeam.value < teamNeeded.value &&
      isAuthenticated.value &&
      tournament.status !== 'Archivé',
  )

  const isCanNewResult = computed<boolean>(
    () => currentTab == 'match' && !isMatchesPast && isAuthenticated.value,
  )

  const onOpenModalTeam = () => {
    isOpenModalTeam.value = true
    isModeView.value = false
    team.value = { name: '' }
  }

  const isTournamentFinished = computed<boolean>(() => {
    const match = tournament.rounds?.at(-1)?.matches[0]
    return match?.team_one?.score! + match?.team_two?.score! > 0
  })
</script>

<template>
  <UCard
    :class="{ 'rounded-none': !teams }"
    class="[&>div]:p-0 [&>div]:sm:px-0"
  >
    <template #header>
      <img
        :src="
          tournament?.logo_path
            ? `/api/static/tournament-logos/${tournament?.logo_path}`
            : `/bg-tournois-default.jpg`
        "
        alt="Tournois"
        class="w-full h-48 object-cover object-top"
      />
      <div class="p-5">
        <div class="flex justify-between text-xl">
          <div class="flex-1 text-left">
            <p>Tournoi {{ tournament?.name }}</p>
            <div
              v-if="teams"
              class="flex my-2 mx-0"
            >
              <UButton
                :ui="
                  !isTournamentFinished && tournament.status !== 'Archivé'
                    ? {
                        leadingIcon: 'text-red-500',
                      }
                    : {}
                "
                :color="
                  tournament.status === 'Archivé'
                    ? 'neutral'
                    : !isTournamentFinished
                      ? 'secondary'
                      : 'primary'
                "
                variant="ghost"
                :icon="
                  tournament.status === 'Archivé'
                    ? 'lucide-archive'
                    : !isTournamentFinished
                      ? 'lucide:circle-play'
                      : 'lucide-circle-check'
                "
              >
                {{
                  tournament.status === 'Archivé'
                    ? 'Archivé'
                    : !isTournamentFinished
                      ? tournament.status
                      : 'Terminé'
                }}
              </UButton>
              <p class="my-auto px-2 text-gray-600 text-lg">
                {{ registeredTeam }}/{{ teamNeeded }} équipe(s) inscrite(s)
              </p>
            </div>
          </div>
          <div class="flex flex-col flex-1 text-center">
            <span>Bracket Simple Elimination</span>
            <UButton
              v-if="isInscriptionOpen"
              class="text-white cursor-pointer w-fit self-end my-2"
              icon="lucide:feather"
              label="Inscriptions"
              @click="onOpenModalTeam"
            />
            <UButton
              v-else-if="isCanNewResult && getNextMatch(tournament)"
              class="text-white cursor-pointer w-fit self-end my-2"
              icon="material-symbols:target"
              label="Nouveau résultat"
              @click="match = getNextMatch(tournament)"
            />
          </div>
        </div>
        <slot name="navigation" />
      </div>
    </template>
    <template
      v-if="!!slots.default"
      #default
    >
      <slot />
    </template>
    <template
      v-if="!!slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </UCard>
</template>
