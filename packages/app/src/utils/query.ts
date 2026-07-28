import type { PageKey } from '@delta-comic/model'

export interface StreamPage<T extends object> {
  data: T[]
  lastPage?: PageKey
  nextPage?: PageKey
}