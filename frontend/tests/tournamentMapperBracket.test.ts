import { describe, expect, it, vi } from 'vitest'

import {
  tournamentBracketToDTO,
  tournamentToDomain,
  tournamentToDomainWithStage,
} from '../mappers/bracket/tournamentMapperBracket'

describe('tournamentBracketToDTO', () => {
  it('builds a tournament DTO with current time and defaults', () => {
    const fixedDate = new Date('2024-01-01T10:00:00.000Z')
    vi.useFakeTimers()
    vi.setSystemTime(fixedDate)

    const tournament = {
      name: 'Summer Cup',
      game: 'lol',
    }

    expect(tournamentBracketToDTO(tournament as never)).toEqual({
      name: 'Summer Cup',
      start_time: fixedDate.toISOString(),
      duration_minutes: 60,
      margin_minutes: 0,
      dashboard_public: true,
      dashboard_endpoint: 'lol_Summer Cup_aae',
      players_can_be_in_multiple_teams: false,
      auto_assign_courts: false,
    })

    vi.useRealTimers()
  })
})

describe('tournamentToDomain', () => {
  it('maps bracket tournament to domain tournament', () => {
    const logoPath = '8f5b4d29-2f6f-4a46-b7f7-4c7bb1a9b3ad.webp'
    const tournament = {
      id: 12,
      name: 'Summer Cup',
      logo_path: logoPath,
      dashboard_endpoint: 'lol_Summer Cup_aae',
      status: 'OPEN',
    }

    expect(logoPath).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(png|jpe?g|webp|gif|svg)$/i,
    )

    expect(tournamentToDomain(tournament as never)).toEqual({
      id: 12,
      name: 'Summer Cup',
      logo_path: logoPath,
      game: 'lol',
      status: 'En cours',
    })
  })
})

describe('tournamentToDomainWithStage', () => {
  it('hydrates teams and rounds from stage data', () => {
    const logoPath = 'c8b7e930-2f03-463a-9a96-2e73dd7e2a04.jpg'
    const tournament = {
      id: 1,
      name: 'Autumn Cup',
      game: 'rl',
      logo_path: logoPath,
      status: 'En cours',
    }

    const stages = [
      {
        id: 5,
        tournament_id: 1,
        name: 'Main Stage',
        is_active: true,
        stage_items: [
          {
            id: 9,
            stage_id: 5,
            name: 'Bracket',
            type: 'SINGLE_ELIMINATION',
            team_count: 2,
            ranking_id: 1,
            type_name: 'SINGLE_ELIMINATION',
            inputs: [
              {
                points: '1300',
                team: {
                  id: 2,
                  name: 'Alpha',
                  logo_path: logoPath,
                },
              },
              {
                points: '1100',
                team: {
                  id: 3,
                  name: 'Beta',
                  logo_path: logoPath,
                },
              },
            ],
            rounds: [
              {
                id: 2,
                matches: [
                  {
                    position_in_schedule: 1,
                    stage_item_input1: { team: { id: 2, name: 'Alpha' } },
                    stage_item_input2: { team: { id: 3, name: 'Beta' } },
                    stage_item_input1_score: 2,
                    stage_item_input2_score: 1,
                  },
                ],
              },
              {
                id: 1,
                matches: [
                  {
                    position_in_schedule: 1,
                    stage_item_input1: { team: { id: 2, name: 'Alpha' } },
                    stage_item_input2: null,
                    stage_item_input1_score: 3,
                    stage_item_input2_score: 0,
                  },
                ],
              },
            ],
          },
        ],
      },
    ]

    const result = tournamentToDomainWithStage(
      tournament as never,
      stages as never,
    )

    expect(result).toMatchObject({
      ...tournament,
      team_count: 2,
    })
    expect(result.teams).toEqual(
      expect.arrayContaining([
        { id: 2, name: 'Alpha', elo_score: 1300, logo_path: logoPath },
        { id: 3, name: 'Beta', elo_score: 1100, logo_path: logoPath },
      ]),
    )
    expect(result.rounds).toMatchObject([
      {
        id: 1,
        matches: [
          {
            team_one: { id: 2, name: 'Alpha', score: 3 },
            team_two: undefined,
          },
        ],
      },
      {
        id: 2,
        matches: [
          {
            team_one: { id: 2, name: 'Alpha', score: 2 },
            team_two: { id: 3, name: 'Beta', score: 1 },
          },
        ],
      },
    ])
  })
})
