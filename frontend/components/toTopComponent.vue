<script setup>
  import { onMounted, onUnmounted, ref } from 'vue'

  const visible = ref(false)

  function onScroll() {
    visible.value = window.pageYOffset > 200
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => window.addEventListener('scroll', onScroll))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <UButton
    icon="ep:top"
    v-if="visible"
    @click="scrollTop"
    class="fixed bottom-4 right-4 p-3 bg-primary text-white rounded-full"
  />
</template>
