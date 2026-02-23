import type { Status, Tournament } from '~/types/front/Tournament'
import type { Team } from '~/types/front/Team'
import type { Token } from '~/types/front/Token'
import type { User } from '~/types/front/User'
import type { Match } from '~/types/front/Match'

export default abstract class AbstractService {
  abstract login(user: User): Promise<Token>

  abstract getAllTournaments(): Promise<Tournament[]>

  abstract getAllTournamentsWithMatches(): Promise<Tournament[]>

  abstract getTournamentByIdWithMatches(id: number): Promise<Tournament>

  abstract postTournament(tournament: Tournament): Promise<Tournament>

  abstract deleteTournament(tournamentId: number): Promise<void>

  abstract archivedTournament(
    tournamentId: number,
    status: Status,
  ): Promise<void>

  abstract getAllTeams(): Promise<Team[]>

  abstract getAllTeam(tournamentId: number): Promise<Team[]>

  abstract postTeam(team: Team, tournamentId: number): Promise<Team>

  abstract putTeam(team: Team, tournamentId: number): Promise<Team>

  abstract deleteTeamWithNoInput(
    team: Team,
    tournamentId: number,
  ): Promise<void>

  abstract deleteTeam(tournamentId: number, teamId: number): Promise<void>

  abstract saveMatch(match: Match, tournamentId: number): Promise<void>
}
