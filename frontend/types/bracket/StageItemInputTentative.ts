import type { StageItemInputBase } from '~/types/bracket/StageItemInputBase'

export type StageItemInputTentative = StageItemInputBase & {
  team_id: null
  winner_from_stage_item_id: number
  winner_position: number
}
