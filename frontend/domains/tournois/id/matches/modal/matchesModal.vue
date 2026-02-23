<script lang="ts" setup>
  import TournamentComponent from '~/domains/tournois/id/tournamentComponent.vue'
  import type { Tournament } from '~/types/front/Tournament'
  import type { Match } from '~/types/front/Match'
  import ResultMatch from '~/domains/tournois/id/matches/modal/resultMatch.vue'
  import InputNumberWithButton from '~/components/inputNumberWithButton.vue'
  import { getMessageError } from '~/methods/getMessageError'
  import { toastError, toastSuccess } from '~/methods/toasts'

  type Props = {
    loadTournament: (tournamentId: number) => Promise<void>
    tournament: Tournament
    match: Match
    closeModal: () => void
  }

  const { loadTournament, tournament, match, closeModal } = defineProps<Props>()
  const backend = useBackend()

  const saveMatch = async () => {
    if (!matchValid.value) {
      toastError('Les scores des deux équipes ne peuvent pas être identiques')
      return
    }
    try {
      await backend.saveMatch(matchModif.value!, tournament.id!)
      loadTournament(tournament.id!)
      toastSuccess('Le match à bien été mis à jour')
    } catch (err: unknown) {
      toastError(
        getMessageError(err, 'Erreur lors de la mise à jour du match.'),
      )
    }
  }

  const matchModif = ref<Match>()

  watch(
    () => match,
    (newMatch) =>
      (matchModif.value = <Match>{
        ...newMatch,
        team_one: { ...newMatch.team_one },
        team_two: { ...newMatch.team_two },
      }),
    { immediate: true, deep: true },
  )

  const matchValid = computed(
    () =>
      matchModif.value?.team_one?.score !== matchModif.value?.team_two?.score,
  )
</script>

<template>
  <UModal
    :open="!!match"
    v-if="matchModif"
    :ui="{
      content: 'max-w-none',
    }"
    class="w-9/15 text-xl"
  >
    <template #content>
      <TournamentComponent
        :loadTournament="loadTournament"
        :tournament="tournament"
      >
        <div class="m-4 flex flex-col gap-3">
          <ResultMatch :match="matchModif" />
          <div class="flex justify-between gap-3">
            <UCard
              :ui="{ body: '!p-2' }"
              class="flex-1"
            >
              {{ matchModif.team_one!.name }}
              <UFormField
                class="mt-1"
                label="Score"
                required
              >
                <InputNumberWithButton
                  v-model="matchModif.team_one!.score"
                  class="w-full!"
                />
              </UFormField>
            </UCard>
            <UCard
              :ui="{ body: '!p-2' }"
              class="flex-1"
            >
              {{ matchModif.team_two!.name }}
              <UFormField
                class="mt-1"
                label="Score"
                required
              >
                <InputNumberWithButton
                  v-model="matchModif.team_two!.score"
                  class="w-full!"
                />
              </UFormField>
            </UCard>
          </div>
        </div>
        <template #footer>
          <div class="m-4 flex justify-end gap-3">
            <UButton
              color="neutral"
              icon="iwwa:delete"
              label="Annuler"
              variant="outline"
              @click="closeModal"
            />
            <UButton
              class="text-white"
              color="primary"
              icon="ic:sharp-check"
              label="Valider"
              @click="saveMatch()"
            />
          </div>
        </template>
      </TournamentComponent>
    </template>
  </UModal>
</template>
