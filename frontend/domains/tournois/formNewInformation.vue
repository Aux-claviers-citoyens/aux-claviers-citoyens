<script setup lang="ts">
  import { games, type Tournament } from '~/types/front/Tournament'
  import FormNewSelect from '~/domains/tournois/formNewSelect.vue'

  type Props = {
    tournament: Tournament
  }
  defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-3 space-y-1.5 gap-10 my-5">
    <UFormField
      label="Nom du tournoi"
      name="name"
      required
    >
      <UInput
        v-model="tournament.name"
        placeholder="Exemple"
        class="w-11/12"
      />
    </UFormField>
    <UFormField
      label="Sélectionner un jeu"
      name="game"
      required
    >
      <FormNewSelect
        v-model="tournament.game"
        :items="games"
        class="w-11/12"
      />
    </UFormField>
    <UFormField
      label="Nombre d'équipe"
      required
    >
      <InputNumberWithButton
        v-model:modelValue="tournament.team_count"
        min="2"
        max="16"
        :increment="tournament.team_count"
        :decrement="tournament.team_count! / 2"
      />
    </UFormField>
  </div>
</template>
