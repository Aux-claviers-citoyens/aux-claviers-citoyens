import type { Status } from '~/types/front/Tournament'

export type TournamentRow = {
  id: number
  name: string
  status: Status
  winner: string
}
