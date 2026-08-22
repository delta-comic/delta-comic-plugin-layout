import { UniItem, type UniContentPage, type UniEp } from '@delta-comic/model'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'

const serviceMocks = vi.hoisted(() => ({ sharedCall: vi.fn(), useInfiniteQuery: vi.fn() }))

vi.mock('@delta-comic/utils', () => ({ SharedFunction: { call: serviceMocks.sharedCall } }))
vi.mock('@pinia/colada', () => ({ useInfiniteQuery: serviceMocks.useInfiniteQuery }))
vi.mock('@/i18n', () => ({
  translate: (key: string, params?: Record<string, number | string>) =>
    `${key}:${params?.number ?? ''}`,
}))

import { useEpisodes } from '../../src/composables/useEpisodes'

const episodes = [
  { id: 'episode-1', name: 'One', toJSON: () => ({ id: 'episode-1', name: 'One' }) },
  { id: 'episode-2', name: 'Two', toJSON: () => ({ id: 'episode-2', name: 'Two' }) },
] as UniEp[]

const page = {
  contentType: ['reader', 'comic'],
  ep: 'episode-2',
  fetchEps: { initPage: 'first', query: vi.fn() },
  id: 'item-1',
} as UniContentPage

beforeEach(() => {
  serviceMocks.useInfiniteQuery.mockReturnValue({
    data: shallowRef({ pages: [{ data: episodes }] }),
  })
})

describe('useEpisodes', () => {
  it('provides consistent episode state for each consumer', () => {
    const first = useEpisodes({ page })
    const second = useEpisodes({ page })

    expect(first.episodes.value).toEqual(episodes)
    expect(second.episodes.value).toEqual(episodes)
    expect(first.currentEpisode.value).toBe(episodes[1])
    expect(second.currentEpisodeIndex.value).toBe(1)

    const firstOptions = serviceMocks.useInfiniteQuery.mock.calls[0]![0]
    const secondOptions = serviceMocks.useInfiniteQuery.mock.calls[1]![0]
    expect(firstOptions.key()).toEqual(secondOptions.key())
  })

  it('configures pagination and fetches the requested page', async () => {
    const controller = new AbortController()
    const result = useEpisodes({ page })
    const options = serviceMocks.useInfiniteQuery.mock.calls[0]![0]

    expect(options.getNextPageParam({ nextPage: 'next' })).toBe('next')
    expect(options.getPreviousPageParam({ lastPage: 'previous' })).toBe('previous')
    expect(options.initialPageParam()).toBe('first')
    await options.query({ pageParam: 'next', signal: controller.signal })
    expect(page.fetchEps.query).toHaveBeenCalledWith({}, 'next', controller.signal)
    expect(result.currentEpisodeId.value).toBe('episode-2')
  })

  it('falls back to the numbered title and reports an unknown episode', () => {
    const result = useEpisodes({ page })

    expect(result.episodeTitle(episodes[0], 0)).toBe('One')
    expect(result.episodeTitle(undefined, 2)).toBe('layout.content.episodeFallback:3')
    expect(result.currentEpisodeIndex.value).toBe(1)
  })

  it('routes with a preloaded item and reports when no union is available', () => {
    const preload = {
      contentType: ['reader', 'comic'],
      id: 'item-1',
      thisEp: { id: 'episode-1' },
    } as UniItem
    vi.spyOn(UniItem, 'create').mockReturnValue(preload)
    const union = { toJSON: () => ({ id: 'item-1' }) } as UniItem

    const withUnion = useEpisodes({ page, union })
    expect(withUnion.routeToEpisode(episodes[0]!)).toBe(true)
    expect(serviceMocks.sharedCall).toHaveBeenCalledWith(
      'routeToContent',
      preload.contentType,
      preload.id,
      preload.thisEp.id,
      preload,
    )

    const withoutUnion = useEpisodes({ page })
    expect(withoutUnion.routeToEpisode(episodes[0]!)).toBe(false)
  })
})