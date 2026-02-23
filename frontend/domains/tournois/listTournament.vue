<script setup lang="ts">
  import type { Status, Tournament } from '~/types/front/Tournament'
  import { computed } from 'vue'
  import type { TableColumn, TableRow } from '@nuxt/ui'
  import { breakpoints } from '~/methods/breakpoints'
  import { navigateTo } from '#app/composables/router'
  import type { TournamentRow } from '~/types/front/TournamentRow'

  const isLargeScreen = breakpoints.greater('md')

  type props = {
    tournaments: Tournament[]
    search: string
    isAuthenticated: boolean
    openValidDeleteTournament: (tournamentId: number) => void
    archivedTournament: (tournament: TournamentRow) => Promise<void>
  }

  const {
    tournaments,
    search,
    isAuthenticated,
    openValidDeleteTournament,
    archivedTournament,
  } = defineProps<props>()

  const tournamentWinner = (tournament: Tournament): string => {
    const match = tournament.rounds?.at(-1)?.matches[0]
    if (match?.team_one?.score! > match?.team_two?.score!)
      return match?.team_one?.name!
    if (match?.team_one?.score! < match?.team_two?.score!)
      return match?.team_two?.name!
    return '-'
  }

  const rows = computed<TournamentRow[]>(() =>
    tournaments.map((tournament) => ({
      id: Number(tournament.id),
      name: tournament.name || '-',
      status: tournament.status,
      winner: tournamentWinner(tournament) ?? '-',
    })),
  )
  const filtered = computed<TournamentRow[]>(() =>
    rows.value.filter(
      (row) => !search || row.name.toLowerCase().includes(search.toLowerCase()),
    ),
  )
  const columns = computed<TableColumn<TournamentRow>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Nom',
      meta: { class: { th: 'text-left', td: 'text-left' } },
    },
    {
      accessorKey: 'status',
      header: () => h('div', { class: 'ml-2' }, 'Status'),
      meta: { class: { th: 'text-left', td: 'text-left' } },
    },
    ...(isLargeScreen.value
      ? [
          {
            accessorKey: 'winner',
            header: 'Gagnant',
            meta: { class: { th: 'text-left', td: 'text-left' } },
          },
        ]
      : []),
    {
      id: 'action',
      header: '',
      meta: { class: { th: 'text-center', td: 'text-center' } },
    },
  ])

  const onSelect = async (event: Event, row: TableRow<TournamentRow>) =>
    isLargeScreen.value
      ? undefined
      : await navigateTo(`/tournois/${row.original.id}`)
</script>

<template>
  <UTable
    @select="onSelect"
    :columns="columns"
    :data="filtered"
    :ui="{
      tr: isLargeScreen ? '!cursor-default' : 'cursor-pointer',
    }"
  >
    <template #status-cell="{ row }">
      <UBadge
        :color="
          row.original.status === 'Archivé'
            ? 'neutral'
            : row.original.winner === '-'
              ? 'secondary'
              : 'primary'
        "
        class="rounded-2xl"
        variant="subtle"
      >
        {{
          row.original.status === 'Archivé'
            ? 'Archivé'
            : row.original.winner === '-'
              ? row.getValue('status')
              : 'Terminé'
        }}
      </UBadge>
    </template>
    <template #action-cell="{ row }">
      <UButton
        :hidden="!isLargeScreen"
        :to="`/tournois/${row.original.id}`"
        icon="i-heroicons-eye"
        variant="ghost"
      />
      <UButton
        v-if="isAuthenticated"
        :icon="
          row.original.status === 'En cours'
            ? 'material-symbols:archive'
            : 'material-symbols:unarchive'
        "
        variant="ghost"
        @click="archivedTournament(row.original)"
      />
      <UButton
        v-if="isAuthenticated"
        icon="i-typcn:delete"
        variant="ghost"
        @click="openValidDeleteTournament(row.original.id)"
      />
    </template>
  </UTable>
</template>
