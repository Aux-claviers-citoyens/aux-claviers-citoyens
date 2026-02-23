import type { Team } from '~/types/front/Team'

const cleanTeamName = (name: string) => name.replace(/[ _-]/g, '').toUpperCase()

export const filterTeam = (teams: Team[]) =>
  teams
    .map(
      (team) =>
        <Team>{
          ...team,
          name: cleanTeamName(team.name),
        },
    )
    .filter(
      (team, index, self) =>
        index === self.findIndex((t) => t.name === team.name),
    )
