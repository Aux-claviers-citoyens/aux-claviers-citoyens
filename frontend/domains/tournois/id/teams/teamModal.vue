<script setup lang="ts">
  import type { Team } from '~/types/front/Team'
  import TeamModalButton from '~/domains/tournois/id/teams/teamModalButton.vue'
  import TeamModalHeader from '~/domains/tournois/id/teams/teamModalHeader.vue'
  import TeamModalBody from '~/domains/tournois/id/teams/teamModalBody.vue'
  import TeamModalDelete from '~/domains/tournois/id/teams/teamModalDelete.vue'

  type Props = {
    tournamentId: number
    refresh: (tournamentId: number) => Promise<void>
    teams: Team[]
  }
  defineProps<Props>()
  const isOpenModal = defineModel<boolean>('isOpenModal', { default: false })
  const team = defineModel<Team>('team', {
    default: {
      name: '',
    },
  })
  const isModeView = defineModel<boolean>('isModeView', { default: false })

  const isLoading = ref(false)
  const isValid = ref(false)
  const form = ref<HTMLFormElement>()
  const isOpenModalDelete = ref(false)

  const onSubmit = () => form.value?.submit()

  const title = computed<string>(() => {
    return isModeView.value
      ? 'Consultation d’une équipe'
      : team.value?.id
        ? 'Modification d’une équipe'
        : 'Inscription au tournoi'
  })
</script>

<template>
  <UModal
    v-model:open="isOpenModal"
    :ui="{
      content: `max-w-none w-[1320px] h-[3${team.id ? '10' : '80'}px] overflow-y-auto`,
    }"
    :title="title"
    aria-describedby="Modal de Team"
  >
    <template #content>
      <div class="flex h-full flex-col justify-between">
        <!-- HEADER -->
        <div class="p-4 border-b border-slate-500/20">
          <TeamModalHeader
            v-model:isModeView="isModeView"
            v-model:isOpenModal="isOpenModal"
            v-model:isOpenModalDelete="isOpenModalDelete"
            :title="title"
          />
        </div>

        <!-- BODY -->
        <div class="p-4">
          <TeamModalBody
            v-model:form="form"
            v-model:isValid="isValid"
            v-model:isLoading="isLoading"
            :tournamentId="tournamentId"
            :refresh="refresh"
            :team="team"
            :isModeView="isModeView"
            :teams="teams"
          />
        </div>

        <!-- FOOTER -->
        <div class="p-4 border-t flex justify-end border-slate-500/20">
          <TeamModalButton
            :isModeView="isModeView"
            :isValid="isValid"
            :isLoading="isLoading"
            :onClose="() => (isOpenModal = false)"
            :onSubmit="onSubmit"
          />
        </div>
      </div>
    </template>
  </UModal>
  <TeamModalDelete
    v-model:isOpenModalDelete="isOpenModalDelete"
    v-model:isOpenModal="isOpenModal"
    :tournamentId="tournamentId"
    :team="team"
    :refresh="refresh"
  />
</template>
