import { describe, expect, it } from 'vitest'

import { RoundBracketToDomain } from '../mappers/bracket/RoundMapperBracket'

describe('RoundBracketToDomain', () => {
  it('sorts matches by position and maps them to domain matches', () => {
    const matchLater = {
      id: 102,
      round_id: 7,
      position_in_schedule: 2,
      stage_item_input1: { team: { name: 'Blue' } },
      stage_item_input2: null,
      stage_item_input1_score: 3,
      stage_item_input2_score: 0,
    }

    const matchSooner = {
      id: 101,
      round_id: 7,
      position_in_schedule: 1,
      stage_item_input1: { team: { name: 'Red' } },
      stage_item_input2: { team: { name: 'Green' } },
      stage_item_input1_score: 1,
      stage_item_input2_score: 2,
    }

    const round = {
      id: 7,
      name: 'Quarterfinal',
      matches: [matchLater, matchSooner],
    }

    expect(RoundBracketToDomain(round as never)).toMatchObject({
      id: 7,
      name: 'Quarterfinal',
      matches: [
        {
          id: 101,
          round_id: 7,
          team_one: { name: 'Red', score: 1 },
          team_two: { name: 'Green', score: 2 },
        },
        {
          id: 102,
          round_id: 7,
          team_one: { name: 'Blue', score: 3 },
          team_two: undefined,
        },
      ],
    })
  })
})
