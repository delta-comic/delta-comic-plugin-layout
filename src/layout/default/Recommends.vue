<script setup lang="ts">
import { uni } from '@delta-comic/model'
import { useQuery } from '@pinia/colada'

import ItemCard from '@/components/ItemCard.vue'

import * as LayoutInject from '../default'

const $props = defineProps<{
  union?: uni.item.Item
  page: uni.content.ContentPage
}>()

const getItemCard = (contentType: uni.content.ContentType_) =>
  uni.item.Item.itemCards.get(contentType) ?? ItemCard

const recommendsQuery = useQuery({
  key: () => [LayoutInject.QueryKey.Recommends],
  query: async ({ signal }) =>
    (await $props.page.fetchRecommends.query({}, $props.page.fetchRecommends.initPage, signal)).data
})
</script>

<template>
  <div class="van-hairline--top w-full *:bg-transparent">
    <slot name="recommend" :="{ page, item: union }" />
    <Inject key="layout::layout::default.recommend" :args="{ page, item: union }" />
    <component
      :is="getItemCard(item.contentType)"
      :item
      v-for="item of recommendsQuery.data.value"
    />
  </div>
</template>