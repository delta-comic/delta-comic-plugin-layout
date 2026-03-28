<script setup lang="ts">
import { uni } from '@delta-comic/model'
import { Inject } from '@delta-comic/plugin'
import { useMutation, useQueryCache } from '@pinia/colada'
import { LikeFilled } from '@vicons/antd'
import { FolderOutlined, ReportGmailerrorredRound } from '@vicons/material'
import { computed } from 'vue'

import FavouriteSelect from '@/components/FavouriteSelect.vue'

import * as LayoutInject from '../default'

const $props = defineProps<{
  union?: uni.item.Item
  page: uni.content.ContentPage
}>()

const queryKey = computed(() => [
  LayoutInject.QueryKey.Detail,
  LayoutInject.createPageQueryKey($props.page)
])

const queryCache = useQueryCache()
const { mutate: likeItem } = useMutation({
  mutation: async () => (await $props.union?.like()) as void,
  onMutate() {
    const key = queryKey.value
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
  onSettled(_data, _error, _vars, { newItem }) {
    if (newItem) {
      queryCache.invalidateQueries({ key: queryKey.value })
    }
  },

  onError(err, _, { newItem, oldItem }) {
    const key = queryKey.value
    if (newItem === queryCache.getQueryData(key)) {
      queryCache.setQueryData(key, oldItem)
    }

    window.$message.error(err.message)
  }
})
</script>

<template>
  <div class="mt-8 mb-4 flex justify-around" v-if="union">
    <DcToggleIcon
      padding
      size="27px"
      :modelValue="union.isLiked"
      @click="likeItem()"
      :icon="LikeFilled"
    >
      {{ (union.likeNumber ?? 0) || '喜欢' }}
    </DcToggleIcon>
    <DcToggleIcon padding size="27px" :icon="FolderOutlined" dis-changed> 缓存 </DcToggleIcon>
    <DcToggleIcon padding size="27px" disChanged :icon="ReportGmailerrorredRound">
      举报
    </DcToggleIcon>
    <FavouriteSelect :item="union" />
    <ShareButton :page />

    <slot name="action" :="{ page, item: union }" />
    <Inject key="layout::layout::default.action" :args="{ page, item: union }" />
  </div>
</template>