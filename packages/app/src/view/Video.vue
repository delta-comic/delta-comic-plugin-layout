<script setup lang="ts">
import 'hls.js'
import 'vidstack/bundle'
import 'vidstack/icons'
import 'vidstack/player/styles/default/captions.css'
import type { UniItem } from '@delta-comic/model'
import { DcEnvironment, DcToggleIcon } from '@delta-comic/ui'
import { useFullscreen } from '@delta-comic/utils'
import { useQuery } from '@pinia/colada'
import { LikeOutlined } from '@vicons/antd'
import {
  ArrowBackIosRound,
  FullscreenExitRound,
  FullscreenRound,
  PauseRound,
  PlayArrowRound,
} from '@vicons/material'
import type { MediaPlayerElement } from 'vidstack/elements'
import { computed, onBeforeUnmount, shallowRef, useTemplateRef, watch } from 'vue'
import { useRouter } from 'vue-router'

import ButtonPopup from '@/components/ButtonPopup.vue'
import FavouriteSelect from '@/components/FavouriteSelect.vue'
import Settings from '@/components/Settings.vue'
import { translate } from '@/i18n'
import { createPageQueryKey } from '@/layout/default'
import type { ContentVideoPage, VideoConfig } from '@/model'
import { useLike } from '@/utils/content'

import type * as VideoExtension from './video'
import { QueryKey } from './video'

const props = defineProps<{ page: ContentVideoPage; union?: UniItem }>()
defineSlots<{
  bottomBar(args: VideoExtension.BarProps): unknown
  centerBar(args: VideoExtension.BarProps): unknown
  content(args: VideoExtension.BarProps): unknown
  topBar(args: VideoExtension.BarProps): unknown
}>()

const router = useRouter()
const fullscreen = useFullscreen()
const player = useTemplateRef<MediaPlayerElement>('player')
const query = useQuery({
  key: () => [QueryKey.Videos, createPageQueryKey(props.page)],
  query: ({ signal }) => props.page.fetchVideo(signal),
})
const videos = computed(() => query.data.value)
const source = shallowRef<VideoConfig[number]>()

watch(
  videos,
  value => {
    source.value = value?.[0]
  },
  { immediate: true },
)
watch(
  [player, videos],
  ([playerElement, value]) => {
    if (!playerElement || !value) return
    playerElement.textTracks.clear()
    for (const textTrack of value.textTrack ?? []) playerElement.textTracks.add(textTrack)
  },
  { immediate: true },
)

watch(fullscreen.isFullscreen, async value => {
  const playerElement = player.value
  if (!playerElement || playerElement.state.fullscreen === value) return
  try {
    if (value) await playerElement.enterFullscreen()
    else await playerElement.exitFullscreen()
  } catch {
    // The host fullscreen state remains authoritative when the browser denies native fullscreen.
  }
})

const setFullscreen = async (value: boolean) => {
  if (value) await fullscreen.entry()
  else await fullscreen.exit()
}
const onFullscreenChange = (event: CustomEvent<boolean>) => void setFullscreen(event.detail)

const unlockScreenOrientation = async () => {
  try {
    screen.orientation.unlock()
  } catch {
    // Orientation locking is optional and unavailable on most desktop browsers.
  }
}
const removeRouterGuard = router.beforeEach(() => void unlockScreenOrientation())
onBeforeUnmount(() => {
  removeRouterGuard()
  void setFullscreen(false)
  player.value?.destroy()
  void unlockScreenOrientation()
})

const { likeItem } = useLike()
const barArgs = computed<VideoExtension.BarProps>(() => ({
  isFullscreen: fullscreen.isFullscreen.value,
  page: props.page,
  player: player.value,
}))
const sourceLabel = (index: number) => translate('layout.reader.line', { number: index + 1 })
const getCover = () => props.union?.$cover.getUrl() ?? Promise.resolve('')
</script>

