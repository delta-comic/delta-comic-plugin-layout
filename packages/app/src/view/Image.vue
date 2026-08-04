<script setup lang="ts">
import type { UniItem } from '@delta-comic/model'
import { useConfig } from '@delta-comic/plugin'
import { DcImage } from '@delta-comic/ui'
import { useFullscreen } from '@delta-comic/utils'
import { useQuery } from '@pinia/colada'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { imageViewConfig } from '@/config'
import { translate } from '@/i18n'
import { createPageQueryKey } from '@/layout/default'
import type { ContentImagePage } from '@/model'
import { useLike } from '@/utils/content'

import type * as ImageExtension from './image'
import { QueryKey } from './image'
import ImageOverlay from './image/ImageOverlay.vue'
import ImageStage from './image/ImageStage.vue'
import { useImageReader } from './image/useImageReader'

const props = defineProps<{ page: ContentImagePage; union?: UniItem }>()
defineSlots<{
  bottomBar(args: ImageExtension.BarProps): unknown
  content(args: ImageExtension.ContentProps): unknown
  topBar(args: ImageExtension.BarProps): unknown
}>()

const router = useRouter()
const readerConfig = useConfig().load(imageViewConfig).data
const { exit: exitFullscreen, isFullscreen } = useFullscreen()
const { likeItem } = useLike()

const imageQuery = useQuery({
  key: () => [QueryKey.Images, createPageQueryKey(props.page)],
  query: ({ signal }) => props.page.fetchImages(signal),
})
const images = computed(() => imageQuery.data.value ?? [])
const pageKey = computed(() => {
  const key = createPageQueryKey(props.page)
  return `${key.contentType}\u0000${key.id}\u0000${key.episode}`
})
const {
  canGoNext,
  canGoPrevious,
  currentIndex,
  goToSlide,
  progress,
  selectedIndex,
  selectPage,
  setContinuousReader,
  setCurrentIndex,
  setSwiper,
  showMenu,
  swiper,
  toggleMenu,
} = useImageReader({ images, isContinuous: () => readerConfig.value.isFollowView, pageKey })

const barArgs = computed<ImageExtension.BarProps>(() => ({
  images: images.value,
  index: currentIndex.value,
  page: props.page,
  swiper: swiper.value,
}))

const retry = async () => await imageQuery.refetch()
</script>

<template>
  <NSpin
    :show="imageQuery.isLoading.value"
    class="relative size-full bg-black pt-safe"
    content-class="size-full"
  >
    <ImageStage
      v-if="images.length > 0"
      :can-go-next="canGoNext"
      :can-go-previous="canGoPrevious"
      :config="readerConfig"
      :current-index="currentIndex"
      :images
      :page
      @continuous-reader-change="setContinuousReader"
      @current-index-change="setCurrentIndex"
      @navigate="goToSlide"
      @swiper-change="setSwiper"
      @toggle-menu="toggleMenu"
    >
      <template #content="args"><slot name="content" v-bind="args" /></template>
    </ImageStage>

    <DcImage
      v-else-if="!imageQuery.isLoading.value && union"
      :alt="translate('layout.reader.coverAlt')"
      class="absolute inset-0 size-full"
      fit="contain"
      :src="union.$cover"
    />

    <div
      v-if="imageQuery.error.value"
      class="absolute inset-0 z-20 flex items-center justify-center bg-black/80 px-6"
    >
      <NResult status="error" :title="translate('layout.reader.imageLoadFailed')">
        <template #footer>
          <NButton type="primary" @click="retry">{{ translate('layout.actions.retry') }}</NButton>
        </template>
      </NResult>
    </div>
    <div
      v-else-if="!imageQuery.isLoading.value && images.length === 0"
      class="absolute inset-0 z-10 flex items-center justify-center bg-black/65 px-6"
    >
      <NResult status="info" :title="translate('layout.reader.imageEmpty')" />
    </div>

    <ImageOverlay
      v-if="images.length > 0"
      :args="barArgs"
      :is-fullscreen="isFullscreen"
      :selected-index="selectedIndex"
      :show-menu="showMenu"
      :union
      @back="router.back()"
      @exit-fullscreen="exitFullscreen()"
      @like="union && likeItem(union)"
      @select-page="selectPage"
    >
      <template #topBar="args"><slot name="topBar" v-bind="args" /></template>
      <template #bottomBar="args"><slot name="bottomBar" v-bind="args" /></template>
    </ImageOverlay>

    <div
      v-if="images.length > 0 && (!isFullscreen || !showMenu)"
      class="absolute bottom-0 left-0 z-2 h-1 w-full bg-white/20"
    >
      <div
        class="h-full bg-(--dc-color-primary) transition-[width]"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </NSpin>
</template>