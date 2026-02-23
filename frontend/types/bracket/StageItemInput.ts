import type { StageItemInputTentative } from '~/types/bracket/StageItemInputTentative'
import type { StageItemInputFinal } from '~/types/bracket/StageItemInputFinal'
import type { StageItemInputEmpty } from '~/types/bracket/StageItemInputEmpty'

export type StageItemInput =
  | StageItemInputTentative
  | StageItemInputFinal
  | StageItemInputEmpty

export function getFinalInput(
  input: StageItemInput | undefined | null,
): StageItemInputFinal | undefined {
  if (input && 'team' in input) return input as StageItemInputFinal
  return undefined
}
