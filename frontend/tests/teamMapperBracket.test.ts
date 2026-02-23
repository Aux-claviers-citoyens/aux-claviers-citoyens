import { describe, expect, it } from 'vitest'

import {
  stageItemInputFinalToDomain,
  teamBracketToDomain,
  teamBracketToDTO,
} from '../mappers/bracket/teamMapperBracket'

const uuidImageRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(png|jpe?g|webp|gif|svg)$/i

describe('teamBracketToDTO', () => {
  it('maps a team to a bracket DTO', () => {
    const inputTeam = {
      name: 'Blue Team',
    }

    expect(teamBracketToDTO(inputTeam as never, 42)).toEqual({
      name: 'Blue Team',
      tournament_id: 42,
      active: true,
      player_ids: [],
    })
  })
})

describe('teamBracketToDomain', () => {
  it('maps a bracket team to a domain team with adjusted elo', () => {
    const logoPath = '986b91b4-d191-4d72-b4c7-8c95c5edabb8.png'
    const inputTeam = {
      id: 10,
      name: 'Red Team',
      score: 1450,
      logo_path: logoPath,
    }

    expect(logoPath).toMatch(uuidImageRegex)

    const result = teamBracketToDomain(inputTeam as never)

    expect(result).toMatchObject({
      id: 10,
      name: 'Red Team',
      elo_score: 1450,
      logo_path: logoPath,
    })
    expect(result.logo_path).toBe(logoPath)
    expect(result.logo_path).toMatch(uuidImageRegex)
  })

  it('returns an empty object when input is falsy', () => {
    expect(teamBracketToDomain(undefined as never)).toEqual({})
  })
})

describe('stageItemInputFinalToDomain', () => {
  it('maps stage input points and team data to domain team', () => {
    const logoPath = '2f1f9c7c-6b94-4d92-83e3-9f2a439b6e2b.jpg'
    const input = {
      points: '15',
      team: {
        id: 6,
        name: 'Omega',
        logo_path: logoPath,
      },
    }

    expect(stageItemInputFinalToDomain(input as never)).toEqual({
      id: 6,
      name: 'Omega',
      logo_path: logoPath,
      elo_score: 15,
    })
  })
})
