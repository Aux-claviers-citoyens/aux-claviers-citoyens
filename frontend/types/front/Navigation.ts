export const items = [
  { label: 'Matchs', value: 'match', slot: 'match' },
  { label: 'Progression', value: 'progress', slot: 'progress' },
  { label: 'Participants', value: 'participants', slot: 'participants' },
] as const

export type TabValue = (typeof items)[number]['value']
