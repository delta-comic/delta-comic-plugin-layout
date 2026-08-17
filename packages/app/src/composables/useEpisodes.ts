import { type PageKey, UniItem, type UniContentPage, type UniEp } from '@delta-comic/model'
import { SharedFunction } from '@delta-comic/utils'
import { useInfiniteQuery, type UseInfiniteQueryReturn } from '@pinia/colada'
import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'

import { translate } from '@/i18n'
import { createPageQueryKey, QueryKey } from '@/layout/default'
import type { StreamPage } from '@/utils/query'

/** `useEpisodes` 的入参。 */
interface UseEpisodesOptions {
  /** 内容页，`ep` 字段决定当前选中剧集。 */
  page: MaybeRefOrGetter<UniContentPage>
  /** 可选的内容条目；提供后 `routeToEpisode` 才能携带预加载数据跳转。 */
  union?: MaybeRefOrGetter<UniItem | undefined>
}

/** `useEpisodes` 的返回值。 */
interface UseEpisodesReturn {
  /** 当前选中的剧集，列表加载完成前可能为 `undefined`。 */
  currentEpisode: ComputedRef<UniEp | undefined>
  /** 当前选中剧集的 id（即内容页的 `ep`）。 */
  currentEpisodeId: ComputedRef<string>
  /** 当前剧集在列表中的下标，未命中时为 `-1`。 */
  currentEpisodeIndex: ComputedRef<number>
  /** 已加载全部页面的剧集平铺列表。 */
  episodes: ComputedRef<UniEp[]>
  /** 剧集展示名：有名称用名称，否则回退为"第 N 话"。 */
  episodeTitle: (episode: UniEp | undefined, index: number) => string
  /** 剧集列表分页查询，支持上下翻页与缓存。 */
  query: UseInfiniteQueryReturn<StreamPage<UniEp>, Error, PageKey>
  /** 跳转到指定剧集；未提供 `union` 时返回 `false` 且不跳转。 */
  routeToEpisode: (episode: UniEp) => boolean
}

/**
 * 剧集列表组合式函数。
 *
 * 负责剧集分页加载、当前剧集定位与跳转。列表数据经
 * `useInfiniteQuery` 缓存，`page` 变化时查询 key 随之刷新。
 *
 * @since 0.9.0
 */
export const useEpisodes = (options: UseEpisodesOptions): UseEpisodesReturn => {
  const query = useInfiniteQuery<StreamPage<UniEp>, Error, PageKey>({
    getNextPageParam: page => page.nextPage,
    getPreviousPageParam: page => page.lastPage,
    initialPageParam: () => toValue(options.page).fetchEps.initPage,
    key: () => [QueryKey.Ep, createPageQueryKey(toValue(options.page))],
    query: async ({ pageParam, signal }) =>
      await toValue(options.page).fetchEps.query({}, pageParam, signal),
  })
  const episodes = computed(
    () => query.data.value?.pages.flatMap(page => page.data) ?? new Array<UniEp>(),
  )
  const currentEpisodeId = computed(() => toValue(options.page).ep)
  const currentEpisodeIndex = computed(() =>
    episodes.value.findIndex(episode => episode.id === currentEpisodeId.value),
  )
  const currentEpisode = computed(() => episodes.value[currentEpisodeIndex.value])

  const episodeTitle = (episode: UniEp | undefined, index: number) =>
    episode?.name || translate('layout.content.episodeFallback', { number: index + 1 })

  const routeToEpisode = (episode: UniEp) => {
    const union = options.union === undefined ? undefined : toValue(options.union)
    if (!union) return false
    const preload = UniItem.create({ ...union.toJSON(), thisEp: episode.toJSON() })
    void SharedFunction.call(
      'routeToContent',
      preload.contentType,
      preload.id,
      preload.thisEp.id,
      preload,
    )
    return true
  }

  return {
    currentEpisode,
    currentEpisodeId,
    currentEpisodeIndex,
    episodes,
    episodeTitle,
    query,
    routeToEpisode,
  }
}