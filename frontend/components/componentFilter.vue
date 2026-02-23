<script setup lang="ts">
  const search = defineModel<string>('search', {
    type: String,
    default: '',
  })
</script>

<template>
  <div class="border border-gray-700 rounded-2xl">
    <div class="p-3 border-b border-gray-700 flex justify-between items-center">
      <UInput
        v-model="search"
        class="w-full sm:w-1/3"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Rechercher"
      />
    </div>
    <slot />
  </div>
</template>
