<script setup lang="ts">
  import type { BreadcrumbItem } from '@nuxt/ui'
  import { getBreadcrumbItemsFromPath } from '~/methods/getBreadcrumbItemsFromPath'

  const currentRoute = useRoute()

  const breadcrumbItems = computed<BreadcrumbItem>(() =>
    getBreadcrumbItemsFromPath(currentRoute.path),
  )
</script>

<template>
  <UBreadcrumb
    class="bg-transparent"
    :items="breadcrumbItems"
  >
    <template #separator>
      <span class="mx-2 text-muted">/</span>
    </template>
  </UBreadcrumb>
</template>
