import type { UniItem } from '@delta-comic/model'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  cancelQueries: vi.fn(),
  error: vi.fn(),
  invalidateQueries: vi.fn(),
  mutateAsync: vi.fn(),
  options: undefined as unknown,
}))

vi.mock('@pinia/colada', () => ({
  defineMutation: (factory: () => unknown) => factory,
  useMutation: (options: unknown) => {
    mocks.options = options
    return { mutateAsync: mocks.mutateAsync }
  },
  useQueryCache: () => ({
    cancelQueries: mocks.cancelQueries,
    invalidateQueries: mocks.invalidateQueries,
  }),
}))
vi.mock('naive-ui', () => ({ useMessage: () => ({ error: mocks.error }) }))
vi.mock('@/layout/default', () => ({
  createPageQueryKey: (item: { id: string }) => ({ id: item.id }),
  QueryKey: { Detail: 'layout::detail' },
}))

import { toggledLikeSnapshot, useLike } from '../../src/utils/content'

interface LikeMutationOptions {
  mutation(item: UniItem): Promise<unknown>
  onError(error: Error, item: UniItem, context?: { previous: LikeSnapshot }): void
  onMutate(item: UniItem): { previous: LikeSnapshot }
  onSettled(data: unknown, error: Error | null, item: UniItem): unknown
}

interface LikeSnapshot {
  isLiked: boolean
  likeNumber: number | undefined
}

const createItem = () =>
  ({
    contentType: 'comic',
    id: 'item-1',
    isLiked: false,
    like: vi.fn().mockResolvedValue(undefined),
    likeNumber: 4,
  }) as UniItem

const mutationOptions = () => mocks.options as LikeMutationOptions

describe('toggledLikeSnapshot', () => {
  beforeEach(() => {
    mocks.options = undefined
  })

  it('increments a newly liked item without mutating the input', () => {
    const before = { isLiked: false, likeNumber: 4 }

    expect(toggledLikeSnapshot(before)).toEqual({ isLiked: true, likeNumber: 5 })
    expect(before).toEqual({ isLiked: false, likeNumber: 4 })
  })

  it('decrements an unliked item and never produces a negative count', () => {
    expect(toggledLikeSnapshot({ isLiked: true, likeNumber: 2 })).toEqual({
      isLiked: false,
      likeNumber: 1,
    })
    expect(toggledLikeSnapshot({ isLiked: true, likeNumber: 0 })).toEqual({
      isLiked: false,
      likeNumber: 0,
    })
  })

  it('uses zero as the baseline when the server omitted a count', () => {
    expect(toggledLikeSnapshot({ isLiked: false, likeNumber: undefined })).toEqual({
      isLiked: true,
      likeNumber: 1,
    })
  })

  it('optimistically updates, rolls back failures and refreshes the matching detail query', async () => {
    useLike()
    const options = mutationOptions()
    const item = createItem()

    const context = options.onMutate(item)
    expect({ isLiked: item.isLiked, likeNumber: item.likeNumber }).toEqual({
      isLiked: true,
      likeNumber: 5,
    })
    expect(mocks.cancelQueries).toHaveBeenCalledWith({ key: ['layout::detail', { id: 'item-1' }] })

    options.onError(new Error('network failed'), item, context)
    expect({ isLiked: item.isLiked, likeNumber: item.likeNumber }).toEqual({
      isLiked: false,
      likeNumber: 4,
    })
    expect(mocks.error).toHaveBeenCalledWith('network failed')

    options.onSettled(undefined, null, item)
    expect(mocks.invalidateQueries).toHaveBeenCalledWith({
      key: ['layout::detail', { id: 'item-1' }],
    })
    await options.mutation(item)
    expect(item.like).toHaveBeenCalledOnce()
  })
})