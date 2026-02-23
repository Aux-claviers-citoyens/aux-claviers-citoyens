import { computed } from 'vue'
import type { User } from '~/types/front/User'

export const useAuthStore = () => {
  const backend = useBackend()
  const isProd = process.env.NODE_ENV === 'production'

  const accessToken = useCookie<string | null>('access_token', {
    sameSite: 'lax',
    secure: isProd,
    httpOnly: false,
    default: () => null,
  })
  const tokenType = useCookie<string | null>('token_type', {
    sameSite: 'lax',
    secure: isProd,
    httpOnly: false,
    default: () => null,
  })

  const isAuthenticated = computed<boolean>(() => !!accessToken.value)

  async function login(user: User): Promise<void> {
    const token = await backend.login(user)
    accessToken.value = token.token ?? null
    tokenType.value = token.type ?? null
  }

  function logout() {
    accessToken.value = null
    tokenType.value = null
  }

  const authorizationHeader = computed<string | null>(() => {
    if (!accessToken.value) return null
    const type = tokenType.value || 'Bearer'
    return `${type} ${accessToken.value}`
  })

  return {
    // state
    token: accessToken,
    tokenType: tokenType,
    // derived
    isAuthenticated,
    authorizationHeader,
    // actions
    login,
    logout,
  }
}
