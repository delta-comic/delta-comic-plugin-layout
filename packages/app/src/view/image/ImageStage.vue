<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/virtual'
import 'swiper/css/zoom'
import type { UniImage } from '@delta-comic/model'
import { DcEnvironment, DcImage } from '@delta-comic/ui'
import type { Swiper as SwiperClass } from 'swiper'
import { Keyboard, Mousewheel, Virtual, Zoom } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onBeforeUnmount, shallowRef, useTemplateRef, watch } from 'vue'

import { translate } from '@/i18n'
import type { ContentImagePage } from '@/model'
import { useSwipeDbClick } from '@/utils/ui'
import type { ContentProps, ImageReaderSettings } from '@/view/image'

const props = defineProps<{
  canGoNext: boolean
  canGoPrevious: boolean
  config: ImageReaderSettings
  currentIndex: number
  images: UniImage[]
  page: ContentImagePage
}>()
const emit = defineEmits<{
  continuousReaderChange: [value: HTMLElement | null]
  currentIndexChange: [value: number]
  navigate: [offset: -1 | 1]
  swiperChange: [value: SwiperClass]
  toggleMenu: []
}>()
defineSlots<{ content(args: ContentProps): unknown }>()

const continuousReader = useTemplateRef<HTMLElement>('continuousReader')
const swiper = shallowRef<SwiperClass>()
const gesture = useSwipeDbClick(() => emit('toggleMenu'))

watch(continuousReader, value => emit('continuousReaderChange', value), { flush: 'post' })

const setSwiper = (value: SwiperClass) => {
  swiper.value = value
  emit('swiperChange', value)
}

onBeforeUnmount(() => {
  gesture.dispose()
  emit('continuousReaderChange', null)
})
</script>

<template>
  <div
    v-if="config.isFollowView"
    ref="continuousReader"
    class="size-full overflow-y-auto bg-black"
    @click="emit('toggleMenu')"
  >
    <div
      v-for="(image, index) of images"
      :key="index"
      :data-continuous-image="index"
      class="relative flex min-h-full w-full items-center justify-center"
    >
      <DcImage class="h-auto w-full" fit="contain" :src="image">
        <template #fail>
          <div class="flex size-full items-center justify-center text-3xl text-white">
            {{ index + 1 }}
          </div>
        </template>
        <template #loading>
          <div class="flex size-full items-center justify-center text-3xl text-white">
            {{ index + 1 }}
          </div>
        </template>
      </DcImage>
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
    :direction="config.vertical ? 'vertical' : 'horizontal'"
    :initial-slide="currentIndex"
    keyboard
    :modules="[Virtual, Zoom, Keyboard, Mousewheel]"
    mousewheel
    :slides-per-view="config.doubleImage ? 2 : 1"
    :virtual="{
      enabled: true,
      addSlidesAfter: config.preloadImages,
      addSlidesBefore: config.preloadImages,
    }"
    zoom
    @double-tap="gesture.handleDbTap"
    @slide-change="emit('currentIndexChange', $event.activeIndex)"
    @swiper="setSwiper"
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
        <template #fail>
          <div class="flex size-full items-center justify-center text-3xl text-white">
            {{ index + 1 }}
          </div>
        </template>
        <template #loading>
          <div class="flex size-full items-center justify-center text-3xl text-white">
            {{ index + 1 }}
          </div>
        </template>
      </DcImage>
      <slot name="content" :image :images :index :page :swiper />
      <DcEnvironment
        :args="{ image, images, index, page, swiper }"
        name="layout::view::image.content"
      />
    </SwiperSlide>
  </Swiper>

  <div class="pointer-events-none absolute inset-0 z-2 flex justify-between">
    <button
      :aria-label="translate('layout.reader.previousPage')"
      class="pointer-events-auto h-full w-10 border-0 bg-transparent disabled:pointer-events-none"
      :disabled="!canGoPrevious"
      type="button"
      @click.stop="emit('navigate', -1)"
    />
    <button
      :aria-label="translate('layout.reader.nextPage')"
      class="pointer-events-auto h-full w-10 border-0 bg-transparent disabled:pointer-events-none"
      :disabled="!canGoNext"
      type="button"
      @click.stop="emit('navigate', 1)"
    />
  </div>
</template>