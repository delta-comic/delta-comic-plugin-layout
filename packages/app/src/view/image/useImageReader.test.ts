import type { UniImage } from '@delta-comic/model'
import type { Swiper as SwiperClass } from 'swiper'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApp, h, nextTick, shallowRef } from 'vue'

import { useImageReader } from './useImageReader'

const flush = async () => {
  await nextTick()
  await Promise.resolve()
  await nextTick()
}

const mountedApps: ReturnType<typeof createApp>[] = []

afterEach(() => {
  for (const app of mountedApps.splice(0)) app.unmount()
})

const mountReader = (continuous = false) => {
  const images = shallowRef(['one', 'two', 'three'] as unknown as UniImage[])
  const isContinuous = shallowRef(continuous)
  const pageKey = shallowRef('page-1')
  let reader!: ReturnType<typeof useImageReader>
  const app = createApp({
    setup() {
      reader = useImageReader({ images, isContinuous, pageKey })
      return () => h('div')
    },
  })
  app.mount(document.createElement('div'))
  mountedApps.push(app)
  return { app, images, isContinuous, pageKey, reader }
}

const createContinuousContainer = () => {
  const container = document.createElement('div')
  const elements = Array.from({ length: 3 }, (_, index) => {
    const element = document.createElement('div')
    element.dataset.continuousImage = String(index)
    container.append(element)
    return element
  })
  return { container, elements }
}

describe('useImageReader', () => {
  it('coordinates paged navigation, selection, progress, and page resets', async () => {
    const mounted = mountReader()
    const swiper = {
      slideNext: vi.fn(),
      slidePrev: vi.fn(),
      slideTo: vi.fn(),
    } as unknown as SwiperClass
    mounted.reader.setSwiper(swiper)

    mounted.reader.setCurrentIndex(1)
    expect(mounted.reader.progress.value).toBe(50)
    expect(mounted.reader.canGoNext.value).toBe(true)
    expect(mounted.reader.canGoPrevious.value).toBe(true)

    mounted.reader.goToSlide(-1)
    mounted.reader.goToSlide(1)
    expect(swiper.slidePrev).toHaveBeenCalledOnce()
    expect(swiper.slideNext).toHaveBeenCalledOnce()

    mounted.reader.selectPage(2)
    expect(mounted.reader.currentIndex.value).toBe(2)
    expect(swiper.slideTo).toHaveBeenLastCalledWith(2, 0)

    mounted.pageKey.value = 'page-2'
    await flush()
    expect(mounted.reader.currentIndex.value).toBe(0)
    expect(swiper.slideTo).toHaveBeenLastCalledWith(0, 0)
  })

  it('tracks the most visible continuous image with IntersectionObserver', async () => {
    const instances: Array<{
      callback: IntersectionObserverCallback
      disconnect: ReturnType<typeof vi.fn>
      observe: ReturnType<typeof vi.fn>
    }> = []
    class FakeIntersectionObserver {
      public callback: IntersectionObserverCallback
      public disconnect = vi.fn()
      public observe = vi.fn()

      public constructor(callback: IntersectionObserverCallback) {
        this.callback = callback
        instances.push(this)
      }
    }
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver)
    const mounted = mountReader(true)
    const { container, elements } = createContinuousContainer()
    const scrollIntoView = vi.fn()
    elements[1]!.scrollIntoView = scrollIntoView
    mounted.reader.setContinuousReader(container)
    await flush()

    const observer = instances[0]!
    expect(observer.observe).toHaveBeenCalledTimes(3)
    observer.callback(
      [
        {
          boundingClientRect: { top: 10 },
          intersectionRatio: 0.25,
          isIntersecting: true,
          rootBounds: { top: 0 },
          target: elements[0],
        },
        {
          boundingClientRect: { top: 100 },
          intersectionRatio: 0.75,
          isIntersecting: true,
          rootBounds: { top: 0 },
          target: elements[1],
        },
      ] as unknown as IntersectionObserverEntry[],
      observer as unknown as IntersectionObserver,
    )
    expect(mounted.reader.currentIndex.value).toBe(1)

    mounted.reader.setCurrentIndex(0)
    mounted.reader.goToSlide(1)
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    mounted.app.unmount()
    mountedApps.pop()
    expect(observer.disconnect).toHaveBeenCalledOnce()
  })

  it('uses one animation-frame layout pass when IntersectionObserver is unavailable', async () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    let frameCallback: FrameRequestCallback | undefined
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      frameCallback = callback
      return 1
    })
    const mounted = mountReader(true)
    const { container, elements } = createContinuousContainer()
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({ top: 0 } as DOMRect)
    vi.spyOn(elements[0]!, 'getBoundingClientRect').mockReturnValue({ top: 500 } as DOMRect)
    vi.spyOn(elements[1]!, 'getBoundingClientRect').mockReturnValue({ top: 20 } as DOMRect)
    vi.spyOn(elements[2]!, 'getBoundingClientRect').mockReturnValue({ top: 900 } as DOMRect)

    mounted.reader.setContinuousReader(container)
    await flush()
    expect(window.requestAnimationFrame).toHaveBeenCalledOnce()
    frameCallback?.(0)
    expect(mounted.reader.currentIndex.value).toBe(1)

    container.dispatchEvent(new Event('scroll'))
    container.dispatchEvent(new Event('scroll'))
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2)
  })
})