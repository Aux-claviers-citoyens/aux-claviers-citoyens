<script setup lang="ts">
  import { Games } from '~/types/front/Tournament'
  import { breakpoints } from '~/methods/breakpoints'

  const { isAuthenticated } = useAuthStore()

  const isSmallPhone = breakpoints.smaller('sm')

  const images = [
    {
      src: '/fortnite.png',
      game: Games.Fortnite,
    },
    {
      src: '/rocket-league.png',
      game: Games.RocketLeague,
    },
    {
      src: '/league-of-legends.png',
      game: Games.LeagueOfLegends,
    },
  ]

  type Emits = {
    filterGame: [game: Games | null]
    filterName: [name: string]
  }
  const emit = defineEmits<Emits>()

  const filterName = ref<string>('')
  let filterGame: Games | null = null

  const sendFilter = (game: Games) => {
    filterGame = filterGame === game ? null : game
    emit('filterGame', filterGame)
  }
</script>

<template>
  <div>
    <h2 class="text-5xl text-center font-bold py-1 sm:py-2 md:py-4 lg:py-5">
      Rechercher un jeu ou un tournoi
    </h2>
    <UInput
      size="xl"
      highlight
      variant="Outline"
      placeholder="Rechercher"
      class="w-full py-1 sm:py-2 md:py-4 lg:py-5"
      v-model="filterName"
      @keyup="emit('filterName', filterName)"
    >
      <template #leading>
        <UIcon
          name="mdi-magnify"
          class="text-green-400 size-6"
        />
      </template>
      <template #trailing>
        <UIcon
          name="mdi-magnify"
          class="text-green-400 size-6"
        />
      </template>
    </UInput>
    <div
      class="text-center"
      v-if="!isSmallPhone"
    >
      <UButton
        label="Créer un tournoi"
        icon="lucide-plus"
        class="text-white mx-1"
        size="xl"
        variant="solid"
        to="/tournois/nouveau"
        v-if="isAuthenticated"
      />
      <UButton
        label="Liste des tournois"
        icon="lucide:list"
        class="text-white mx-1 mt-2"
        size="xl"
        variant="solid"
        to="/tournois"
      />
      <UButton
        label="Leaderboard"
        icon="lucide:medal"
        class="text-white mx-1 mt-2"
        size="xl"
        variant="solid"
        to="/leaderboard"
      />
    </div>
    <div class="py-1 sm:py-2 md:py-4 lg:py-5">
      <h2 class="text-5xl text-center font-bold">Jeux</h2>
      <div class="flex justify-center">
        <img
          v-for="image in images"
          :key="image.game"
          :src="image.src"
          alt="img"
          class="rounded-lg game-logo m-2 sm:m-5 md:m-8 lg:m-10 cursor-pointer lg:w-[200px] lg:h-[200px] md:w-[150px] md:h-[150px] sm:w-[125px] sm:h-[125px] w-[100px] h-[100px] object-contain"
          @click="sendFilter(image.game!)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .game-logo {
    border: 2px solid transparent;
    background:
      linear-gradient(#111211, #111211) padding-box,
      linear-gradient(225deg, #fd00f5 0%, #00c16a 100%) border-box;
  }

  .game-logo:hover {
    background-size: 300% 300%;
    animation: borderMove 5s ease infinite;
    box-shadow:
      0 0 20px 4px rgba(253, 0, 245, 0.4),
      0 0 40px 8px rgba(0, 193, 106, 0.3);
  }

  .game-logo::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      120deg,
      transparent 0%,
      rgba(255, 255, 255, 0.7) 50%,
      transparent 100%
    );
    opacity: 0;
    transform: translateX(-100%);
    transition:
      opacity 0.4s,
      transform 0.8s ease-in-out;
  }

  .game-logo:hover::after {
    opacity: 1;
    transform: translateX(100%);
  }

  @keyframes borderMove {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }

  .carousel > div {
    overflow: visible !important;
  }
</style>
