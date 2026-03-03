<script setup lang="ts">
  import type { Team } from '~/types/front/Team'
  import * as zod from 'zod'
  import TeamModalFields from '~/domains/tournois/id/teams/TeamModalFields.vue'
  import { filterTeam } from '~/methods/filterTeam'
  import { getMessageError } from '~/methods/getMessageError'
  import type { SelectionTeam } from '~/types/front/SelectionTeam'
  import { toastError, toastSuccess } from '~/methods/toasts'

  const backend = useBackend()

  type Props = {
    teams: Team[]
    isModeView: boolean
    tournamentId: number
    refresh: (tournamentId: number) => Promise<void>
  }

  const { tournamentId, refresh, teams } = defineProps<Props>()
  const form = defineModel<HTMLFormElement>('form')
  const isLoading = defineModel<boolean>('isLoading')
  const isValid = defineModel<boolean>('isValid')
  const isOpenModal = defineModel<boolean>('isOpenModal')
  const team = defineModel<Team>('team', {
    default: { name: '' },
  })
  const filterTeams = computed<string[]>(() => {
    return teams
      .filter((teamToFilter) => teamToFilter.id !== team.value.id)
      .flatMap((team) => team.name.toUpperCase().trim())
  })

  const allTeam = ref<Team[]>([])
  const emptyTeamSelectionValue = ' '
  const teamNameSelected = ref(emptyTeamSelectionValue)

  const schema = zod
    .object({
      team: zod.object({
        name: zod.string().trim(),
      }),
      teamSelected: zod.string().nullable(),
    })
    .superRefine((data, ctx) => {
      if (data.teamSelected && data.teamSelected !== emptyTeamSelectionValue) {
        return
      }
      if (!data.team.name) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'Nom obligatoire',
          path: ['name'],
        })
        return
      }
      if (data.team.name.length < 2) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'Nom trop petit (min 2)',
          path: ['name'],
        })
        return
      }
      if (data.team.name.length > 30) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'Nom trop grand (max 30)',
          path: ['name'],
        })
      }
    })

  const onSubmit = async () => {
    isLoading.value = true
    team.value.name = team.value.name.trim().replace(/\s+/g, ' ')
    if (
      !filterTeams.value.includes(team.value.name.toUpperCase()) ||
      isTeamSelected.value
    ) {
      try {
        if (isTeamSelected.value) {
          const teamToImport = allTeam.value.find(
            (team) => team.name === teamNameSelected.value,
          )
          if (teamToImport) {
            await backend.postTeam(teamToImport, tournamentId)
            toastSuccess(`Succès, équipe ${teamToImport.name} importée`)
            teamNameSelected.value = emptyTeamSelectionValue
          }
        } else {
          if (!team.value.id) {
            await backend.postTeam(team.value, tournamentId)
            team.value.name = ''
            team.value.image = undefined
          } else {
            await backend.putTeam(team.value, tournamentId)
            isOpenModal.value = false
          }
          toastSuccess(
            `Succès, équipe ${team.value.id ? `${team.value.name} modifiée` : `${team.value.name} créée`}`,
          )
        }
      } catch (err: unknown) {
        toastError(
          getMessageError(err, "Erreur lors de la création de l'équipe."),
        )
      } finally {
        refresh(tournamentId)
      }
    } else {
      toastError('Une équipe porte déja ce nom')
    }
    isLoading.value = false
  }

  onMounted(async () => {
    allTeam.value = await backend.getAllTeamsFiltered()
  })

  const teamsNotRegistered = computed<Team[]>(() =>
    filterTeam(allTeam.value)
      .filter((team) => !filterTeam(teams).some((t) => t.name === team.name))
      .map((team) => allTeam.value.find((t) => t.id === team.id)!),
  )

  const selectionTeams = computed<SelectionTeam[]>(() => {
    const propositions: SelectionTeam[] = [
      { label: 'Aucune', value: emptyTeamSelectionValue },
      { label: '— équipe importable —', value: null, disabled: true },
    ]
    teamsNotRegistered.value.forEach((team) => {
      propositions.push({ label: team.name, value: team.name })
    })
    if (teams.length > 0) {
      propositions.push({
        label: '— équipe déjà participante —',
        value: null,
        disabled: true,
      })
      teams.forEach((team) => {
        propositions.push({
          label: team.name,
          value: team.name,
          disabled: true,
        })
      })
    }
    return propositions
  })

  const formState = computed(() => ({
    team: team.value,
    teamSelected: teamNameSelected.value,
  }))

  const isTeamSelected = computed<boolean>(
    () => teamNameSelected.value != emptyTeamSelectionValue,
  )

  watchEffect(() => {
    isValid.value = schema.safeParse(formState.value).success
  })
</script>

<template>
  <UForm
    ref="form"
    class="w-full"
    :schema="schema"
    :state="formState"
    @submit="onSubmit"
  >
    <TeamModalFields
      v-model:teamNameSelected="teamNameSelected"
      :team="team"
      :isModeView="isModeView"
      :selectionTeams="selectionTeams"
      :teamsNotRegistered="teamsNotRegistered.length < 1"
      :isTeamSelected="isTeamSelected"
    />
  </UForm>
</template>
