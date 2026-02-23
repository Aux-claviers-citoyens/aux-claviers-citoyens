<script setup lang="ts">
  type Props = {
    isModeView: boolean
    isValid: boolean
    isLoading: boolean
    onClose: () => boolean
    onSubmit: () => void
  }
  defineProps<Props>()
</script>

<template>
  <ValidationFooter
    :validate="{
      visible: !isModeView,
      isLoading,
      action: onSubmit,
      disabled: isLoading || !isValid,
    }"
    :cancel="{
      label: isModeView ? 'Retour' : 'Annuler',
      icon: isModeView ? 'famicons:chevron-back' : 'iwwa:delete',
      action: onClose,
    }"
  />
</template>
