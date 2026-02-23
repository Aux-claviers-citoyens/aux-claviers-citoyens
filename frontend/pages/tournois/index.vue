<script lang="ts" setup>
  import type { Status, Tournament } from '~/types/front/Tournament'
  import ConfirmModal from '~/domains/tournois/confirmModal.vue'
  import { getMessageError } from '~/methods/getMessageError'
  import { toastError, toastSuccess } from '~/methods/toasts'
  import ListTournament from '~/domains/tournois/listTournament.vue'
  import ComponentFilter from '~/components/componentFilter.vue'
  import type { TournamentRow } from '~/types/front/TournamentRow'
  import { breakpoints } from '~/methods/breakpoints'

  const backend = useBackend()
  const isPhone = breakpoints.smaller('sm')

  const { isAuthenticated } = useAuthStore()
  const tournaments = ref<Tournament[]>([])
  const search = ref('')
  const isLoading = ref<boolean>(false)
  const confDeleteTournement = ref<boolean>(false)

  const tournamentToDelete = ref<number | null>()

  onMounted(async () => {
    try {
      isLoading.value = true
      tournaments.value = await backend.getAllTournamentsWithMatches()
    } catch (err: unknown) {
      toastError(getMessageError(err))
    } finally {
      isLoading.value = false
    }
  })

  const onDeleteTournement = async () => {
    if (tournamentToDelete.value) {
      try {
        await backend.deleteTournament(tournamentToDelete.value)
        tournaments.value = tournaments.value.filter(
          (searchTournament) => searchTournament.id != tournamentToDelete.value,
        )
        toastSuccess('Le tournois a bien été supprimé.')
      } catch (err: unknown) {
        toastError(getMessageError(err))
      }
    }
  }

  const openValidDeleteTournament = (tournamentId: number) => {
    tournamentToDelete.value = tournamentId
    confDeleteTournement.value = true
  }

  const onArchivedTournament = async (tournament: TournamentRow) => {
    const newStatus: Status =
      tournament.status === 'En cours' ? 'Archivé' : 'En cours'
    try {
      await backend.archivedTournament(tournament.id!, newStatus)
      tournaments.value.filter(
        (searchTournament) => searchTournament.id === tournament.id,
      )[0]!.status = newStatus
      toastSuccess(`Le tournois est maintenant ${newStatus.toLowerCase()}`)
    } catch (err: unknown) {
      toastError(getMessageError(err))
    }
  }
</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="flex justify-between items-end sm:items-center">
          <h1 class="text-4xl sm:text-5xl font-bold">Liste des tournois</h1>
          <div class="flex gap-2 flex-col sm:flex-row">
            <UButton
              :label="isPhone ? undefined : 'Retour'"
              color="neutral"
              icon="quill:chevron-left"
              to="/"
              variant="outline"
            />
            <UButton
              v-if="isAuthenticated"
              :label="isPhone ? undefined : 'Créer un tournoi'"
              class="text-white"
              color="primary"
              icon="i-heroicons-plus"
              to="/tournois/nouveau"
            />
          </div>
        </div>
      </template>
      <template #default>
        <ComponentFilter v-model:search="search">
          <ListTournament
            :isLoading="isLoading"
            :isAuthenticated="isAuthenticated"
            :tournaments="tournaments"
            :search="search"
            :openValidDeleteTournament="openValidDeleteTournament"
            :archivedTournament="onArchivedTournament"
          />
        </ComponentFilter>
      </template>
    </UCard>
    <ConfirmModal
      v-model="confDeleteTournement"
      description="Le tournois ne doit pas être archivé"
      message="Êtes vous bien sûr de supprimer ce tournois ?"
      @valid="onDeleteTournement()"
    />
  </UContainer>
</template>
