import type { MatchWithDetails } from '~/types/bracket/MatchWithDetails'
import type { EntityBase } from '~/types/bracket/common'

export type RoundWithMatches = EntityBase & {
  stage_item_id: number
  is_draft: boolean
  name: string
  matches: MatchWithDetails[]
}
