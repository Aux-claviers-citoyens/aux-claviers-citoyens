import type { TeamBracket, TeamBracketPost } from '~/types/bracket/TeamBracket'
import type { Team } from '~/types/front/Team'
import type { StageItemInputFinal } from '~/types/bracket/StageItemInputFinal'

function withTeamLogoPrefix(logoPath?: string | null): string | undefined {
  if (!logoPath) return undefined
  return logoPath.startsWith('/static/team-logos/')
    ? logoPath
    : `/static/team-logos/${logoPath}`
}

export function teamBracketToDTO(
  team: Team,
  tournamentId: number,
): TeamBracketPost {
  return <TeamBracketPost>{
    name: team.name,
    tournament_id: tournamentId,
    active: true,
    player_ids: [],
    logo_path: team.logo_path
      ? team.logo_path.replace('/static/team-logos/', '')
      : undefined,
  }
}

export function teamBracketToDomain(
  team: TeamBracket,
  tournamentId: number,
): Team {
  return team
    ? <Team>{
        id: team.id,
        tournament_id: tournamentId,
        name: team.name,
        logo_path: withTeamLogoPrefix(team.logo_path),
        elo_score: team.elo_score ?? team.score,
      }
    : ({} as Team)
}

export function stageItemInputFinalToDomain(
  input: StageItemInputFinal | undefined,
): Team {
  if (!input) return {} as Team

  const points = Number(input.points)

  return <Team>{
    ...teamBracketToDomain(input.team, input.tournament_id),
    elo_score: points,
  }
}
