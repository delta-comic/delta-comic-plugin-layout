<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/virtual'
import 'swiper/css/zoom'
import { type PageKey, UniItem, type UniEp, type UniItem as UniItemType } from '@delta-comic/model'
import { useConfig } from '@delta-comic/plugin'
import { DcCell, DcEnvironment, DcImage, DcList, DcToggleIcon } from '@delta-comic/ui'
import { SharedFunction, useFullscreen } from '@delta-comic/utils'
import { useInfiniteQuery, useQuery } from '@pinia/colada'
import { LikeOutlined } from '@vicons/antd'
import { ArrowBackIosNewRound, FullscreenExitRound } from '@vicons/material'
import { AnimatePresence, motion } from 'motion-v'
import type { Swiper as SwiperClass } from 'swiper'
import { Keyboard, Mousewheel, Virtual, Zoom } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, onBeforeUnmount, shallowRef, useTemplateRef, watch } from 'vue'
import { useRouter } from 'vue-router'

import ButtonPopup from '@/components/ButtonPopup.vue'
import FavouriteSelect from '@/components/FavouriteSelect.vue'
import Settings from '@/components/Settings.vue'
import { imageViewConfig } from '@/config'
import { translate } from '@/i18n'
import { createPageQueryKey, QueryKey as LayoutQueryKey } from '@/layout/default'
import type { ContentImagePage } from '@/model'
import { useLike } from '@/utils/content'
import type { StreamPage } from '@/utils/query'
import { useSwipeDbClick } from '@/utils/ui'

import type * as ImageExtension from './image'
import { QueryKey } from './image'

const props = defineProps<{ page: ContentImagePage; union?: UniItemType }>()
defineSlots<{
  bottomBar(args: ImageExtension.BarProps): unknown
  content(args: ImageExtension.ContentProps): unknown
  topBar(args: ImageExtension.BarProps): unknown
}>()

const router = useRouter()
const readerConfig = useConfig().load(imageViewConfig).data
const swiper = shallowRef<SwiperClass>()
const continuousReader = useTemplateRef<HTMLElement>('continuousReader')
const { exit: exitFullscreen, isFullscreen } = useFullscreen()

const imageQuery = useQuery({
  key: () => [QueryKey.Images, createPageQueryKey(props.page)],
  query: ({ signal }) => props.page.fetchImages(signal),
})
const images = computed(() => imageQuery.data.value ?? [])
const currentIndex = shallowRef(0)
const selectedIndex = shallowRef(0)
watch(currentIndex, value => (selectedIndex.value = value))

const goToSlide = (offset: -1 | 1) => {
  const target = currentIndex.value + offset
  if (target < 0 || target >= images.value.length) return
  if (readerConfig.value.isFollowView) {
    continuousReader.value
      ?.querySelector(`[data-continuous-image="${target}"]`)
      ?.scrollIntoView({ behavior: 'smooth' })
  } else if (offset < 0) swiper.value?.slidePrev()
  else swiper.value?.slideNext()
}

const showMenu = shallowRef(true)
const gesture = useSwipeDbClick(() => (showMenu.value = !showMenu.value))
onBeforeUnmount(gesture.dispose)

const { likeItem } = useLike()
const episodeQuery = useInfiniteQuery<StreamPage<UniEp>, Error, PageKey>({
  getNextPageParam: page => page.nextPage,
  getPreviousPageParam: page => page.lastPage,
  initialPageParam: () => props.page.fetchEps.initPage,
  key: () => [LayoutQueryKey.Ep, createPageQueryKey(props.page)],
  query: async ({ pageParam, signal }) => await props.page.fetchEps.query({}, pageParam, signal),
})
const episodes = computed(
  () => episodeQuery.data.value?.pages.flatMap(page => page.data) ?? new Array<UniEp>(),
)
const currentEpisode = computed(() => episodes.value.find(episode => episode.id === props.page.ep))

const selectEpisode = (episode: UniEp) => {
  if (!props.union) return
  const preload = UniItem.create({ ...props.union.toJSON(), thisEp: episode.toJSON() })
  void SharedFunction.call(
    'routeToContent',
    preload.contentType,
    preload.id,
    preload.thisEp.id,
    preload,
  )
}
const episodeTitle = (episode: UniEp, index: number) =>
  episode.name || translate('layout.content.episodeFallback', { number: index + 1 })

