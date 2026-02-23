import type { RoundWithMatches } from '~/types/bracket/RoundWithMatches'
import type { Round } from '~/types/front/Round'
import { MatchBracketToDomain } from '~/mappers/bracket/MatchMapperBracket'

export function RoundBracketToDomain(round: RoundWithMatches): Round {
  return <Round>{
    id: round.id,
    name: round.name,
    matches: round.matches
      .sort((m1, m2) => m1.position_in_schedule! - m2.position_in_schedule!)
      .map((match) => MatchBracketToDomain(match)),
  }
}
