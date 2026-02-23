import type { StageItemInput } from '~/types/bracket/StageItemInput'
import type { Court } from '~/types/bracket/Court'
import type { EntityBase } from '~/types/bracket/common'

export type MatchBracketPut = EntityBase & {
  round_id: number
  stage_item_input1_score: number
  stage_item_input2_score: number
  court_id: number | null
  custom_duration_minutes: number | null
  custom_margin_minutes: number | null
}

export type MatchWithDetails = MatchBracketPut & {
  start_time: string | null
  duration_minutes: number
  margin_minutes: number
  position_in_schedule: number | null
  stage_item_input1_conflict: boolean
  stage_item_input2_conflict: boolean
  stage_item_input1_id: number | null
  stage_item_input2_id: number | null
  stage_item_input1_winner_from_match_id: number | null
  stage_item_input2_winner_from_match_id: number | null
  stage_item_input1?: StageItemInput | null
  stage_item_input2?: StageItemInput | null
  court?: Court | null
}
