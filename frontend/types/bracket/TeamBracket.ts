import type { EntityBase } from '~/types/bracket/common'

export type TeamBracketPost = {
  name: string
  active: true
  tournament_id: number
  player_ids: []
}

export type TeamBracket = TeamBracketPost &
  EntityBase & {
    logo_path: string | null
    elo_score: number
    swiss_score: number
    wins: number
    draws: number
    losses: number
    score?: number
  }

export type TeamsWithPlayersResponse = {
  count: number
  teams: TeamBracket[]
}
