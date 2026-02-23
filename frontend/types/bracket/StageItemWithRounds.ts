import type { RoundWithMatches } from '~/types/bracket/RoundWithMatches'
import type { StageItemInput } from '~/types/bracket/StageItemInput'
import type { EntityBase } from '~/types/bracket/common'

export type StageItemWithRounds = EntityBase &
  StageItemPost & {
    rounds: RoundWithMatches[]
    inputs: StageItemInput[]
    type_name: string
  }

export type StageItemPost = {
  stage_id: number
  name: string
  type: 'SINGLE_ELIMINATION'
  team_count: number
  ranking_id: number
}
