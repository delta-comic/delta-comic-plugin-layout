<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/virtual'
import 'swiper/css/zoom'
import { Swiper as SwiperClass } from 'swiper'
import { Virtual, Zoom, HashNavigation, Keyboard } from 'swiper/modules'
import { computed, shallowRef } from 'vue'
import { inRange } from 'es-toolkit'
import { isEmpty } from 'es-toolkit/compat'
import { ArrowBackIosNewRound, FullscreenExitRound } from '@vicons/material'
import { LikeOutlined } from '@vicons/antd'
import { AnimatePresence, motion } from 'motion-v'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { Comp, Store, uni, Utils } from 'delta-comic-core'
import { imageViewConfig } from '@/config'
const $props = defineProps<{ page: uni.content.ContentImagePage }>()
const $emit = defineEmits<{ firstSlide: []; lastSlide: []; click: []; reloadPages: [] }>()

const isFullScreen = defineModel<boolean>('isFullScreen', { required: true })

const config = Store.useConfig().$load(imageViewConfig)

const swiper = shallowRef<SwiperClass>()

const images = computed(() => $props.page.images.content.data.value ?? [])
const comic = computed(() => $props.page.union.value!)

const pageOnIndex = shallowRef(0)
const selectPage = shallowRef(pageOnIndex.value)
watch(pageOnIndex, pageOnIndex => (selectPage.value = pageOnIndex))
let initTimes = 0
const onInit = async () => {
  if (!pageOnIndex.value) return
  const id = setInterval(async () => {
    initTimes++
    if (initTimes > 10) return clearInterval(id)
    swiper.value?.slideTo(pageOnIndex.value, 0)
    if (pageOnIndex.value === pageOnIndex.value) clearInterval(id)
  }, 1)
}

const goToSlide = (offset: 1 | -1, emitEvent: () => void) => {
  const targetIndex = pageOnIndex.value + offset
  if (inRange(targetIndex, 0, images.value.length)) {
    offset < 0 ? swiper.value?.slidePrev() : swiper.value?.slideNext()
  } else {
    emitEvent()
  }
}
const goPrev = () => goToSlide(-1, () => $emit('firstSlide'))
const goNext = () => goToSlide(1, () => $emit('lastSlide'))

defineExpose({
  index: pageOnIndex,
  toIndex(index: number) {
    swiper.value?.slideTo(index)
  }
})
const isShowMenu = shallowRef(true)

const { handleTouchend, handleTouchmove, handleTouchstart, handleDbTap } = (() => {
  let touchStartTime = 0
  let touchStartX = 0
  let touchStartY = 0
  let isDragging = false
  let tapEventTimerId = 0

  const THRESHOLD = 200 // 单击的时间阈值（毫秒）
  const MOVE_THRESHOLD = 30 // 拖动的滑动距离阈值
  return {
    handleTouchstart: (_swiper: SwiperClass, e: TouchEvent | PointerEvent | MouseEvent) => {
      if (e instanceof TouchEvent) {
        var pageX = e.touches[0].pageX
        var pageY = e.touches[0].pageY
      } else {
        var pageX = e.pageX
        var pageY = e.pageY
      }
      touchStartTime = Date.now() // 记录触摸开始的时间
      touchStartX = pageX
      touchStartY = pageY
      isDragging = false
    },
    handleTouchmove: (_swiper: SwiperClass, e: TouchEvent | PointerEvent | MouseEvent) => {
      if (e instanceof TouchEvent) {
        var pageX = e.touches[0].pageX
        var pageY = e.touches[0].pageY
      } else {
        var pageX = e.pageX
        var pageY = e.pageY
      }
      const distanceX = Math.abs(pageX - touchStartX)
      const distanceY = Math.abs(pageY - touchStartY)

      // 如果滑动距离超过阈值，则认为是拖动
      if (distanceX > MOVE_THRESHOLD || distanceY > MOVE_THRESHOLD) {
        isDragging = true
      }
    },
    handleTouchend: () => {
      const touchEndTime = Date.now()
      // 判断是否为单击
      if (!isDragging && touchEndTime - touchStartTime < THRESHOLD && tapEventTimerId === 0) {
        tapEventTimerId = <number>(<any>setTimeout(() => {
          tapEventTimerId = 0
          $emit('click')
          isShowMenu.value = !isShowMenu.value
          // console.log('单击', tapEventTimerId)
        }, 300))
      }
    },
    handleDbTap: () => {
      clearTimeout(tapEventTimerId)
      tapEventTimerId = 0
      // console.log("双击", tapEventTimerId)
    }
  }
})()

