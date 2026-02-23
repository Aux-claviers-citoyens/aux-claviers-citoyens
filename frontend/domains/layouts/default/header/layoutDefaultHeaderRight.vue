<script setup lang="ts">
  const { isAuthenticated, logout } = useAuthStore()
</script>

<template>
  <div>
    <UButton
      v-if="!isAuthenticated"
      label="Se connecter"
      color="neutral"
      variant="ghost"
      class="text-white"
      icon="material-symbols:login"
      to="/login"
    />
    <UButton
      v-else
      label="Se déconnecter"
      class="text-white"
      icon="material-symbols:logout"
      @click="logout"
      to="/"
    />
  </div>
</template>
