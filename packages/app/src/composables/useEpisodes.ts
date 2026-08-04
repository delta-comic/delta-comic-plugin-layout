import { type PageKey, UniItem, type UniContentPage, type UniEp } from '@delta-comic/model'
import { SharedFunction } from '@delta-comic/utils'
import { useInfiniteQuery } from '@pinia/colada'
import { computed, toValue, type MaybeRefOrGetter } from 'vue'

import { translate } from '@/i18n'
import { createPageQueryKey, QueryKey } from '@/layout/default'
import type { StreamPage } from '@/utils/query'

interface UseEpisodesOptions {
  page: MaybeRefOrGetter<UniContentPage>
  union?: MaybeRefOrGetter<UniItem | undefined>
}

export const useEpisodes = (options: UseEpisodesOptions) => {
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