import type { EntityBase } from '~/types/bracket/common'

export type Court = EntityBase & {
  tournament_id: number
  name: string
}
