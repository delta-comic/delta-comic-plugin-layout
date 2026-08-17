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

/**
 * 计算点赞切换后的快照：`isLiked` 取反，`likeNumber` 相应 ±1（不低于 0）。
 *
 * @since 0.9.0
 */
export const toggledLikeSnapshot = ({ isLiked, likeNumber }: LikeSnapshot): LikeSnapshot => ({
  isLiked: !isLiked,
  likeNumber: Math.max(0, (likeNumber ?? 0) + (isLiked ? -1 : 1)),
})

const applyLikeSnapshot = (item: UniItem, snapshot: LikeSnapshot) => {
  item.isLiked = snapshot.isLiked
  item.likeNumber = snapshot.likeNumber
}

/**
 * 内容条目点赞组合式函数。
 *
 * 以乐观更新方式调用 `item.like()`：发起时立即翻转本地点赞状态，
 * 失败时回滚并弹出错误提示；成功后失效相关详情缓存以重新拉取。
 * `likeItem(item)` 为对外入口，其余成员透传 `useMutation` 状态。
 *
 * @since 0.9.0
 */
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