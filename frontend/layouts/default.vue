<script lang="ts" setup>
  import HeaderComponent from '~/domains/layouts/default/HeaderComponent.vue'
  import ToTopComponent from '~/components/toTopComponent.vue'
</script>

<template>
  <UMain
    class="bg-black w-full min-h-screen bg-[url('/bg.svg')] bg-top bg-size-[100%_auto]"
  >
    <UPageHero
      :ui="{
        container: 'flex flex-col lg:grid !py-14 gap-16 sm:gap-y-24',
      }"
    >
      <template #top>
        <HeaderComponent
          class="max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 static"
        />
      </template>
      <template #default>
        <slot />
      </template>
    </UPageHero>
    <ToTopComponent />
  </UMain>
</template>
