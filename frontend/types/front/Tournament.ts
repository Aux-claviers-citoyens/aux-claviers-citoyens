import type { Round } from '~/types/front/Round'
import type { TeamWithScore } from '~/types/front/Match'

export type Tournament = {
  id?: number
  name: string
  logo_path?: string
  image?: File
  game: Games | ''
  team_count?: number
  teams?: TeamWithScore[]
  rounds?: Round[]
  status: Status
}

export enum Games {
  LeagueOfLegends = 'League Of Legends',
  RocketLeague = 'Rocket League',
  Fortnite = 'Fortnite',
}

export const games = Object.values(Games)

export type Status = 'En cours' | 'Archivé'
