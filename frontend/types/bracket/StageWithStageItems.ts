import type { StageItemWithRounds } from '~/types/bracket/StageItemWithRounds'
import type { ApiResponse, EntityBase } from '~/types/bracket/common'

export type StageWithStageItems = EntityBase & {
  tournament_id: number
  name: string
  is_active: boolean
  stage_items: StageItemWithRounds[]
}

export type StagesWithStageItemsResponse = ApiResponse<StageWithStageItems[]>
