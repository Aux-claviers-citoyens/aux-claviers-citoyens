<script setup lang="ts">
  import type { Team } from '~/types/front/Team'
  import { toastError, toastSuccess } from '~/methods/toasts'
  import { getMessageError } from '~/methods/getMessageError'

  type Props = {
    tournamentId: number
    team: Team
    refresh: (tournamentId: number) => Promise<void>
  }
  const { tournamentId, team, refresh } = defineProps<Props>()

  const backend = useBackend()

  const isOpenModalDelete = defineModel<boolean>('isOpenModalDelete')
  const isOpenModal = defineModel<boolean>('isOpenModal')

  const onCancelDelete = () => {
    isOpenModalDelete.value = false
    isOpenModal.value = true
  }

  const isLoading = ref(false)

  const onValidDelete = async () => {
    isLoading.value = true
    try {
      if (team.id) {
        await backend.deleteTeamWithNoInput(team, tournamentId)
        toastSuccess(`Succès, équipe ${team.name} supprimé`)
        refresh(tournamentId)
        isOpenModalDelete.value = false
      }
    } catch (err: unknown) {
      toastError(
        getMessageError(err, "Erreur lors de la suppression de l'équipe."),
      )
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <UModal
    v-model:open="isOpenModalDelete"
    :ui="{
      content: 'p-4 bg-[#322a12] ring-1 ring-[#9f8a3a] rounded-2xl shadow-2xl',
    }"
  >
    <template #content>
      <div>
        <div class="flex mr-2 text-[#d1b54a]">
          <UIcon
            name="mingcute:alert-line"
            class="w-[20px] h-[20px] mt-1"
          />
          <div class="flex flex-col ml-2">
            <span class="mb-1">Attention !</span>
            <span>Vous allez supprimer l'équipe :</span>
            <span class="font-bold">{{ team.name }}</span>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <UButton
          label="Annuler"
          icon="iwwa:delete"
          color="neutral"
          variant="outline"
          class="border border-white m-1"
          @click="onCancelDelete"
        />
        <UButton
          :disabled="isLoading"
          :loading="isLoading"
          :label="!isLoading ? 'Supprimer' : ''"
          icon="iwwa:delete"
          color="error"
          class="text-white m-1"
          @click="onValidDelete"
        />
      </div>
    </template>
  </UModal>
</template>
