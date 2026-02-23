import type { TeamBracket } from '~/types/bracket/TeamBracket'
import type { StageItemInputBase } from '~/types/bracket/StageItemInputBase'

export type StageItemInputFinal = StageItemInputBase & {
  team_id: number
  team: TeamBracket
}
