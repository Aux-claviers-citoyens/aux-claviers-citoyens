import type {
  MatchBracketPut,
  MatchWithDetails,
} from '~/types/bracket/MatchWithDetails'
import type { Match } from '~/types/front/Match'
import { getFinalInput } from '~/types/bracket/StageItemInput'
import { stageItemInputFinalToDomain } from '~/mappers/bracket/teamMapperBracket'

export function MatchToDTO(match: Match, courtId: number): MatchBracketPut {
  return <MatchBracketPut>{
    id: match.id,
    round_id: match.round_id,
    stage_item_input1_score: match.team_one?.score,
    stage_item_input2_score: match.team_two?.score,
    court_id: courtId,
    custom_duration_minutes: 0,
    custom_margin_minutes: 0,
  }
}

export function MatchBracketToDomain(match: MatchWithDetails): Match {
  const input1 = getFinalInput(match.stage_item_input1)
  const input2 = getFinalInput(match.stage_item_input2)
  return <Match>{
    id: match.id,
    round_id: match.round_id,
    team_one: input1
      ? {
          ...stageItemInputFinalToDomain(input1),
          score: match.stage_item_input1_score,
        }
      : undefined,
    team_two: input2
      ? {
          ...stageItemInputFinalToDomain(input2),
          score: match.stage_item_input2_score,
        }
      : undefined,
  }
}
