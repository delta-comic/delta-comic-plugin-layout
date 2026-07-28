<script setup lang="ts">
import {
  type PageKey,
  UniItem,
  type UniContentPage,
  type UniEp,
  type UniItem as UniItemType,
} from '@delta-comic/model'
import { useConfig } from '@delta-comic/plugin'
import { DcCell, DcList } from '@delta-comic/ui'
import { SharedFunction } from '@delta-comic/utils'
import { useInfiniteQuery } from '@pinia/colada'
import { ArrowForwardIosOutlined } from '@vicons/material'
import { NDrawer, NDrawerContent, NIcon, type NScrollbar } from 'naive-ui'
import { computed, nextTick, shallowRef, useTemplateRef } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'

import { translate } from '@/i18n'
import type { StreamPage } from '@/utils/query'

import { createPageQueryKey, QueryKey } from '../default'

const props = defineProps<{
  isR18g?: boolean
  page: UniContentPage
  scrollbar: InstanceType<typeof NScrollbar> | null
  union?: UniItemType
}>()

const appConfig = useConfig()
const query = useInfiniteQuery<StreamPage<UniEp>, Error, PageKey>({
  getNextPageParam: page => page.nextPage,
  getPreviousPageParam: page => page.lastPage,
  initialPageParam: () => props.page.fetchEps.initPage,
  key: () => [QueryKey.Ep, createPageQueryKey(props.page)],
  query: async ({ pageParam, signal }) => await props.page.fetchEps.query({}, pageParam, signal),
})
const episodes = computed(
  () => query.data.value?.pages.flatMap(page => page.data) ?? new Array<UniEp>(),
)
const currentEpisodeId = computed(() => props.page.ep)
const currentEpisodeIndex = computed(() =>
  episodes.value.findIndex(episode => episode.id === currentEpisodeId.value),
)
const currentEpisode = computed(() => episodes.value[currentEpisodeIndex.value])
const show = shallowRef(false)
const episodeList = useTemplateRef<ComponentExposed<typeof DcList>>('episodeList')

const open = async () => {
  props.scrollbar?.scrollTo({ left: 0, top: 0 })
  show.value = true
  await nextTick()
  episodeList.value?.scrollParent
    ?.querySelector<HTMLElement>('[aria-current="true"]')
    ?.scrollIntoView({ block: 'center' })
}

const selectEpisode = (episode: UniEp) => {
  const union = props.union
  if (!union) return
  show.value = false
  const preload = UniItem.create({ ...union.toJSON(), thisEp: episode.toJSON() })
  void SharedFunction.call(
    'routeToContent',
    preload.contentType,
    preload.id,
    preload.thisEp.id,
    preload,
  )
}

const episodeTitle = (episode: UniEp | undefined, index: number) =>
  episode?.name || translate('layout.content.episodeFallback', { number: index + 1 })
</script>

<template>
  <button
    v-if="episodes.length > 1"
    class="relative mb-4 flex w-full dc-haptics-feedback items-center rounded border-0 py-2 pl-3 text-(--dc-color-text)"
    :class="appConfig.isDark ? 'bg-white/8' : 'bg-(--dc-gray-1)'"
    type="button"
    @click="open"
  >
    <span>{{ translate('layout.content.episode') }}</span>
    <span class="mx-0.5">·</span>
    <span class="max-w-1/2 dc-ellipsis">
      {{ episodeTitle(currentEpisode, Math.max(0, currentEpisodeIndex)) }}
    </span>
    <span class="absolute right-2 flex items-center text-xs text-(--dc-color-text-secondary)">
      {{ currentEpisodeIndex + 1 }}/{{ episodes.length }}
      <NIcon class="ml-1" size="12px"><ArrowForwardIosOutlined /></NIcon>
    </span>
  </button>

  <NDrawer v-model:show="show" height="80vh" placement="bottom">
    <NDrawerContent :native-scrollbar="false" :title="translate('layout.content.episode')">
      <DcList
        ref="episodeList"
        class="h-[70vh] w-full"
        :min-height="44"
        :source="{ type: 'stream', value: query }"
        v-slot="{ height, index, item: episode }"
      >
        <DcCell
          :aria-current="currentEpisodeId === episode.id"
          center
          clickable
          :style="{ height: `${height ?? 44}px` }"
          :title="episodeTitle(episode, index)"
          :title-class="
            currentEpisodeId === episode.id ? 'font-bold text-(--dc-color-primary)!' : undefined
          "
          @click="selectEpisode(episode)"
        />
      </DcList>
    </NDrawerContent>
  </NDrawer>
</template>