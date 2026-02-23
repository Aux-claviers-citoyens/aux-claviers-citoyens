<script setup lang="ts">
  type Props = {
    title?: string
  }

  const { title } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      class="text-2xl p-2 text-center"
      v-if="title"
    >
      <h2>{{ title }}</h2>
    </div>
    <slot />
  </div>
</template>
