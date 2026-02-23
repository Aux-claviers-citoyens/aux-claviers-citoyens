import { describe, expect, it } from 'vitest'

import { getBreadcrumbItemsFromPath } from '../methods/getBreadcrumbItemsFromPath'

describe('getBreadcrumbItemsFromPath', () => {
  it('returns only home for root path', () => {
    expect(getBreadcrumbItemsFromPath('/')).toEqual([{ label: 'Accueil' }])
  })

  it('builds a breadcrumb chain for nested paths', () => {
    expect(getBreadcrumbItemsFromPath('/tournois/123')).toEqual([
      { label: 'Accueil', to: '/' },
      { label: 'Tournois', to: '/tournois' },
      { label: '123', to: '/tournois/123' },
    ])
  })

  it('omits link for leaderboard leaf', () => {
    expect(getBreadcrumbItemsFromPath('/leaderboard')).toEqual([
      { label: 'Accueil', to: '/' },
      { label: 'Leaderboard' },
    ])
  })
})
