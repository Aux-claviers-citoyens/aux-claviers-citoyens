import type { TeamBracket, TeamBracketPost } from '~/types/bracket/TeamBracket'
import type { Team } from '~/types/front/Team'
import type { StageItemInputFinal } from '~/types/bracket/StageItemInputFinal'

export function teamBracketToDTO(
  team: Team,
  tournamentId: number,
): TeamBracketPost {
  return <TeamBracketPost>{
    name: team.name,
    tournament_id: tournamentId,
    active: true,
    player_ids: [],
    logo_path: team.logo_path,
  }
}

export function teamBracketToDomain(team: TeamBracket): Team {
  return team
    ? <Team>{
        id: team.id,
        name: team.name,
        logo_path: team.logo_path,
        elo_score: team.score,
      }
    : ({} as Team)
}

export function stageItemInputFinalToDomain(input: StageItemInputFinal): Team {
  return input
    ? <Team>{
        id: input.team.id!,
        name: input.team.name!,
        logo_path: input.team.logo_path!,
        elo_score: Number(input.points!),
      }
    : ({} as Team)
}
