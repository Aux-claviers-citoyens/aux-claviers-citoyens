<script setup lang="ts">
  import { games } from '~/types/front/Tournament'
  import type { SelectItem } from '@nuxt/ui'

  const game = defineModel<string>({ default: '' })

  const items = computed<SelectItem[]>(() => {
    let itemList: SelectItem[] = []
    games.forEach((gameName: string) => {
      itemList = [...itemList, { label: gameName, value: gameName }]
    })
    return itemList
  })
</script>

<template>
  <div>
    <USelect
      v-model="game"
      :items="items"
      placeholder="Choisir"
      icon="i-lucide-search"
      class="w-11/12"
    />
  </div>
</template>
