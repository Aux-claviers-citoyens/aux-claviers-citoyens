<script setup lang="ts">
  import type { Team } from '~/types/front/Team'
  import type { SelectionTeam } from '~/types/front/SelectionTeam'

  type Props = {
    team: Team
    isModeView: boolean
    selectionTeams?: SelectionTeam[]
    teamsNotRegistered?: boolean
    isTeamSelected?: boolean
  }

  defineProps<Props>()
  const teamNameSelected = defineModel<string>('teamNameSelected')

  const blockChars = (event: KeyboardEvent) => {
    if (/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~€£¥¢¤§°µ]/.test(event.key)) {
      event.preventDefault()
    }
  }
</script>

<template>
  <div class="p-2">
    <div
      v-if="!team.id"
      class="grid grid-cols-1 md:grid-cols-5 gap-4 w-full mb-3"
    >
      <div class="md:col-span-4 flex flex-col justify-between h-full">
        <div class="flex flex-col gap-4 md:flex-row md:justify-between">
          <UFormField
            label="Importer une équipe"
            name="teamSelected"
            required
          >
            <USelect
              v-model="teamNameSelected"
              :items="selectionTeams"
              :disabled="teamsNotRegistered"
              class="w-60"
            />
          </UFormField>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
      <div class="md:col-span-4 flex flex-col h-full gap-3">
        <div>
          <h2 class="font-bold">Informations de l’équipe</h2>
        </div>
        <div class="flex flex-col gap-4 md:flex-row md:justify-between">
          <div class="flex w-full md:w-auto">
            <UFormField
              label="Nom de l'équipe"
              name="name"
              required
            >
              <UInput
                v-model="team.name"
                @keydown="blockChars"
                :disabled="isModeView || isTeamSelected"
                placeholder="Nom Exemple"
                class="w-60"
              />
            </UFormField>
          </div>
          <div class="flex w-full md:w-auto">
            <UFormField
              label="Image de l'équipe"
              name="Image de l'equipe"
            >
              <UInput
                :value="
                  isModeView
                    ? team.logo_path?.split('/').at(-1)
                    : team.image?.name
                "
                :disabled="isTeamSelected"
                readonly
                icon="solar:paperclip-bold"
                placeholder="Exemple.png"
                type="text"
                class="w-60"
              />
            </UFormField>
          </div>
        </div>
      </div>
      <div
        class="md:col-span-1 flex justify-center md:justify-end mt-2 md:mt-0"
      >
        <UFileUpload
          v-if="!isModeView"
          v-model="team.image"
          :ui="{
            base: 'w-full h-full',
            wrapper: 'h-full flex items-center justify-center text-center',
          }"
          :disabled="isTeamSelected"
          accept="image/*"
          class="w-full max-w-[240px] md:max-w-[180px] h-[122px]"
          color="neutral"
          description="Glisser/Déposer votre image"
          highlight
          max-files="1"
        />
        <LogoTeam
          v-else
          :team
          class="w-full max-w-[240px] md:max-w-[180px] h-[122px]"
        />
      </div>
    </div>
  </div>
</template>
