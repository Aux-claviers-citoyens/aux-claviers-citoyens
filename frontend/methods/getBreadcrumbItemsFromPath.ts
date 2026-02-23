import type { BreadcrumbItem } from '@nuxt/ui'

export const getBreadcrumbItemsFromPath = (path: string) => {
  let home: BreadcrumbItem = {
    label: 'Accueil',
  }
  if (path !== '/') {
    home = {
      ...home,
      to: '/',
    }
  }
  const tabPath = path.substring(1).split('/')
  const temp: BreadcrumbItem[] = [home]
  if (tabPath[0] !== '') {
    let path = ''
    for (let item of tabPath) {
      path = `${path}/${item}`
      const label = `${item.charAt(0).toUpperCase()}${item.slice(1)}`
      let breadcrumbItem: BreadcrumbItem
      if (item !== 'leaderboard') {
        breadcrumbItem = {
          label: label,
          to: path,
        }
      } else {
        breadcrumbItem = {
          label: label,
        }
      }
      temp.push(breadcrumbItem)
    }
  }
  return temp
}
