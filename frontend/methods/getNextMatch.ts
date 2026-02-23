import type { Match } from '~/types/front/Match'
import type { Tournament } from '~/types/front/Tournament'

export const getNextMatch = (tournament: Tournament): Match | undefined =>
  tournament.rounds
    ?.flatMap((round) => round.matches)
    .filter((match) => match.team_one != null && match.team_two != null)
    .filter((match) => match.team_one!.score == 0 && match.team_two!.score == 0)
    .sort((match1, match2) => match1.id - match2.id)
    .at(0)
