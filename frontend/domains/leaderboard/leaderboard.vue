<script setup lang="ts">
  import type { TableColumn } from '@nuxt/ui'
  import type { Tournament } from '~/types/front/Tournament'
  import type { TeamWithScore } from '~/types/front/Match'
  import { getPaginationRowModel } from '@tanstack/table-core'

  const UAvatar = resolveComponent('UAvatar')
  const UIcon = resolveComponent('UIcon')

  type Props = {
    unsortedTeams: TeamWithScore[]
  }

  const { unsortedTeams } = defineProps<Props>()
  const globalFilter = defineModel<string>('globalFilter', {
    default: '',
  })

  const pagination = ref({
    pageIndex: 0,
    pageSize: 10,
  })

  const columns: TableColumn<Tournament>[] = [
    {
      accessorKey: 'place',
      header: 'Place',
    },
    {
      accessorKey: 'image',
      header: 'Avatar',
      cell: ({ row }) => {
        return row.original.logo_path !== null
          ? h(UAvatar, {
              src: `/static/team-logos/${row.original.logo_path}`,
              class: 'w-[60px] h-[60px]',
            })
          : h(UIcon, {
              name: 'fluent:people-team-16-filled',
              class: 'w-[60px] h-[60px]',
            })
      },
    },
    {
      accessorKey: 'name',
      header: 'Team',
    },
  ]

  const teams = computed<TeamWithScore[]>(() =>
    Object.values(
      unsortedTeams.reduce(
        (acc, team) => {
          // ACCUMULATOR
          const name = team.name!.toUpperCase()
          if (!acc[name]) acc[name] = { ...team }
          else acc[name].elo_score! += team.elo_score!
          return acc
        },
        {} as Record<string, TeamWithScore>,
      ),
    ).sort((a, b) => b.elo_score! - a.elo_score!),
  )
  const filtered = computed(() =>
    teams.value.filter(
      (team) =>
        !globalFilter.value ||
        team.name.toLowerCase().includes(globalFilter.value.toLowerCase()),
    ),
  )
</script>

<template>
  <UTable
    :data="filtered"
    :columns="columns"
    class="flex-1"
    v-model:pagination="pagination"
    :pagination-options="{
      getPaginationRowModel: getPaginationRowModel(),
    }"
  >
    <template #place-cell="{ row }">
      <div class="items-center gap-3">
        <p class="font-medium text-highlighted text-center">
          {{ row.index + 1 }}
        </p>
      </div>
    </template>
    <template #name-cell="{ row }">
      <div class="items-center gap-3">
        <div>
          <p class="font-medium text-highlighted">
            {{ row.original.name }}
          </p>
          <p>
            {{ Math.trunc(row.original.elo_score) }}
          </p>
        </div>
      </div>
    </template>
  </UTable>
</template>
