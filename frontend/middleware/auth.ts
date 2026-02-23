export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated.value) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }
})
