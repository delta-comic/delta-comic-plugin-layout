import type { UniItem } from '@delta-comic/model'
import { defineMutation, useMutation, useQueryCache, type UseMutationReturn } from '@pinia/colada'
import { useMessage } from 'naive-ui'

import { createPageQueryKey, QueryKey } from '@/layout/default'

interface LikeSnapshot {
  isLiked: boolean
  likeNumber: number | undefined
}

type LikeMutationContext = { previous: LikeSnapshot }

type UseLikeReturn = Omit<
  UseMutationReturn<unknown, UniItem, Error, LikeMutationContext>,
  'mutateAsync'
> & { likeItem: (item: UniItem) => Promise<unknown> }

export const toggledLikeSnapshot = ({ isLiked, likeNumber }: LikeSnapshot): LikeSnapshot => ({
  isLiked: !isLiked,
  likeNumber: Math.max(0, (likeNumber ?? 0) + (isLiked ? -1 : 1)),
})

const applyLikeSnapshot = (item: UniItem, snapshot: LikeSnapshot) => {
  item.isLiked = snapshot.isLiked
  item.likeNumber = snapshot.likeNumber
}

export const useLike = defineMutation((): UseLikeReturn => {
  const queryCache = useQueryCache()
  const message = useMessage()
  const createQueryKey = (item: UniItem) => [QueryKey.Detail, createPageQueryKey(item)]

  const { mutateAsync: likeItem, ...mutation } = useMutation({
    key: ['layout:like'],
    mutation: async (item: UniItem) => await item.like(),
    onMutate(item) {
      const previous: LikeSnapshot = { isLiked: item.isLiked ?? false, likeNumber: item.likeNumber }
      applyLikeSnapshot(item, toggledLikeSnapshot(previous))
      void queryCache.cancelQueries({ key: createQueryKey(item) })
      return { previous }
    },
    onError(error, item, context) {
      if (context?.previous) applyLikeSnapshot(item, context.previous)
      message.error(error.message)
    },
    onSettled(_data, _error, item) {
      return queryCache.invalidateQueries({ key: createQueryKey(item) })
    },
  })

  return { ...mutation, likeItem }
})