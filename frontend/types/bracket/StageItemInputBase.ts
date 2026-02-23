export type StageItemInputBase = {
  id: number
  slot: number
  tournament_id: number
  stage_item_id: number | null
  team_id: number | null
  winner_from_stage_item_id: number | null
  winner_position: number | null
  points: string
  wins: number
  draws: number
  losses: number
}
