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
  <div>
    <div
      v-if="!team.id"
      class="grid grid-cols-5 gap-4 w-full"
    >
      <div class="col-span-4 flex flex-col justify-between h-full">
        <div class="flex justify-between m-[10px]">
          <UFormField
            label="Importer une équipe"
            name="teamSelected"
            required
          >
            <USelect
              v-model="teamNameSelected"
              :items="selectionTeams"
              :disabled="teamsNotRegistered"
              class="w-48"
            />
          </UFormField>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-4 w-full">
      <div class="col-span-4 flex flex-col justify-between h-full">
        <div>
          <h2 class="font-bold">Informations de l’équipe</h2>
        </div>
        <div class="flex justify-between m-[10px]">
          <div class="flex">
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
              />
            </UFormField>
          </div>
          <div class="flex">
            <UFormField
              label="image de l'équipe"
              name="Image de l'equipe"
            >
              <UInput
                :value="isModeView ? team.logo_path : team.image?.name"
                :disabled="isTeamSelected"
                readonly
                icon="solar:paperclip-bold"
                placeholder="Exemple.png"
                type="text"
              />
            </UFormField>
          </div>
        </div>
      </div>
      <div class="col-span-1 flex justify-center">
        <UFileUpload
          v-if="!isModeView"
          v-model="team.image"
          :ui="{
            base: 'w-full h-full',
            wrapper: 'h-full flex items-center justify-center text-center',
          }"
          :disabled="isTeamSelected"
          accept="image/*"
          class="w-[180px] h-[122px]"
          color="neutral"
          description="Glisser/Déposer votre image"
          highlight
          max-files="1"
        />
        <LogoTeam
          v-else
          :team
          class="w-[180px] h-[122px]"
        />
      </div>
    </div>
  </div>
</template>
