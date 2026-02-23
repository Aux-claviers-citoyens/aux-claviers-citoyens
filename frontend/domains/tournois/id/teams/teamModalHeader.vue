<script setup lang="ts">
  type Props = {
    title: string
  }
  defineProps<Props>()
  const isModeView = defineModel<boolean>('isModeView')
  const isOpenModal = defineModel<boolean>('isOpenModal')
  const isOpenModalDelete = defineModel<boolean>('isOpenModalDelete')

  const onModify = () => {
    isModeView.value = false
  }
  const onDelete = () => {
    isOpenModal.value = false
    isOpenModalDelete.value = true
  }
</script>

<template>
  <div class="flex items-center justify-between">
    <h2 class="font-bold">{{ title }}</h2>
    <div v-if="isModeView">
      <UButton
        icon="i-lucide-pencil"
        variant="ghost"
        class="text-white"
        @click="onModify"
      />
      <UButton
        icon="lucide:trash"
        variant="ghost"
        class="text-red-600"
        @click="onDelete"
      />
    </div>
  </div>
</template>
