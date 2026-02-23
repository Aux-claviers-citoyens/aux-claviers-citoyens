import { describe, expect, it } from 'vitest'

import { TokenBracketToDomain } from '../mappers/bracket/TokenMapperBracket'

describe('TokenBracketToDomain', () => {
  it('maps the token response to domain token', () => {
    const response = {
      access_token: 'abc123',
      token_type: 'Bearer',
    }

    expect(TokenBracketToDomain(response as never)).toEqual({
      token: 'abc123',
      type: 'Bearer',
    })
  })
})
