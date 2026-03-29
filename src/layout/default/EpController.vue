<script setup lang="ts">
import { SharedFunction } from '@delta-comic/core'
import { uni } from '@delta-comic/model'
import { useConfig } from '@delta-comic/plugin'
import { useInfiniteQuery } from '@pinia/colada'
import type { NScrollbar } from 'naive-ui'
import { computed, nextTick, shallowRef, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'

import * as LayoutInject from '../default'

const $props = defineProps<{
  union?: uni.item.Item
  page: uni.content.ContentPage
  isR18g?: boolean
  scrollbar: InstanceType<typeof NScrollbar>
}>()

const $route = useRoute()
const routeToContent = (preload: uni.item.RawItem) =>
  SharedFunction.call(
    'routeToContent',
    preload.contentType,
    preload.id,
    preload.thisEp.id,
    uni.item.Item.create(preload)
  )

const config = useConfig()

const queryEps = useInfiniteQuery({
  key: () => [LayoutInject.QueryKey.Ep, LayoutInject.createPageQueryKey($props.page)],
  query: async ({ signal, pageParam }) => await $props.page.fetchEps(pageParam, signal),
  initialPageParam: $props.page.fetchEps.initialPageParam,
  getNextPageParam: lp => lp.nextPage
})
const eps = computed(() => queryEps.data.value?.pages.flat() ?? [])

const epSelList = useTemplateRef('epSelList')
const isShowEpSelectPopup = shallowRef(false)

const nowEpId = $route.params.ep.toString()
const nowEp = computed(() => eps.value.find(ep => ep.id === nowEpId))
const nowEpIndex = computed(() => eps.value.findIndex(ep => ep.id === nowEpId))
const openEpSelectPopup = async () => {
  $props.scrollbar.scrollTo(0, 0)
  isShowEpSelectPopup.value = true
  await nextTick()
  epSelList.value?.listInstance?.scrollTo({
    index: eps.value.findIndex(ep => ep.id === nowEpId)
  })
}
</script>

<template>
  <div
    class="van-haptics-feedback relative mb-4 flex w-full items-center rounded py-2 pl-3"
    :class="[
      isR18g
        ? config.isDark
          ? ''
          : 'bg-(--van-gray-1)/70'
        : config.isDark
          ? 'bg-(--van-gray-8)'
          : 'bg-(--van-gray-2)'
    ]"
    v-if="eps && eps.length > 1"
    @click="openEpSelectPopup"
  >
    <span>选集</span>
    <span class="mx-0.5">·</span>
    <span class="van-ellipsis max-w-1/2">{{ nowEp?.name || `第${nowEpIndex + 1}话` }}</span>
    <span class="absolute right-2 flex items-center text-xs text-(--van-text-color-2)">
      <span>{{ nowEpIndex + 1 }}/{{ eps.length }}</span>
      <NIcon size="12px" class="ml-1">
        <ArrowForwardIosOutlined />
      </NIcon>
    </span>
  </div>
  <DcPopup
    round
    position="bottom"
    class="flex h-[70vh] flex-col"
    v-model:show="isShowEpSelectPopup"
  >
    <div class="flex h-10 w-full items-center pt-2 pl-8 text-lg font-bold">选集</div>
    <DcList
      class="h-full w-full"
      :source="{ type: 'infinite', value: queryEps }"
      :itemHeight="40"
      v-slot="{ data: { item: ep, index }, height }"
      ref="epSelList"
    >
      <VanCell
        v-if="union"
        clickable
        @click="routeToContent({ ...union.toJSON(), thisEp: ep.toJSON() })"
        :title="ep.name || `第${index + 1}话`"
        :title-class="[nowEpId === ep.id && 'font-bold text-(--p-color)!']"
        class="flex w-full items-center"
        :style="{ height: `${height}px !important` }"
      >
      </VanCell>
    </DcList>
  </DcPopup>
</template>