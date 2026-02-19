import { PluginExpose } from '@delta-comic/plugin'
import { Component } from 'vue'

import { default as Children } from './components/comment/Children.vue'
import { default as Comment } from './components/comment/Comment.vue'
import { default as CommentRow } from './components/comment/CommentRow.vue'
import { default as Sender } from './components/comment/sender.vue'
import { default as CreateFavouriteCard } from './components/CreateFavouriteCard.vue'
import { default as FavouriteSelect } from './components/FavouriteSelect.vue'
import { default as ItemCard } from './components/ItemCard.vue'
import { default as ShareButton } from './components/ShareButton.vue'
import { default as PreviewUser } from './components/user/PreviewUser.vue'
import { default as Default } from './layout/Default.vue'
import * as model from './model'
import { createDateString } from './utils/date'
import { default as Image } from './view/Image.vue'
import { default as Video } from './view/Video.vue'
declare module '@delta-comic/plugin' {
  interface GlobalInjections {
    'layout::view::image::bottom-bar': Component
  }
}
declare const plugin: Promise<{
  name: string
  onBooted: () => {
    view: { Image: typeof Image; Video: typeof Video }
    layout: { Default: typeof Default }
    model: typeof model
    component: {
      ShareButton: typeof ShareButton
      ItemCard: typeof ItemCard
      FavouriteSelect: typeof FavouriteSelect
      CreateFavouriteCard: typeof CreateFavouriteCard
      comment: {
        Comment: typeof Comment
        Children: typeof Children
        Sender: typeof Sender
        CommentRow: typeof CommentRow
      }
      previewUser: typeof PreviewUser
    }
    helper: { createDateString: typeof createDateString }
  }
  config: import('@delta-comic/plugin').ConfigPointer<{
    doubleImage: { type: 'switch'; defaultValue: false; info: string }
    preloadImages: {
      type: 'number'
      defaultValue: number
      info: string
      range: [number, number]
      float: false
    }
    isFollowView: { type: 'switch'; defaultValue: false; info: string }
  }>[]
}>
export type LayoutLib = PluginExpose<() => typeof plugin>
export {}