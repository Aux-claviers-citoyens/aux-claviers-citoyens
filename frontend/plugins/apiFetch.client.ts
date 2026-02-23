export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const apiBase = config.public?.apiBaseUrl || ''
  const auth = useAuthStore()
  const route = useRoute()

  // Global $fetch with Authorization auto-injected when token is present
  const fetchWithAuth = $fetch.create({
    onRequest({ options }) {
      const headers = new Headers(
        options.headers as Record<string, string> | undefined,
      )
      if (process.client && !headers.has('Authorization')) {
        const { authorizationHeader } = auth
        if (authorizationHeader.value) {
          headers.set('Authorization', authorizationHeader.value)
        }
      }
      options.headers = Object.fromEntries(headers.entries())
    },
    onResponseError({ response }) {
      const status = response?.status ?? 0
      if (status === 401 || status === 403) {
        auth.logout()
        navigateTo({ path: '/login', query: { redirect: route.fullPath } })
      }
    },
  })

  // Convenience helper with API base prefix
  const apiFetch = async (path: string, opts: RequestInit = {}) =>
    fetchWithAuth(
      path.startsWith('http') ? path : `${apiBase}${path}`,
      opts as any,
    )

  // Ensure useFetch and any $fetch usage leverage the authenticated fetch
  nuxtApp.$fetch = fetchWithAuth as any
  // @ts-expect-error override global
  globalThis.$fetch = fetchWithAuth as any

  return {
    provide: { apiFetch },
  }
})
