import type { Match } from '~/types/front/Match'

export type Round = {
  id: number
  name: string
  matches: Match[]
}
