<script setup lang="ts">
  import type { Button } from '~/types/front/Button'

  defineProps<Button>()
</script>

<template>
  <UButton
    v-if="visible"
    :disabled="disabled"
    v-bind="action ? { onClick: action } : {}"
    :label="!isLoading ? label : 'Chargement ...'"
    :class="styleClass"
    :icon="icon"
    :color="color"
    :variant="variant"
    :loading="isLoading"
    :type="type"
  />
</template>
