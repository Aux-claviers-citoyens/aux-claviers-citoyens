import type { Team } from '~/types/front/Team'

export type TeamWithScore = Team & {
  score: number
  elo_score: number
}

export type Match = {
  id: number
  round_id: number
  team_one: TeamWithScore | undefined
  team_two: TeamWithScore | undefined
}
