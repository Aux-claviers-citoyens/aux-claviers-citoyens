import type { Status, Tournament } from '~/types/front/Tournament'
import {
  tournamentBracketToDTO,
  tournamentToDomain,
  tournamentToDomainWithStage,
} from '~/mappers/bracket/tournamentMapperBracket'
import type { TournamentBracket } from '~/types/bracket/TournamentBracket'
import type { ApiResponse } from '~/types/bracket/common'
import type { Team } from '~/types/front/Team'
import type {
  TeamBracket,
  TeamsWithPlayersResponse,
} from '~/types/bracket/TeamBracket'
import {
  teamBracketToDomain,
  teamBracketToDTO,
} from '~/mappers/bracket/teamMapperBracket'
import AbstractService from '~/services/AbstractService'
import type { StageItemPost } from '~/types/bracket/StageItemWithRounds'
import type { StageWithStageItems } from '~/types/bracket/StageWithStageItems'
import type { Court } from '~/types/bracket/Court'
import type { User } from '~/types/front/User'
import type { Token } from '~/types/front/Token'
import type { TokenResponseBracket } from '~/types/bracket/TokenResponseBracket'
import { TokenBracketToDomain } from '~/mappers/bracket/TokenMapperBracket'
import { ApiError } from '~/types/exceptions/ApiError'
import type { Match } from '~/types/front/Match'
import { MatchToDTO } from '~/mappers/bracket/MatchMapperBracket'
import { getMessageError } from '~/methods/getMessageError'

export default class BracketService extends AbstractService {
  //region Tournament APIs

