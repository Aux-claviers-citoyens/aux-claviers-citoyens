<script setup lang="ts">
  import type { DropdownMenuItem } from '@nuxt/ui'

  const { isAuthenticated } = useAuthStore()

  const itemsTournois: DropdownMenuItem[][] = [
    [
      {
        label: 'Nouveau tournoi',
        icon: 'lucide-plus',
        to: '/tournois/nouveau',
        invisible: !isAuthenticated.value,
      },
      {
        label: 'Liste des tournois',
        icon: 'lucide-list',
        to: '/tournois',
      },
    ].filter((item) => !item.invisible),
  ]
</script>

<template>
  <div>
    <UDropdownMenu :items="itemsTournois">
      <UButton
        label="Tournois"
        variant="ghost"
        color="neutral"
        trailing-icon="mdi-chevron-down"
      />
    </UDropdownMenu>
    <UButton
      label="Leaderboard"
      variant="ghost"
      color="neutral"
      to="/leaderboard"
    />
  </div>
</template>
