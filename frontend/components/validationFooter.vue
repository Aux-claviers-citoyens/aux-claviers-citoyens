<script setup lang="ts">
  import type { Button } from '~/types/front/Button'

  type Props = {
    cancel?: Button
    validate?: Button
  }

  const props = defineProps<Props>()
  const buttons = computed<Button[]>(() => [
    {
      ...{
        //Defaut cancel button
        visible: true,
        action: () => {
          useRouter().back()
        },
        label: 'Annuler',
        icon: 'iwwa:delete',
        color: 'neutral',
        variant: 'outline',
      },
      ...props.cancel, //Override with props
    },
    {
      ...{
        //Defaut validate button
        visible: true,
        label: 'Valider',
        styleClass: 'text-white',
        icon: 'ic:sharp-check',
        color: 'primary',
        variant: 'solid',
        type: 'submit',
      },
      ...props.validate, //Override with props
    },
  ])
</script>

<template>
  <div class="flex gap-2 justify-end">
    <ButtonComponent
      v-for="button in buttons"
      :key="button.label"
      :visible="button.visible"
      :disabled="button.disabled"
      :action="button.action"
      :label="button.label"
      :class="button.styleClass"
      :icon="button.icon"
      :color="button.color"
      :variant="button.variant"
      :isLoading="button.isLoading"
      :type="button.type"
    />
  </div>
</template>