<template>
  <NSpin
    :show="query.isLoading.value"
    class="relative size-full bg-black"
    content-class="size-full"
  >
    <media-player
      ref="player"
      autoplay
      class="relative z-1! size-full bg-black"
      keep-alive
      playsinline
      :src="source"
      :title="union?.title"
      @fullscreen-change="onFullscreenChange"
      @media-orientation-unlock-request="unlockScreenOrientation"
    >
      <media-provider class="size-full bg-black [&>video]:size-full [&>video]:object-contain" />
      <DcAwait v-if="union" :promise="getCover" v-slot="{ result }">
        <media-poster
          :alt="translate('layout.reader.coverAlt')"
          class="absolute inset-0 block size-full bg-black opacity-0 transition-opacity data-visible:opacity-100 [&>img]:size-full [&>img]:object-cover"
          :src="result"
        />
      </DcAwait>

      <media-controls
        class="pointer-events-none absolute inset-0 z-10 flex size-full flex-col text-white opacity-0 transition-opacity data-visible:opacity-100"
      >
        <media-controls-group
          class="pointer-events-auto flex h-14 items-center bg-linear-to-b from-black/60 to-transparent px-3"
        >
          <NButton v-if="fullscreen.isFullscreen.value" circle quaternary @click="router.back()">
            <template #icon
              ><NIcon color="white"><ArrowBackIosRound /></NIcon
            ></template>
          </NButton>
          <media-title class="min-w-0 flex-1 dc-ellipsis text-[15px]" />
          <div class="flex items-center gap-4">
            <slot name="topBar" v-bind="barArgs" />
            <DcEnvironment :args="barArgs" name="layout::view::video.top-bar" />
            <DcToggleIcon
              v-if="union"
              :icon="LikeOutlined"
              :model-value="union.isLiked"
              size="23px"
              @click="likeItem(union)"
            />
            <FavouriteSelect v-if="union" :item="union" plain />
            <media-pip-button class="group">
              <media-icon class="block size-7 group-data-active:hidden" type="picture-in-picture" />
              <media-icon
                class="hidden size-7 group-data-active:block"
                type="picture-in-picture-exit"
              />
            </media-pip-button>
          </div>
        </media-controls-group>

        <media-controls-group
          class="pointer-events-auto relative flex min-h-0 flex-1 items-center justify-center"
        >
          <slot name="centerBar" v-bind="barArgs" />
          <DcEnvironment :args="barArgs" name="layout::view::video.center-bar" />
          <media-play-button
            class="group flex size-16 items-center justify-center rounded-full bg-black/30"
          >
            <PauseRound class="size-12 group-data-paused:hidden" />
            <PlayArrowRound class="hidden size-12 group-data-paused:block" />
          </media-play-button>
        </media-controls-group>

        <media-controls-group
          class="pointer-events-auto flex min-h-18 flex-col justify-center gap-1 bg-linear-to-t from-black/60 to-transparent px-4"
        >
          <media-time-slider
            class="group relative inline-flex h-5 w-full cursor-pointer touch-none items-center"
          >
            <div class="relative h-1 w-full rounded bg-white/30">
              <div class="absolute h-full w-(--slider-progress) rounded bg-white/50" />
              <div class="absolute z-1 h-full w-(--slider-fill) rounded bg-(--dc-color-primary)" />
              <div
                class="absolute top-1/2 left-(--slider-fill) z-2 size-3 -translate-1/2 rounded-full bg-white"
              />
            </div>
          </media-time-slider>
          <div class="flex items-center gap-3">
            <media-time type="current" />
            <span>/</span>
            <media-time type="duration" />
            <div class="flex-1" />
            <slot name="bottomBar" v-bind="barArgs" />
            <DcEnvironment :args="barArgs" name="layout::view::video.bottom-bar" />
            <ButtonPopup
              body-class="bg-black/85 text-white backdrop-blur"
              placement="right"
              width="min(80vw, 28rem)"
            >
              <template #button>
                <NButton text
                  ><span class="text-white">{{
                    translate('layout.actions.settings')
                  }}</span></NButton
                >
              </template>
              <Settings />
            </ButtonPopup>
            <ButtonPopup
              v-if="(videos?.length ?? 0) > 1"
              body-class="flex flex-col gap-2 bg-black/85 p-4 text-white backdrop-blur"
              placement="right"
              width="min(80vw, 28rem)"
            >
              <template #button>
                <NButton text
                  ><span class="text-white">{{
                    sourceLabel(videos?.findIndex(value => value === source) ?? 0)
                  }}</span></NButton
                >
              </template>
              <NButton
                v-for="(line, index) of videos"
                :key="index"
                :type="source === line ? 'primary' : 'default'"
                @click="source = line"
              >
                {{ sourceLabel(index) }}
              </NButton>
            </ButtonPopup>
            <NButton text @click="setFullscreen(!fullscreen.isFullscreen.value)">
              <template #icon>
                <NIcon color="white" size="1.5rem">
                  <FullscreenExitRound v-if="fullscreen.isFullscreen.value" />
                  <FullscreenRound v-else />
                </NIcon>
              </template>
            </NButton>
          </div>
        </media-controls-group>
      </media-controls>

      <media-captions
        class="vds-captions absolute inset-0 bottom-2 z-10 wrap-break-word opacity-0 transition-opacity [media-player[data-captions]_&]:opacity-100 [media-player[data-preview]_&]:opacity-0"
      />
      <media-gesture action="toggle:controls" event="pointerup" />
      <media-gesture action="toggle:paused" class="absolute inset-0" event="dblclick" />
      <media-spinner
        class="pointer-events-none absolute top-1/2 left-1/2 z-20 -translate-1/2 animate-spin text-white opacity-0 [media-player[data-buffering]_&]:opacity-100"
        size="23"
        track-width="8"
      />

      <slot name="content" v-bind="barArgs" />
      <DcEnvironment :args="barArgs" name="layout::view::video.content" />
    </media-player>
  </NSpin>
</template>