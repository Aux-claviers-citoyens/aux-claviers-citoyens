import type { StageItemInputBase } from '~/types/bracket/StageItemInputBase'

export type StageItemInputEmpty = StageItemInputBase & {
  team_id: null
  winner_from_stage_item_id: null
  winner_position: null
}
