import { UniContentPage, type UniItem, type UniItemAuthor } from '@delta-comic/model'
import type { Component } from 'vue'

declare module '@delta-comic/ui' {
  export interface GlobalEnvironments {
    'layout::layout::default.subscribe-row': Component<SubscribeRowProps>
    'layout::layout::default.action': Component<ContentProps>
    'layout::layout::default.description': Component<ContentProps>
    'layout::layout::default.recommend': Component<ContentProps>
    'layout::layout::default.tab': Component<TabProps>
  }
}

export interface SubscribeRowProps {
  page: UniContentPage
  author: UniItemAuthor
  isSubscribe?: boolean
  type: 'small' | 'common'
}

export interface TabProps {
  page: UniContentPage
}

export interface ContentProps {
  page: UniContentPage
  item?: UniItem
}

export enum QueryKey {
  Detail = 'layout::default::detail',
  Ep = 'layout::default::ep',
  Recommends = 'layout::default::recommends',
  ShortId = 'layout::default::shortId',
}
export const createPageQueryKey = (page: UniContentPage | UniItem) => ({
  contentType: UniContentPage.contentPages.key.toString(page.contentType),
  episode: 'ep' in page ? page.ep : page.thisEp.id,
  id: page.id,
})