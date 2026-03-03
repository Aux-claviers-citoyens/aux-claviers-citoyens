import type {
  TournamentBracket,
  TournamentPost,
} from '~/types/bracket/TournamentBracket'
import type { Tournament } from '~/types/front/Tournament'
import { stageItemInputFinalToDomain } from '~/mappers/bracket/teamMapperBracket'
import type { StageWithStageItems } from '~/types/bracket/StageWithStageItems'
import { RoundBracketToDomain } from '~/mappers/bracket/RoundMapperBracket'
import { getFinalInput } from '~/types/bracket/StageItemInput'

function withTournamentLogoPrefix(
  logoPath?: string | null,
): string | undefined {
  if (!logoPath) return undefined
  return logoPath.startsWith('/static/tournament-logos/')
    ? logoPath
    : `/static/tournament-logos/${logoPath}`
}

export function tournamentBracketToDTO(tournament: Tournament): TournamentPost {
  return <TournamentPost>{
    name: tournament.name,
    start_time: new Date().toISOString(),
    duration_minutes: 60,
    margin_minutes: 0,
    dashboard_public: true,
    dashboard_endpoint: `${tournament.game}_${tournament.name}_aae`,
    players_can_be_in_multiple_teams: false,
    auto_assign_courts: false,
  }
}

export function tournamentToDomain(tournament: TournamentBracket): Tournament {
  return <Tournament>{
    id: tournament.id,
    name: tournament.name,
    logo_path: withTournamentLogoPrefix(tournament?.logo_path),
    game: tournament.dashboard_endpoint!.split('_')[0],
    status: tournament.status === 'OPEN' ? 'En cours' : 'Archivé',
  }
}

export function tournamentToDomainWithStage(
  tournament: Tournament,
  stages: StageWithStageItems[],
): Tournament {
  return <Tournament>{
    ...tournament,
    team_count: stages[0]?.stage_items[0]!.team_count,
    teams: stages[0]?.stage_items[0]!.inputs.map((input) =>
      stageItemInputFinalToDomain(getFinalInput(input)),
    ),
    rounds: stages[0]?.stage_items[0]!.rounds.sort(
      (s1, s2) => s1.id - s2.id,
    ).map((round) => RoundBracketToDomain(round)),
  }
}