const onContinuousScroll = (event: Event) => {
  const container = event.currentTarget as HTMLElement
  const containerTop = container.getBoundingClientRect().top
  const children = [...container.querySelectorAll<HTMLElement>('[data-continuous-image]')]
  let closestIndex = currentIndex.value
  let closestDistance = Number.POSITIVE_INFINITY
  for (const child of children) {
    const distance = Math.abs(child.getBoundingClientRect().top - containerTop)
    if (distance >= closestDistance) continue
    closestDistance = distance
    closestIndex = Number(child.dataset.continuousImage)
  }
  currentIndex.value = closestIndex
}

const selectPage = (value: number) => {
  selectedIndex.value = value
  currentIndex.value = value
  if (readerConfig.value.isFollowView) {
    continuousReader.value
      ?.querySelector(`[data-continuous-image="${value}"]`)
      ?.scrollIntoView({ behavior: 'smooth' })
  } else swiper.value?.slideTo(value, 0)
}
watch(
  () => [props.page.id, props.page.ep],
  () => {
    currentIndex.value = 0
    selectedIndex.value = 0
    swiper.value?.slideTo(0, 0)
  },
)
const progress = computed(() =>
  images.value.length <= 1 ? 0 : (currentIndex.value / (images.value.length - 1)) * 100,
)
const barArgs = computed<ImageExtension.BarProps>(() => ({
  images: images.value,
  index: currentIndex.value,
  page: props.page,
  swiper: swiper.value,
}))
</script>

