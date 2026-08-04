<script setup lang="ts">
import type { UniItem } from '@delta-comic/model'
import { useQuery } from '@pinia/colada'
import { computed, shallowRef, useTemplateRef, watch } from 'vue'
import { useRouter } from 'vue-router'

import { translate } from '@/i18n'
import { createPageQueryKey } from '@/layout/default'
import type { ContentVideoPage } from '@/model'
import { useLike } from '@/utils/content'

import type * as VideoExtension from './video'
import { QueryKey } from './video'
import { useArtplayer } from './video/useArtplayer'
import VideoOverlay from './video/VideoOverlay.vue'

const props = defineProps<{ page: ContentVideoPage; union?: UniItem }>()
defineSlots<{
  bottomBar(args: VideoExtension.BarProps): unknown
  centerBar(args: VideoExtension.BarProps): unknown
  content(args: VideoExtension.BarProps): unknown
  topBar(args: VideoExtension.BarProps): unknown
}>()

const router = useRouter()
const container = useTemplateRef<HTMLDivElement>('player')
const poster = shallowRef<string>()
const query = useQuery({
  key: () => [QueryKey.Videos, createPageQueryKey(props.page)],
  query: ({ signal }) => props.page.fetchVideo(signal),
})
const videos = computed(() => query.data.value)
const labels = {
  line: (index: number) => translate('layout.reader.line', { number: index }),
  source: translate('layout.reader.source'),
  subtitle: translate('layout.reader.subtitle'),
  subtitleOff: translate('layout.reader.subtitleOff'),
  unsupportedType: (type: string) => translate('layout.reader.unsupportedVideoType', { type }),
  videoLoadFailed: translate('layout.reader.videoLoadFailed'),
}
const art = useArtplayer({ config: videos, container, labels, poster })

let coverGeneration = 0
watch(
  () => props.union,
  async union => {
    const generation = ++coverGeneration
    poster.value = undefined
    if (!union) return
    try {
      const value = await union.$cover.getUrl()
      if (generation === coverGeneration) poster.value = value
    } catch {
      // A failed poster must not prevent the video itself from loading.
    }
  },
  { immediate: true },
)

const { likeItem } = useLike()
const barArgs = computed<VideoExtension.BarProps>(() => ({
  isFullscreen: art.isFullscreen.value,
  page: props.page,
  player: art.player.value,
}))
const visibleError = computed(() => query.error.value ?? art.error.value)
const retry = async () => {
  if (query.error.value) await query.refetch()
  art.reload()
}
</script>

<template>
  <NSpin
    :show="query.isLoading.value"
    class="relative size-full bg-black"
    content-class="size-full"
  >
    <div ref="player" class="size-full bg-black" />

    <VideoOverlay
      :args="barArgs"
      :controls-visible="art.controlsVisible.value"
      :title="union?.title"
      :union="union"
      @back="router.back()"
      @like="union && likeItem(union)"
    >
      <template #topBar="args"><slot name="topBar" v-bind="args" /></template>
      <template #centerBar="args"><slot name="centerBar" v-bind="args" /></template>
      <template #bottomBar="args"><slot name="bottomBar" v-bind="args" /></template>
      <template #content="args"><slot name="content" v-bind="args" /></template>
    </VideoOverlay>

    <div
      v-if="visibleError"
      class="absolute inset-0 z-20 flex items-center justify-center bg-black/80 px-6"
    >
      <NResult status="error" :title="translate('layout.reader.videoLoadFailed')">
        <template #footer>
          <NButton type="primary" @click="retry">{{ translate('layout.actions.retry') }}</NButton>
        </template>
      </NResult>
    </div>
  </NSpin>
</template>