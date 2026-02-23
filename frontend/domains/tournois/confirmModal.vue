<script setup lang="ts">
  const model = defineModel<boolean>({
    default: false,
  })

  const { message } = defineProps<{
    message: string
    description: string
  }>()

  const emits = defineEmits<{
    (e: 'valid'): void
    (e: 'cancel'): void
  }>()

  const valid = (close: () => void) => {
    emits('valid')
    close()
  }
  const cancel = (close: () => void) => {
    emits('cancel')
    close()
  }
</script>

<template>
  <UModal
    v-model:open="model"
    :title="message"
    :description="description"
  >
    <template #footer="{ close }">
      <UButton
        @click="valid(close)"
        label="Oui"
      />
      <UButton
        @click="cancel(close)"
        label="Non"
      />
    </template>
  </UModal>
</template>
