import type { UniImage } from '@delta-comic/model'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApp, h, nextTick } from 'vue'

vi.mock('@delta-comic/ui', async () => {
  const { defineComponent, h } = await import('vue')
  return {
    DcEnvironment: defineComponent({ setup: () => () => h('div', { 'data-environment': '' }) }),
    DcImage: defineComponent({
      setup(_props, { slots }) {
        return () => h('div', { 'data-image': '' }, slots.default?.())
      },
    }),
  }
})
vi.mock('swiper/modules', () => ({ Keyboard: {}, Mousewheel: {}, Virtual: {}, Zoom: {} }))
vi.mock('swiper/vue', async () => {
  const { defineComponent, h } = await import('vue')
  return {
    Swiper: defineComponent({
      setup(_props, { slots }) {
        return () => h('div', { 'data-swiper': '' }, slots.default?.())
      },
    }),
    SwiperSlide: defineComponent({
      setup(_props, { slots }) {
        return () => h('div', { 'data-slide': '' }, slots.default?.())
      },
    }),
  }
})
vi.mock('@/i18n', () => ({ translate: (key: string) => key }))

import type { ContentImagePage } from '@/model'

import ImageStage from '../../../src/view/image/ImageStage.vue'

const apps: ReturnType<typeof createApp>[] = []

afterEach(() => {
  for (const app of apps.splice(0)) app.unmount()
})

const mountStage = async (isFollowView: boolean, currentIndex = 0) => {
  const root = document.createElement('div')
  const onContinuousReaderChange = vi.fn()
  const app = createApp({
    render: () =>
      h(
        ImageStage,
        {
          canGoNext: currentIndex < 2,
          canGoPrevious: currentIndex > 0,
          config: { doubleImage: false, isFollowView, preloadImages: 2, vertical: false },
          currentIndex,
          images: ['one', 'two', 'three'] as UniImage[],
          onContinuousReaderChange,
          page: {} as ContentImagePage,
        },
        { content: ({ index }: { index: number }) => h('span', { 'data-slot': index }) },
      ),
  })
  app.mount(root)
  apps.push(app)
  await nextTick()
  return { onContinuousReaderChange, root }
}

describe('ImageStage', () => {
  it('renders continuous images and forwards content slots', async () => {
    const { onContinuousReaderChange, root } = await mountStage(true)

    expect(root.querySelectorAll('[data-continuous-image]')).toHaveLength(3)
    expect(root.querySelectorAll('[data-slot]')).toHaveLength(3)
    expect(onContinuousReaderChange).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('renders paged slides and exposes labelled boundary controls', async () => {
    const { root } = await mountStage(false)

    expect(root.querySelector('[data-swiper]')).not.toBeNull()
    expect(root.querySelectorAll('[data-slide]')).toHaveLength(3)
    const buttons = [...root.querySelectorAll('button')]
    expect(buttons.map(button => button.getAttribute('aria-label'))).toEqual([
      'layout.reader.previousPage',
      'layout.reader.nextPage',
    ])
    expect(buttons[0]?.disabled).toBe(true)
    expect(buttons[1]?.disabled).toBe(false)
  })
})