const nowEp = computed(() =>
  $props.page.eps.content.data.value?.find(v => v.index === $props.page.ep)
)
const isShowEpSelectPopup = shallowRef(false)
const $route = useRoute()
const nowEpId = $route.params.ep.toString()
const handleEpSelect = (preload: uni.item.RawItem) =>
  Utils.eventBus.SharedFunction.call(
    'routeToContent',
    preload.contentType,
    preload.id,
    preload.thisEp.index,
    <any>preload
  )

defineSlots<{ bottomBar(): any }>()
const union = computed(() => $props.page.union.value!)

const isLiked = shallowRef(union.value?.isLiked ?? false)
const likeSignal = new Utils.request.SmartAbortController()
const handleLike = async () => {
  likeSignal.abort()
  try {
    union.value.like(likeSignal.signal).then(v => (isLiked.value = v))
  } catch (error) {
    console.error('liked fail')
  }
}
</script>

<template>
  <NSpin :show="isEmpty(images)" class="pt-safe relative size-full bg-black *:first:size-full">
    <Swiper
      :modules="[Virtual, Zoom, HashNavigation, Keyboard]"
      @swiper="sw => (swiper = sw)"
      :initialSlide="pageOnIndex"
      :slidesPerView="config.doubleImage ? 2 : 1"
      @slideChange="sw => (pageOnIndex = sw.activeIndex)"
      class="size-full"
      @double-tap="handleDbTap"
      @touch-move="handleTouchmove"
      @touch-end="handleTouchend"
      :virtual="{
        enabled: true,
        addSlidesAfter: config.preloadImages,
        addSlidesBefore: config.preloadImages
      }"
      @init="onInit"
      zoom
      keyboard
      direction="horizontal"
      @touch-start="handleTouchstart"
    >
      <SwiperSlide
        v-for="(image, index) of images"
        :key="index"
        :virtualIndex="index"
        :data-hash="index + 1"
        class="overflow-hidden"
      >
        <Comp.Image fetchpriority="high" fit="contain" :src="image" class="swiper-zoom-container">
          <template #loading>
            <div class="size-screen flex items-center justify-center text-center">
              <span class="text-3xl text-white"> {{ index + 1 }} </span>
            </div>
          </template>
          <template #fail>
            <div class="size-screen flex items-center justify-center text-center">
              <span class="text-3xl text-white"> {{ index + 1 }} </span>
            </div>
          </template>
        </Comp.Image>
      </SwiperSlide>
    </Swiper>
    <Comp.Image
      ref="imgIns"
      class="absolute top-0 size-full"
      fit="contain"
      :src="comic.$cover"
      v-if="isEmpty(images)"
    />
    <div
      class="pointer-events-none absolute top-0 left-0 z-2 h-full w-full *:pointer-events-auto *:absolute *:top-0 *:h-full *:w-10"
    >
      <div class="left-0" @click.stop="goPrev" />
      <div class="right-0" @click.stop="goNext" />
    </div>
    <AnimatePresence>
      <motion.div
        v-if="isShowMenu && isFullScreen"
        :initial="{ translateY: '-100%', opacity: 0 }"
        class="pt-safe absolute top-0 z-3 flex h-14 w-full items-center bg-[linear-gradient(rgba(0,0,0,0.5)_50%,transparent)] text-white"
        :exit="{ translateY: '-100%', opacity: 0 }"
        :animate="{ translateY: '0%', opacity: 1 }"
        :transition="{ ease: 'easeInOut', duration: 0.2 }"
      >
        <NButton class="mx-3! text-2xl!" text color="#fff" @click="$router.back()">
          <NIcon>
            <ArrowBackIosNewRound />
          </NIcon>
        </NButton>
        <div class="flex w-1/2 flex-col text-nowrap">
          <span class="van-ellipsis text-[1rem]">{{ comic.title }}</span>
          <span class="van-ellipsis ml-1 text-xs">{{ nowEp?.name }}</span>
        </div>
        <div class="flex h-full w-full items-center justify-around">
          <Comp.ToggleIcon
            padding
            size="30px"
            v-model="isLiked"
            @click="handleLike"
            :icon="LikeOutlined"
          />
          <FavouriteSelect :item="page.union.value" v-if="page.union.value" plain />
        </div>
      </motion.div>
      <motion.div
        v-if="isShowMenu && isFullScreen"
        :initial="{ translateY: '100%', opacity: 0 }"
        :exit="{ translateY: '100%', opacity: 0 }"
        :animate="{ translateY: '0%', opacity: 1 }"
        :transition="{ ease: 'easeInOut', duration: 0.2 }"
        class="use-backdrop-blur-md absolute bottom-0 z-3 flex h-14 w-full items-center justify-center bg-black/50 text-white"
      >
        <Comp.Var :value="{ showNum: false }" v-slot="{ value }">
          <VanSlider
            v-model="selectPage"
            @change="v => pageOnIndex === v || swiper?.slideTo(v, 0)"
            :min="0"
            :max="images.length > 1 ? images.length - 1 : selectPage + 1"
            @drag-start="value.showNum = true"
            @drag-end="value.showNum = false"
            class="absolute! top-0! w-[calc(100%-1rem)]!"
            inactive-color="#8888"
          >
            <template #button>
              <div
                class="relative flex h-2.5 w-3 items-center justify-center rounded-sm bg-(--van-background-2) shadow-md"
              >
                <div
                  v-if="value.showNum"
                  class="slider-button-number absolute bottom-[calc(var(--spacing)*4+10px)] z-200000 h-5 w-6 rounded-lg bg-black/50 p-0.5 text-center text-white before:absolute before:bottom-0 before:left-1/2 before:size-2! before:-translate-x-1/2 before:translate-y-1/2 before:rotate-45 before:bg-black/50 before:content-['']"
                >
                  {{ selectPage + 1 }}
                </div>
              </div>
            </template>
          </VanSlider>
          <div class="absolute -top-3 left-2 -translate-y-full">
            {{ pageOnIndex + 1 }}&nbsp;/&nbsp;{{ images.length }}
          </div>
        </Comp.Var>
        <div class="flex w-full justify-end gap-4 pr-4 *:flex! *:items-center *:justify-center">
          <slot name="bottomBar" />
          <div v-if="(page.eps.content.data.value?.length ?? 1) > 1">
            <NButton text color="#fff" @click="isShowEpSelectPopup = true"> 选集 </NButton>
          </div>
          <div>
            <NButton class="text-3xl!" text color="#fff" @click="$router.back()">
              <NIcon>
                <FullscreenExitRound />
              </NIcon>
            </NButton>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
    <Comp.Popup
      round
      position="bottom"
      class="flex h-[70vh] flex-col bg-black/50! backdrop-blur"
      v-model:show="isShowEpSelectPopup"
      theme="dark"
    >
      <div class="flex h-10 w-full items-center pt-2 pl-8 text-lg font-bold text-white">选集</div>
      <Comp.List
        class="h-full w-full"
        :source="{ data: page.eps.content, isEnd: true }"
        :itemHeight="40"
        v-slot="{ data: { item: ep, index }, height }"
        :data-processor="v => v.toReversed()"
        ref="epSelList"
      >
        <VanCell
          clickable
          @click="handleEpSelect({ ...page.union.value!.toJSON(), thisEp: ep.toJSON() })"
          :title="ep.name || `第${page.eps.content.data.value!.length - index}话`"
          :title-class="['text-white', nowEpId === ep.index && 'font-bold !text-(--p-color)']"
          class="flex w-full items-center bg-transparent!"
          :style="{ height: `${height}px !important` }"
        >
        </VanCell>
      </Comp.List>
    </Comp.Popup>
    <AnimatePresence>
      <motion.div
        v-if="!isShowMenu || !isFullScreen"
        :initial="{ opacity: 0, translateY: '8%' }"
        :animate="{ opacity: 1, translateY: '0%' }"
        :exit="{ opacity: 0, translateY: '8%' }"
        :transition="{ duration: 0.2 }"
        class="pointer-events-auto absolute bottom-0 left-0 z-2 w-full"
      >
        <VanSlider
          v-model="pageOnIndex"
          :min="0"
          class="absolute! bottom-0! w-full!"
          :max="images.length > 1 ? images.length - 1 : 0"
          disabled
        >
          <template #button>
            <span></span>
          </template>
        </VanSlider>
      </motion.div>
    </AnimatePresence>
  </NSpin>
</template>
<style scoped lang="css">
:deep(*) {
  --van-popover-dark-background: rgba(0, 0, 0, 0.5) !important;

  &.van-popover__content {
    backdrop-filter: blur(10px);
  }
}
</style>