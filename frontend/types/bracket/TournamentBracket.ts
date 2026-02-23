import type { EntityBase } from '~/types/bracket/common'

export type TournamentPost = EntityBase & {
  name: string
  start_time: string
  duration_minutes: number
  margin_minutes: number
  dashboard_public: boolean
  dashboard_endpoint?: string | null
  players_can_be_in_multiple_teams: false
  auto_assign_courts: false
}

export type TournamentBracket = TournamentPost & {
  logo_path?: string | null
  status: StatusBracket
}

export type StatusBracket = 'OPEN' | 'ARCHIVED'
