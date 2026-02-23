<script setup lang="ts">
  import LayoutDefaultHeaderLeft from '~/domains/layouts/default/header/layoutDefaultHeaderLeft.vue'
  import LayoutDefaultHeaderRight from '~/domains/layouts/default/header/layoutDefaultHeaderRight.vue'
  import LayoutDefaultHeaderBottom from '~/domains/layouts/default/header/layoutDefaultHeaderBottom.vue'
  import { breakpoints } from '~/methods/breakpoints'

  const isMobile = breakpoints.smaller('lg')
</script>
<template>
  <UHeader
    class="!backdrop-blur-none !bg-transparent border-b-0"
    mode="slideover"
  >
    <template #left>
      <UButton
        variant="ghost"
        size="xs"
        label="ACC Tournament"
        icon="lucide:trophy"
        to="/"
      />
      <LayoutDefaultHeaderLeft v-if="!isMobile" />
    </template>
    <template #body>
      <LayoutDefaultHeaderLeft />
    </template>
    <template #right>
      <LayoutDefaultHeaderRight />
    </template>
    <template #bottom>
      <LayoutDefaultHeaderBottom />
    </template>
  </UHeader>
</template>
