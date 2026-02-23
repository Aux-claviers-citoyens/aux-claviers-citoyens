import type { Token } from '~/types/front/Token'
import type { TokenResponseBracket } from '~/types/bracket/TokenResponseBracket'

export function TokenBracketToDomain(token: TokenResponseBracket): Token {
  return <Token>{
    token: token.access_token,
    type: token.token_type,
  }
}
