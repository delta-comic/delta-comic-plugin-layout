import type { UniImage } from '@delta-comic/model'
import type { Swiper as SwiperClass } from 'swiper'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  shallowReadonly,
  shallowRef,
  toValue,
  watch,
  type MaybeRefOrGetter,
} from 'vue'

interface UseImageReaderOptions {
  images: MaybeRefOrGetter<UniImage[]>
  isContinuous: MaybeRefOrGetter<boolean>
  pageKey: MaybeRefOrGetter<string>
}

const continuousImageSelector = '[data-continuous-image]'

const imageIndex = (element: Element) => {
  const value = Number((element as HTMLElement).dataset.continuousImage)
  return Number.isInteger(value) ? value : undefined
}

export const useImageReader = (options: UseImageReaderOptions) => {
  const swiper = shallowRef<SwiperClass>()
  const continuousReader = shallowRef<HTMLElement | null>(null)
  const currentIndex = shallowRef(0)
  const selectedIndex = shallowRef(0)
  const showMenu = shallowRef(true)

  watch(currentIndex, value => (selectedIndex.value = value))

  const imageCount = computed(() => toValue(options.images).length)
  const canGoPrevious = computed(() => currentIndex.value > 0)
  const canGoNext = computed(() => currentIndex.value + 1 < imageCount.value)
  const progress = computed(() =>
    imageCount.value <= 1 ? 0 : (currentIndex.value / (imageCount.value - 1)) * 100,
  )

  const setCurrentIndex = (value: number) => {
    currentIndex.value = Math.max(0, Math.min(value, Math.max(0, imageCount.value - 1)))
  }

  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    continuousReader.value
      ?.querySelector<HTMLElement>(`[data-continuous-image="${index}"]`)
      ?.scrollIntoView?.({ behavior })
  }

  const goToSlide = (offset: -1 | 1) => {
    const target = currentIndex.value + offset
    if (target < 0 || target >= imageCount.value) return
    if (toValue(options.isContinuous)) scrollToIndex(target)
    else if (offset < 0) swiper.value?.slidePrev()
    else swiper.value?.slideNext()
  }

  const selectPage = (value: number) => {
    setCurrentIndex(value)
    if (toValue(options.isContinuous)) scrollToIndex(currentIndex.value)
    else swiper.value?.slideTo(currentIndex.value, 0)
  }

  const setSwiper = (value?: SwiperClass) => {
    swiper.value = value
    value?.slideTo(currentIndex.value, 0)
  }

  const setContinuousReader = (value: HTMLElement | null) => {
    continuousReader.value = value
  }

  const reset = () => {
    currentIndex.value = 0
    selectedIndex.value = 0
    swiper.value?.slideTo(0, 0)
    if (continuousReader.value) continuousReader.value.scrollTop = 0
  }

  watch(() => toValue(options.pageKey), reset)
  watch(imageCount, count => {
    if (currentIndex.value >= count) setCurrentIndex(Math.max(0, count - 1))
  })

  watch(
    () =>
      [
        toValue(options.isContinuous),
        continuousReader.value,
        toValue(options.images).length,
      ] as const,
    ([isContinuous, container], _previous, onCleanup) => {
      let stopped = false
      let dispose = () => {}
      onCleanup(() => {
        stopped = true
        dispose()
      })

      void nextTick().then(() => {
        if (stopped || !isContinuous || !container) return
        const elements = [...container.querySelectorAll<HTMLElement>(continuousImageSelector)]

        if (typeof IntersectionObserver !== 'undefined') {
          const visible = new Map<number, { ratio: number; top: number }>()
          const observer = new IntersectionObserver(
            entries => {
              for (const entry of entries) {
                const index = imageIndex(entry.target)
                if (index === undefined) continue
                visible.set(index, {
                  ratio: entry.isIntersecting ? entry.intersectionRatio : 0,
                  top: Math.abs(entry.boundingClientRect.top - (entry.rootBounds?.top ?? 0)),
                })
              }
              const closest = [...visible.entries()]
                .filter(([, value]) => value.ratio > 0)
                .sort(
                  ([, left], [, right]) => right.ratio - left.ratio || left.top - right.top,
                )[0]?.[0]
              if (closest !== undefined) setCurrentIndex(closest)
            },
            { root: container, threshold: [0, 0.25, 0.5, 0.75, 1] },
          )
          for (const element of elements) observer.observe(element)
          dispose = () => observer.disconnect()
          return
        }

        let frame: number | undefined
        const update = () => {
          frame = undefined
          const containerTop = container.getBoundingClientRect().top
          let closest = currentIndex.value
          let closestDistance = Number.POSITIVE_INFINITY
          for (const element of elements) {
            const index = imageIndex(element)
            if (index === undefined) continue
            const distance = Math.abs(element.getBoundingClientRect().top - containerTop)
            if (distance >= closestDistance) continue
            closest = index
            closestDistance = distance
          }
          setCurrentIndex(closest)
        }
        const schedule = () => {
          if (frame !== undefined) return
          frame = window.requestAnimationFrame(update)
        }
        container.addEventListener('scroll', schedule, { passive: true })
        schedule()
        dispose = () => {
          container.removeEventListener('scroll', schedule)
          if (frame !== undefined) window.cancelAnimationFrame(frame)
        }
      })
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    swiper.value = undefined
    continuousReader.value = null
  })

  return {
    canGoNext,
    canGoPrevious,
    currentIndex: shallowReadonly(currentIndex),
    goToSlide,
    progress,
    selectedIndex: shallowReadonly(selectedIndex),
    selectPage,
    setContinuousReader,
    setCurrentIndex,
    setSwiper,
    showMenu: shallowReadonly(showMenu),
    swiper: shallowReadonly(swiper),
    toggleMenu: () => (showMenu.value = !showMenu.value),
  }
}