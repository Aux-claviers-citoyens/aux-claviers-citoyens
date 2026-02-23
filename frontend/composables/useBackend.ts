import type AbstractService from '~/services/AbstractService'
import BracketService from '~/services/BracketService'
import { AccService } from '~/services/AccService'

let instance: AbstractService | null = null

export function useBackend() {
  if (!instance) {
    const mode = !!useRuntimeConfig().public.backend
    instance = mode ? new BracketService() : new AccService()
  }
  return instance
}
