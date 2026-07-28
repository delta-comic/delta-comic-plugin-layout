<script setup lang="ts">
import {
  type PageKey,
  UniItem,
  type UniContentPage,
  type UniItem as UniItemType,
} from '@delta-comic/model'
import { DcEnvironment, DcWaterfall } from '@delta-comic/ui'
import { useInfiniteQuery } from '@pinia/colada'

import ItemCard from '@/components/ItemCard.vue'
import type { StreamPage } from '@/utils/query'

import { createPageQueryKey, QueryKey } from '../default'

const props = defineProps<{ page: UniContentPage; union?: UniItemType }>()
defineSlots<{ recommend(args: { item?: UniItemType; page: UniContentPage }): unknown }>()

const getItemCard = (contentType: UniItemType['contentType']) =>
  UniItem.itemCards.get(contentType) ?? ItemCard

const query = useInfiniteQuery<StreamPage<UniItemType>, Error, PageKey>({
  getNextPageParam: page => page.nextPage,
  getPreviousPageParam: page => page.lastPage,
  initialPageParam: () => props.page.fetchRecommends.initPage,
  key: () => [QueryKey.Recommends, createPageQueryKey(props.page)],
  query: async ({ pageParam, signal }) =>
    await props.page.fetchRecommends.query({}, pageParam, signal),
})
</script>

<template>
  <section class="dc-hairline-top w-full">
    <slot name="recommend" :item="union" :page />
    <DcEnvironment :args="{ item: union, page }" name="layout::layout::default.recommend" />
    <DcWaterfall
      class="min-h-40"
      :col="[1, 2]"
      :source="{ type: 'stream', value: query }"
      v-slot="{ item }"
    >
      <component :is="getItemCard(item.contentType)" :key="item.id" :item />
    </DcWaterfall>
  </section>
</template>