  override getAllTournaments = (): Promise<Tournament[]> =>
    $fetch<ApiResponse<TournamentBracket[]>>('/api/tournaments', {
      method: 'GET',
    })
      .then((tournaments): Tournament[] =>
        tournaments.data.map((tournament) => tournamentToDomain(tournament)),
      )
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, 'Erreur lors de la récupération des tournois'),
        )
      })
  override getAllTournamentsWithMatches = async (): Promise<Tournament[]> =>
    Promise.all(
      (await this.getAllTournaments()).map(
        (tournament): Promise<Tournament> =>
          this.getAllStage(tournament.id!).then(
            (stages): Tournament =>
              tournamentToDomainWithStage(tournament, stages),
          ),
      ),
    ).catch((error: unknown) => {
      throw new ApiError(
        getMessageError(
          error,
          'Erreur lors de la récupération des tournois avec matchs',
        ),
      )
    })
  getTournamentById = (tournamentId: number): Promise<Tournament> =>
    $fetch<ApiResponse<TournamentBracket>>(`/api/tournaments/${tournamentId}`, {
      method: 'GET',
    })
      .then((tournament): Tournament => tournamentToDomain(tournament.data))
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, 'Erreur lors de la récupération du tournoi'),
        )
      })
  override getTournamentByIdWithMatches = (
    tournamentId: number,
  ): Promise<Tournament> =>
    this.getTournamentById(tournamentId)
      .then(async (tournament: Tournament) =>
        tournamentToDomainWithStage(
          tournament,
          await this.getAllStage(tournament.id!),
        ),
      )
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(
            error,
            'Erreur lors de la récupération du tournoi avec matchs',
          ),
        )
      })
  override postTournament = ({
    image,
    ...tournament
  }: Tournament): Promise<Tournament> =>
    $fetch<ApiResponse<TournamentBracket>>(`/api/tournaments`, {
      method: 'POST',
      body: tournamentBracketToDTO(tournament),
    })
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, 'Erreur lors de la création du tournoi'),
        )
      })
      .then(
        (tournamentResponse): Tournament =>
          (tournament = <Tournament>{
            ...tournamentToDomain(tournamentResponse.data),
            team_count: tournament.team_count,
          }),
      )
      //POST stage of tournament
      .then((tournament) => this.postStage(tournament))
      //Post image of tournament
      .then((tournament) =>
        image ? this.postImageTournament(image, tournament.id!) : tournament,
      )
      //Post planning of tournament
      .then(() => this.postSchedule(tournament.id!))
      //Return tournament
      .then(() => tournament)
  override deleteTournament = (tournamentId: number): Promise<void> =>
    this.getTournamentById(tournamentId)
      .then((tournament) => {
        if (tournament.status === 'Archivé')
          throw new ApiError('Le tournois est archivé et ne peut être supprimé')
      })
      .then(() => this.getAllStage(tournamentId))
      //Suppress stage items
      .then((stages) =>
        Promise.all(
          stages
            .flatMap((stage) => stage.stage_items)
            .map((item) => this.deleteStageItem(tournamentId, item.id)),
        ).then(() => stages),
      )
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(
            error,
            'Erreur lors de la suppression des éléments des phases du tournoi',
          ),
        )
      })
      //Suppress stages
      .then((stages) =>
        stages.forEach((stage) => this.deleteStage(tournamentId, stage.id)),
      )
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(
            error,
            'Erreur lors de la suppression des phases du tournoi',
          ),
        )
      })
      //Suppress teams
      .then(() =>
        this.getAllTeam(tournamentId).then((teams) =>
          teams.forEach((team) => this.deleteTeam(tournamentId, team.id!)),
        ),
      )
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, 'Erreur lors de la suppression des équipes'),
        )
      })
      //Suppress courts
      .then(() =>
        this.getAllCourt(tournamentId).then((courts) =>
          courts.forEach((court) => this.deleteCourt(tournamentId, court.id)),
        ),
      )
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(
            error,
            'Erreur lors de la suppression du terrain du tournoi',
          ),
        )
      })
      //suppress tournament
      .then(() =>
        $fetch<void>(`/api/tournaments/${tournamentId}`, {
          method: 'DELETE',
        }),
      )
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, 'Erreur lors de la suppression du tournoi'),
        )
      })

  postImageTournament = (
    image: File,
    tournamentId: number,
  ): Promise<Tournament> =>
    $fetch<ApiResponse<TournamentBracket>>(
      `/api/tournaments/${tournamentId}/logo`,
      {
        method: 'POST',
        body: this.formImage(image),
      },
    )
      .catch((error) => {
        throw new ApiError(
          getMessageError(
            error,
            "Erreur lors de l'upload de l'image du tournoi",
          ),
        )
      })
      .then((tournament) => tournamentToDomain(tournament.data))
      .catch((error) => {
        throw new ApiError(
          getMessageError(error, 'Erreur lors de la récupération du tournoi'),
        )
      })

  getAllCourt = (tournamentId: number): Promise<Court[]> =>
    $fetch<ApiResponse<Court[]>>(`/api/tournaments/${tournamentId}/courts`, {
      method: 'GET',
    })
      .then((response) => response.data)
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, 'Erreur lors de la récupération des terrains'),
        )
      })

  postCourt = (tournamentId: number): Promise<Court> =>
    $fetch<ApiResponse<Court>>(`/api/tournaments/${tournamentId}/courts`, {
      method: 'POST',
      body: {
        name: 'Default court',
      },
    })
      .then((court) => court.data)
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, 'Erreur lors de la création du terrain'),
        )
      })

  deleteCourt = (tournamentId: number, courtId: number): Promise<void> =>
    $fetch<void>(`/api/tournaments/${tournamentId}/courts/${courtId}`, {
      method: 'DELETE',
    }).catch((error: unknown) => {
      throw new ApiError(
        getMessageError(error, 'Erreur lors de la suppression du terrain'),
      )
    })

  postSchedule = (tournamentId: number): Promise<void> =>
    $fetch<void>(`/api/tournaments/${tournamentId}/schedule_matches`, {
      method: 'POST',
    }).catch((error: unknown) => {
      throw new ApiError(
        getMessageError(
          error,
          'Erreur lors de la planification des matchs du tournoi',
        ),
      )
    })

  //endregion

  //region Stages APIs

  getAllStage = (tournamentId: number): Promise<StageWithStageItems[]> =>
    $fetch<ApiResponse<StageWithStageItems[]>>(
      `/api/tournaments/${tournamentId}/stages`,
      {
        method: 'GET',
      },
    )
      .then((stages) => stages.data)
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, 'Erreur lors de la récupération des phases'),
        )
      })
  postStage = (tournament: Tournament): Promise<Tournament> =>
    $fetch<ApiResponse<StageWithStageItems>>(
      `/api/tournaments/${tournament.id}/stages`,
      {
        method: 'POST',
      },
    )
      .then((stage) => stage.data)
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(
            error,
            'Erreur lors de la création de la phase du tournoi',
          ),
        )
      })
      .then(async (stage) => ({
        stage: stage,
        court: await this.postCourt(tournament.id!),
      }))
      .then(({ stage, court }) =>
        this.postStageItem(tournament, stage.id, court.id),
      )
      .then(() => tournament)

  postStageItem = (
    tournament: Tournament,
    stageId: number,
    courtId: number,
  ): Promise<void> =>
    $fetch<void>(`/api/tournaments/${tournament.id}/stage_items`, {
      method: 'POST',
      body: <StageItemPost>{
        stage_id: stageId,
        name: 'default',
        type: 'SINGLE_ELIMINATION',
        team_count: tournament.team_count,
        ranking_id: courtId,
      },
    }).catch((error: unknown) => {
      throw new ApiError(
        getMessageError(
          error,
          "Erreur lors de la création de l'élément de phase du tournoi",
        ),
      )
    })

  deleteStage = (tournamentId: number, stageId: number): Promise<void> =>
    $fetch<void>(`/api/tournaments/${tournamentId}/stages/${stageId}`, {
      method: 'DELETE',
    }).catch((error: unknown) => {
      throw new ApiError(
        getMessageError(
          error,
          'Erreur lors de la suppression de la phase du tournoi',
        ),
      )
    })

  deleteStageItem = (
    tournamentId: number,
    stageItemId: number,
  ): Promise<void> =>
    $fetch<void>(
      `/api/tournaments/${tournamentId}/stage_items/${stageItemId}`,
      {
        method: 'DELETE',
      },
    ).catch((error: unknown) => {
      throw new ApiError(
        getMessageError(
          error,
          "Erreur lors de la suppression de l'élément de phase du tournoi",
        ),
      )
    })

  //endregion

  //region teams

  override getAllTeams = (): Promise<Team[]> =>
    this.getAllTournaments()
      .then((tournaments) =>
        Promise.all(
          tournaments.map((tournament) => this.getAllTeam(tournament.id!)),
        ),
      )
      .then((teams) => teams.flat())
      .then((teams) =>
        Array.from(new Map(teams.map((team) => [team.name, team])).values()),
      )

  override getAllTeam = (tournamentId: number): Promise<Team[]> =>
    $fetch<ApiResponse<TeamsWithPlayersResponse>>(
      `/api/tournaments/${tournamentId}/teams`,
      {
        method: 'GET',
      },
    )
      .then((teams) =>
        teams.data.teams.map((team) => teamBracketToDomain(team)),
      )
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, 'Erreur lors de la récupération des équipes'),
        )
      })

  override postTeam = (
    { image, ...team }: Team,
    tournamentId: number,
  ): Promise<Team> =>
    $fetch<ApiResponse<TeamBracket>>(`/api/tournaments/${tournamentId}/teams`, {
      method: 'POST',
      body: teamBracketToDTO(team, tournamentId),
    })
      .then((team) => teamBracketToDomain(team.data))
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, "Erreur lors de la création de l'équipe"),
        )
      })
      .then((team) => this.injectTeamIntoInput(team, tournamentId))
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(
            error,
            "Erreur lors de l'injection de l'équipe dans les matchs",
          ),
        )
      })
      .then((team) =>
        image?.name ? this.postImageTeam(tournamentId, team.id!, image) : team,
      )

  override putTeam = (
    { image, ...team }: Team,
    tournamentId: number,
  ): Promise<Team> =>
    $fetch<ApiResponse<TeamBracket>>(
      `/api/tournaments/${tournamentId}/teams/${team.id}`,
      {
        method: 'PUT',
        body: teamBracketToDTO(team, tournamentId),
      },
    )
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, "Erreur lors de la modification de l'équipe"),
        )
      })
      .then((team) => teamBracketToDomain(team.data))
      .then((team) =>
        image?.name ? this.postImageTeam(tournamentId, team.id!, image) : team,
      )

  override deleteTeam = (tournamentId: number, teamId: number): Promise<void> =>
    $fetch<void>(`/api/tournaments/${tournamentId}/teams/${teamId}`, {
      method: 'DELETE',
    }).catch((error: unknown) => {
      throw new ApiError(
        getMessageError(error, "Erreur lors de la suppression de l'équipe"),
      )
    })

  postImageTeam = (
    tournamentId: number,
    teamId: number,
    image: File,
  ): Promise<Team> =>
    $fetch<ApiResponse<TeamBracket>>(
      `/api/tournaments/${tournamentId}/teams/${teamId}/logo`,
      {
        method: 'POST',
        body: this.formImage(image),
      },
    )
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(
            error,
            "Erreur lors de l'upload de l'image de l'équipe",
          ),
        )
      })
      .then((teamReponse) => teamBracketToDomain(teamReponse.data))
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, "Erreur lors de la récupération de l'équipe"),
        )
      })

  injectTeamIntoInput = (team: Team, tournamentId: number): Promise<Team> =>
    this.getAllStage(tournamentId)
      .then((allStage) => allStage[0]!.stage_items[0]!.inputs)
      .then(
        (inputs) =>
          inputs
            .sort((i1, i2) => i1.id - i2.id)
            .filter((input) => !input.team_id)[0],
      )
      .then((input) =>
        this.putStageItemInput(
          tournamentId,
          input?.stage_item_id!,
          input?.id!,
          team.id!,
        ),
      )
      .then(() => team)
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, "Erreur lors de la récupération de l'équipe"),
        )
      })

  deleteTeamWithNoInput = (team: Team, tournamentId: number): Promise<void> =>
    this.getAllStage(tournamentId)
      .then((allStage) => allStage[0]!.stage_items[0]!.inputs)
      .then((inputs) => inputs.filter((input) => input.team_id === team.id)[0]!)
      .then((input) =>
        this.putStageItemInput(
          tournamentId,
          input?.stage_item_id!,
          input?.id!,
          null,
        ),
      )
      .then(() => this.deleteTeam(tournamentId, team.id!))

  putStageItemInput = (
    tournamentId: number,
    stageItemId: number,
    inputId: number,
    teamId: number | null,
  ): Promise<void> =>
    $fetch<void>(
      `/api/tournaments/${tournamentId}/stage_items/${stageItemId}/inputs/${inputId}`,
      {
        method: 'PUT',
        body: {
          team_id: teamId,
        },
      },
    ).catch((error: unknown) => {
      throw new ApiError(
        getMessageError(
          error,
          "Erreur lors de l'injection de l'équipe dans un match",
        ),
      )
    })

  //endregion

  formImage(image: File): FormData {
    const formData = new FormData()
    formData.append('file', image, image.name)
    return formData
  }

  override login = (user: User): Promise<Token> =>
    $fetch<TokenResponseBracket>('/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username: user.email,
        password: user.password,
      }),
    })
      .catch((error: unknown) => {
        const statusCode =
          typeof error === 'object' && error !== null && 'statusCode' in error
            ? (error as any).statusCode
            : undefined

        throw new ApiError(
          getMessageError(
            error,
            statusCode === 401
              ? 'Email ou mot de passe incorrect'
              : "Erreur lors de l'authentification de l'utilisateur",
          ),
        )
      })
      .then(TokenBracketToDomain)
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(
            error,
            "Erreur lors du traitement du token d'authentification",
          ),
        )
      })

  archivedTournament = (
    tournamentId: number,
    newStatus: Status,
  ): Promise<void> =>
    $fetch<void>(`/api/tournaments/${tournamentId}/change-status`, {
      method: 'POST',
      body: {
        status: newStatus === 'En cours' ? 'OPEN' : 'ARCHIVED',
      },
    }).catch((error: unknown) => {
      throw new ApiError(
        getMessageError(
          error,
          'Erreur lors du changement de statut du tournoi',
        ),
      )
    })

  override saveMatch = (match: Match, tournamentId: number): Promise<void> =>
    this.getAllCourt(tournamentId)
      .then((courts) => {
        const court = courts.at(0)
        if (!court) throw new ApiError('Le terrain du tournoi est introuvable')
        return court
      })
      .then((court) =>
        $fetch<void>(`/api/tournaments/${tournamentId}/matches/${match.id}`, {
          method: 'PUT',
          body: MatchToDTO(match, court.id),
        }),
      )
      .catch((error: unknown) => {
        throw new ApiError(
          getMessageError(error, 'Erreur lors de la sauvegarde du match'),
        )
      })
}