<template>
  <NSpin
    :show="imageQuery.isLoading.value"
    class="relative size-full bg-black pt-safe"
    content-class="size-full"
  >
    <div
      v-if="readerConfig.isFollowView"
      ref="continuousReader"
      class="size-full overflow-y-auto bg-black"
      @click="showMenu = !showMenu"
      @scroll.passive="onContinuousScroll"
    >
      <div
        v-for="(image, index) of images"
        :key="index"
        :data-continuous-image="index"
        class="relative flex min-h-full w-full items-center justify-center"
      >
        <DcImage class="h-auto w-full" fit="contain" :src="image" />
        <slot name="content" :image :images :index :page :swiper="undefined" />
        <DcEnvironment
          :args="{ image, images, index, page, swiper: undefined }"
          name="layout::view::image.content"
        />
      </div>
    </div>

    <Swiper
      v-else
      class="size-full"
      :direction="readerConfig.vertical ? 'vertical' : 'horizontal'"
      keyboard
      :modules="[Virtual, Zoom, Keyboard, Mousewheel]"
      mousewheel
      :slides-per-view="readerConfig.doubleImage ? 2 : 1"
      :virtual="{
        enabled: true,
        addSlidesAfter: readerConfig.preloadImages,
        addSlidesBefore: readerConfig.preloadImages,
      }"
      zoom
      @double-tap="gesture.handleDbTap"
      @slide-change="currentIndex = $event.activeIndex"
      @swiper="swiper = $event"
      @touch-end="gesture.handleTouchend"
      @touch-move="gesture.handleTouchmove"
      @touch-start="gesture.handleTouchstart"
    >
      <SwiperSlide
        v-for="(image, index) of images"
        :key="index"
        class="overflow-hidden"
        :virtual-index="index"
      >
        <DcImage
          class="swiper-zoom-container size-full"
          fetchpriority="high"
          fit="contain"
          :src="image"
        >
          <template #fail
            ><div class="flex size-full items-center justify-center text-3xl text-white">
              {{ index + 1 }}
            </div></template
          >
          <template #loading
            ><div class="flex size-full items-center justify-center text-3xl text-white">
              {{ index + 1 }}
            </div></template
          >
        </DcImage>
        <slot name="content" :image :images :index :page :swiper />
        <DcEnvironment
          :args="{ image, images, index, page, swiper }"
          name="layout::view::image.content"
        />
      </SwiperSlide>
    </Swiper>

    <DcImage
      v-if="!imageQuery.isLoading.value && images.length === 0 && union"
      class="absolute inset-0 size-full"
      fit="contain"
      :src="union.$cover"
    />

    <div class="pointer-events-none absolute inset-0 z-2 flex justify-between">
      <button
        class="pointer-events-auto h-full w-10 border-0 bg-transparent"
        type="button"
        @click.stop="goToSlide(-1)"
      />
      <button
        class="pointer-events-auto h-full w-10 border-0 bg-transparent"
        type="button"
        @click.stop="goToSlide(1)"
      />
    </div>

    <AnimatePresence>
      <motion.div
        v-if="showMenu && isFullscreen"
        :animate="{ opacity: 1, translateY: '0%' }"
        class="absolute top-0 z-3 flex h-14 w-full items-center bg-[linear-gradient(rgba(0,0,0,0.5)_50%,transparent)] pt-safe text-white"
        :exit="{ opacity: 0, translateY: '-100%' }"
        :initial="{ opacity: 0, translateY: '-100%' }"
        :transition="{ duration: 0.2, ease: 'easeInOut' }"
      >
        <NButton class="mx-3! text-2xl!" text @click="router.back()">
          <template #icon
            ><NIcon color="white"><ArrowBackIosNewRound /></NIcon
          ></template>
        </NButton>
        <div class="flex min-w-0 flex-1 flex-col text-nowrap">
          <span class="dc-ellipsis text-[1rem]">{{ union?.title }}</span>
          <span class="dc-ellipsis text-xs">{{ currentEpisode?.name }}</span>
        </div>
        <div class="flex items-center gap-4 pr-3">
          <slot name="topBar" v-bind="barArgs" />
          <DcEnvironment :args="barArgs" name="layout::view::image.top-bar" />
          <DcToggleIcon
            v-if="union"
            :icon="LikeOutlined"
            :model-value="union.isLiked"
            padding
            size="30px"
            @click="likeItem(union)"
          />
          <FavouriteSelect v-if="union" :item="union" plain />
        </div>
      </motion.div>

      <motion.div
        v-if="showMenu && isFullscreen"
        :animate="{ opacity: 1, translateY: '0%' }"
        class="absolute bottom-0 z-3 flex min-h-16 w-full flex-col items-center justify-center bg-black/55 px-3 text-white backdrop-blur-md"
        :exit="{ opacity: 0, translateY: '100%' }"
        :initial="{ opacity: 0, translateY: '100%' }"
        :transition="{ duration: 0.2, ease: 'easeInOut' }"
      >
        <NSlider
          class="absolute! top-0 w-[calc(100%-1.5rem)]!"
          :max="Math.max(0, images.length - 1)"
          :min="0"
          :tooltip="true"
          :value="selectedIndex"
          @update:value="selectPage"
        />
        <span class="absolute top-1 left-3 text-xs">
          {{
            translate('layout.reader.pageProgress', {
              current: currentIndex + 1,
              total: images.length,
            })
          }}
        </span>
        <div class="mt-4 flex w-full items-center justify-end gap-4 overflow-x-auto">
          <slot name="bottomBar" v-bind="barArgs" />
          <DcEnvironment :args="barArgs" name="layout::view::image.bottom-bar" />
          <ButtonPopup body-class="bg-black/80 text-white backdrop-blur" height="70vh">
            <template #button
              ><NButton text
                ><span class="text-white">{{ translate('layout.actions.settings') }}</span></NButton
              ></template
            >
            <Settings />
          </ButtonPopup>
          <ButtonPopup
            v-if="episodes.length > 1"
            body-class="bg-black/80 text-white backdrop-blur"
            height="70vh"
          >
            <template #button
              ><NButton text
                ><span class="text-white">{{ translate('layout.content.episode') }}</span></NButton
              ></template
            >
            <h2 class="px-4 text-lg">{{ translate('layout.content.episode') }}</h2>
            <DcList
              class="h-[calc(100%-3rem)] w-full"
              :min-height="44"
              :source="{ type: 'stream', value: episodeQuery }"
              v-slot="{ height, index, item: episode }"
            >
              <DcCell
                center
                clickable
                :style="{ height: `${height ?? 44}px` }"
                :title="episodeTitle(episode, index)"
                :title-class="[
                  'text-white',
                  page.ep === episode.id && 'font-bold text-(--dc-color-primary)!',
                ]"
                @click="selectEpisode(episode)"
              />
            </DcList>
          </ButtonPopup>
          <NButton text @click="exitFullscreen()">
            <template #icon
              ><NIcon color="white" size="2rem"><FullscreenExitRound /></NIcon
            ></template>
          </NButton>
        </div>
      </motion.div>
    </AnimatePresence>

    <div
      v-if="!isFullscreen || !showMenu"
      class="absolute bottom-0 left-0 z-2 h-1 w-full bg-white/20"
    >
      <div
        class="h-full bg-(--dc-color-primary) transition-[width]"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </NSpin>
</template>