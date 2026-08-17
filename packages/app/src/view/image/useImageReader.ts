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
  type ComputedRef,
  type MaybeRefOrGetter,
  type ShallowRef,
} from 'vue'

/** `useImageReader` 的入参。 */
interface UseImageReaderOptions {
  /** 全部图片列表，长度变化时会自动校正当前下标。 */
  images: MaybeRefOrGetter<UniImage[]>
  /** 是否为连续滚动阅读模式；`false` 时走 Swiper 分页。 */
  isContinuous: MaybeRefOrGetter<boolean>
  /** 内容页标识，变化时重置阅读位置。 */
  pageKey: MaybeRefOrGetter<string>
}

/** `useImageReader` 的返回值。 */
interface UseImageReaderReturn {
  /** 是否还有下一张图片。 */
  canGoNext: ComputedRef<boolean>
  /** 是否还有上一张图片。 */
  canGoPrevious: ComputedRef<boolean>
  /** 当前阅读下标（已校正到合法范围）。 */
  currentIndex: Readonly<ShallowRef<number>>
  /** 按偏移量（-1 上一张 / 1 下一张）切换图片。 */
  goToSlide: (offset: -1 | 1) => void
  /** 阅读进度百分比（0-100），仅一张图时为 0。 */
  progress: ComputedRef<number>
  /** 用户当前选中的下标（与 `currentIndex` 同步）。 */
  selectedIndex: Readonly<ShallowRef<number>>
  /** 跳转到指定页。 */
  selectPage: (value: number) => void
  /** 注册连续滚动阅读容器，用于滚动定位与可见性追踪。 */
  setContinuousReader: (value: HTMLElement | null) => void
  /** 直接设置当前下标（自动钳制范围）。 */
  setCurrentIndex: (value: number) => void
  /** 注册 Swiper 实例；分页模式下接管切换。 */
  setSwiper: (value?: SwiperClass) => void
  /** 是否显示阅读菜单。 */
  showMenu: Readonly<ShallowRef<boolean>>
  /** 当前 Swiper 实例。 */
  swiper: Readonly<ShallowRef<SwiperClass | undefined>>
  /** 切换菜单显隐。 */
  toggleMenu: () => void
}

const continuousImageSelector = '[data-continuous-image]'

const imageIndex = (element: Element) => {
  const value = Number((element as HTMLElement).dataset.continuousImage)
  return Number.isInteger(value) ? value : undefined
}

/**
 * 图片阅读器组合式函数。
 *
 * 统一管理分页（Swiper）与连续滚动两种阅读模式的当前页定位、
 * 进度计算与菜单显隐。连续模式下通过 IntersectionObserver（缺失时
 * 回退滚动监听）追踪当前可见图片。
 *
 * @since 0.9.0
 */
export const useImageReader = (options: UseImageReaderOptions): UseImageReaderReturn => {
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