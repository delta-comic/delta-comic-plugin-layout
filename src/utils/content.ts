import { uni } from '@delta-comic/model'
import { defineMutation, useMutation, useQueryCache } from '@pinia/colada'

import * as LayoutInject from '../layout/default'

export const useLike = defineMutation(() => {
  const queryCache = useQueryCache()
  const createQueryKey = (item: uni.item.Item) => [
    LayoutInject.QueryKey.Detail,
    LayoutInject.createPageQueryKey(item)
  ]

  const { mutateAsync: likeItem, ...mutation } = useMutation({
    mutation: async (item: uni.item.Item) => await item.like(),
    onMutate(item) {
      const key = createQueryKey(item)
      const oldItem = queryCache.getQueryData<uni.item.Item>(key)!
      const newItem = uni.item.Item.create({
        ...oldItem,
        isLiked: !oldItem.isLiked,
        likeNumber: oldItem.isLiked ? (oldItem.likeNumber ?? 0) - 1 : (oldItem.likeNumber ?? 0) + 1
      })

      // update the cache with the new contact
      queryCache.setQueryData(key, newItem)
      // we cancel (without refetching) all queries that depend on the contact
      queryCache.cancelQueries({ key })

      // pass the old and new contact to the other hooks
      return { oldItem, newItem }
    },

    // on both error and success
    onSettled(_data, _error, item, { newItem }) {
      const key = createQueryKey(item)
      if (newItem) {
        queryCache.invalidateQueries({ key })
      }
    },

    onError(err, item, { newItem, oldItem }) {
      const key = createQueryKey(item)
      if (newItem === queryCache.getQueryData(key)) {
        queryCache.setQueryData(key, oldItem)
      }

      window.$message.error(err.message)
    }
  })
  return { ...mutation, likeItem }
})