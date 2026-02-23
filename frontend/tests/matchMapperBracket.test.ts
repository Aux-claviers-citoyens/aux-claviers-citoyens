import { describe, expect, it } from 'vitest'

import { MatchBracketToDomain } from '../mappers/bracket/MatchMapperBracket'

describe('MatchBracketToDomain', () => {
  it('maps inputs and scores to domain teams', () => {
    const match = {
      stage_item_input1: { team: { id: 1, name: 'Blue' } },
      stage_item_input2: { team: { id: 2, name: 'Orange' } },
      stage_item_input1_score: 5,
      stage_item_input2_score: 4,
    }

    expect(MatchBracketToDomain(match as never)).toEqual({
      team_one: { id: 1, name: 'Blue', score: 5 },
      team_two: { id: 2, name: 'Orange', score: 4 },
    })
  })

  it('returns undefined teams when inputs are missing', () => {
    const match = {
      stage_item_input1: null,
      stage_item_input2: undefined,
      stage_item_input1_score: 0,
      stage_item_input2_score: 0,
    }

    expect(MatchBracketToDomain(match as never)).toEqual({
      team_one: undefined,
      team_two: undefined,
    })
  })
})
