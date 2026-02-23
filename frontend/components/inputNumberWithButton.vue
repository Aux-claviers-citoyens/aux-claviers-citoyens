<script lang="ts" setup>
  type Props = {
    min?: number
    max?: number
    increment?: number
    decrement?: number
    disabled?: boolean
  }
  withDefaults(defineProps<Props>(), {
    min: 0,
    max: Infinity,
    increment: 1,
    decrement: 1,
    disabled: true,
  })
  const modelValue = defineModel<number>('modelValue', {
    default: 0,
  })
</script>

<template>
  <UInput
    v-model="modelValue"
    :disabled="disabled"
    :max="max"
    :min="min"
    class="w-11/12"
    type="number"
  >
    <template #leading>
      <UButton
        :disabled="modelValue <= min"
        color="gray"
        icon="i-heroicons-minus"
        size="xs"
        variant="ghost"
        @click="modelValue -= decrement"
      />
    </template>
    <template #trailing>
      <UButton
        :disabled="modelValue >= max"
        color="gray"
        icon="i-heroicons-plus"
        size="xs"
        variant="ghost"
        @click="modelValue += increment"
      />
    </template>
  </UInput>
</template>
