export type EntityBase = {
  id: number
  created: string
}

export type ApiResponse<T> = {
  data: T
}
