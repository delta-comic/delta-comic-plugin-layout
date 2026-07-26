import { uni } from '@delta-comic/model'

export interface SubscribeRowProps {
  page: uni.content.ContentPage
  author: uni.item.Author
  isSubscribe?: boolean
  type: 'small' | 'common'
}

export interface TabProps {
  page: uni.content.ContentPage
}

export interface ContentProps {
  page: uni.content.ContentPage
  item?: uni.item.Item
}

export enum QueryKey {
  Detail = 'layout::default::detail',
  Ep = 'layout::default::ep',
  Recommends = 'layout::default::recommends',
  ShortId = 'layout::default::shortId'
}
export const createPageQueryKey = (page: uni.content.ContentPage | uni.item.Item) => ({
  id: page.id,
  ct: uni.content.ContentPage.contentPages.key.toString(page.contentType)
})