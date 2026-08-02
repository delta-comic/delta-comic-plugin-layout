import type { UniImage } from '@delta-comic/model'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, h, nextTick, shallowRef } from 'vue'

const serviceMocks = vi.hoisted(() => ({
  exitFullscreen: vi.fn(),
  likeItem: vi.fn(),
  refetch: vi.fn(),
  routerBack: vi.fn(),
  useQuery: vi.fn(),
}))

vi.mock('@pinia/colada', () => ({ useQuery: serviceMocks.useQuery }))
vi.mock('@delta-comic/plugin', async () => {
  const { shallowRef } = await import('vue')
  return {
    ConfigPointer: class {},
    useConfig: () => ({
      load: () => ({
        data: shallowRef({
          doubleImage: false,
          isFollowView: false,
          preloadImages: 2,
          vertical: false,
        }),
      }),
    }),
  }
})
vi.mock('@delta-comic/ui', async () => {
  const { defineComponent, h } = await import('vue')
  return { DcImage: defineComponent({ setup: () => () => h('div', { 'data-cover': '' }) }) }
})
vi.mock('@delta-comic/utils', async () => {
  const { shallowRef } = await import('vue')
  return {
    useFullscreen: () => ({ exit: serviceMocks.exitFullscreen, isFullscreen: shallowRef(false) }),
  }
})
vi.mock('vue-router', () => ({ useRouter: () => ({ back: serviceMocks.routerBack }) }))
vi.mock('@/i18n', () => ({ translate: (key: string) => key }))
vi.mock('@/utils/content', () => ({ useLike: () => ({ likeItem: serviceMocks.likeItem }) }))
vi.mock('./image/ImageStage.vue', async () => {
  const { defineComponent, h } = await import('vue')
  return {
    default: defineComponent({
      setup(_props, { slots }) {
        return () => h('section', { 'data-stage': '' }, slots.content?.({ index: 0 }))
      },
    }),
  }
})
vi.mock('./image/ImageOverlay.vue', async () => {
  const { defineComponent, h } = await import('vue')
  return {
    default: defineComponent({
      setup(_props, { slots }) {
        return () =>
          h('aside', { 'data-overlay': '' }, [
            slots.topBar?.({ index: 0 }),
            slots.bottomBar?.({ index: 0 }),
          ])
      },
    }),
  }
})

import type { ContentImagePage } from '@/model'

import ImageView from './Image.vue'

const page = {
  contentType: ['reader', 'comic'],
  ep: 'episode-1',
  fetchImages: vi.fn(),
  id: 'item-1',
} as unknown as ContentImagePage

const apps: ReturnType<typeof createApp>[] = []
let query: {
  data: ReturnType<typeof shallowRef<UniImage[] | undefined>>
  error: ReturnType<typeof shallowRef<Error | undefined>>
  isLoading: ReturnType<typeof shallowRef<boolean>>
  refetch: ReturnType<typeof vi.fn>
}

beforeEach(() => {
  query = {
    data: shallowRef<UniImage[]>(),
    error: shallowRef<Error>(),
    isLoading: shallowRef(false),
    refetch: serviceMocks.refetch,
  }
  serviceMocks.useQuery.mockReturnValue(query)
})

afterEach(() => {
  for (const app of apps.splice(0)) app.unmount()
})

const mountView = async () => {
  const root = document.createElement('div')
  const app = createApp({
    render: () =>
      h(
        ImageView,
        { page },
        {
          bottomBar: () => h('span', { id: 'bottom-extension' }),
          content: () => h('span', { id: 'content-extension' }),
          topBar: () => h('span', { id: 'top-extension' }),
        },
      ),
  })
  app.mount(root)
  apps.push(app)
  await nextTick()
  return root
}

describe('Image view states', () => {
  it('shows a localized error and retries the image query', async () => {
    query.error.value = new Error('failed')
    const root = await mountView()

    expect(root.textContent).toContain('layout.reader.imageLoadFailed')
    root.querySelector('button')?.click()
    await nextTick()
    expect(serviceMocks.refetch).toHaveBeenCalledOnce()
  })

  it('shows an explicit empty state', async () => {
    query.data.value = []
    const root = await mountView()

    expect(root.textContent).toContain('layout.reader.imageEmpty')
  })

  it('forwards existing extension slots through the split components', async () => {
    query.data.value = ['image'] as unknown as UniImage[]
    const root = await mountView()

    expect(root.querySelector('#content-extension')).not.toBeNull()
    expect(root.querySelector('#top-extension')).not.toBeNull()
    expect(root.querySelector('#bottom-extension')).not.toBeNull()
  })
})