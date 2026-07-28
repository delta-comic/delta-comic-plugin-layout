import '@/index.css'
import { definePlugin } from '@delta-comic/plugin'
import type { Component } from 'vue'

import type * as CommentInject from './components/comment'
import Children from './components/comment/Children.vue'
import Comment from './components/comment/Comment.vue'
import CommentRow from './components/comment/CommentRow.vue'
import Sender from './components/comment/Sender.vue'
import CreateFavouriteCard from './components/CreateFavouriteCard.vue'
import FavouriteSelect from './components/FavouriteSelect.vue'
import ItemCard from './components/ItemCard.vue'
import ShareButton from './components/ShareButton.vue'
import PreviewUser from './components/user/PreviewUser.vue'
import { imageViewConfig } from './config'
import { layoutMessages } from './i18n'
import type * as DefaultLayoutInject from './layout/default'
import Default from './layout/Default.vue'
import * as model from './model'
import { pluginName } from './symbol'
import { createDateString } from './utils/date'
import type * as ImageViewInject from './view/image'
import Image from './view/Image.vue'
import type * as VideoViewInject from './view/video'
import Video from './view/Video.vue'

declare module '@delta-comic/ui' {
  export interface GlobalEnvironments {
    'layout::view::image.top-bar': Component<ImageViewInject.BarProps>
    'layout::view::image.content': Component<ImageViewInject.ContentProps>
    'layout::view::image.bottom-bar': Component<ImageViewInject.BarProps>

    'layout::view::video.top-bar': Component<VideoViewInject.BarProps>
    'layout::view::video.center-bar': Component<VideoViewInject.BarProps>
    'layout::view::video.bottom-bar': Component<VideoViewInject.BarProps>
    'layout::view::video.content': Component<VideoViewInject.BarProps>

    'layout::layout::default.subscribe-row': Component<DefaultLayoutInject.SubscribeRowProps>
    'layout::layout::default.action': Component<DefaultLayoutInject.ContentProps>
    'layout::layout::default.description': Component<DefaultLayoutInject.ContentProps>
    'layout::layout::default.recommend': Component<DefaultLayoutInject.ContentProps>
    'layout::layout::default.tab': Component<DefaultLayoutInject.TabProps>

    'layout::components::comment::comment-row.userExtra': Component<CommentInject.CommentProps>
    'layout::components::comment::comment-row.action': Component<CommentInject.CommentProps>
    'layout::components::comment::comment-row.description': Component<CommentInject.CommentProps>
    'layout::components::comment::comment-row.reply': Component<CommentInject.CommentProps>
    'layout::components::comment::comment-row.avatar': Component<CommentInject.CommentProps>
  }
}

export interface LayoutLib {
  readonly component: {
    readonly CreateFavouriteCard: typeof CreateFavouriteCard
    readonly FavouriteSelect: typeof FavouriteSelect
    readonly ItemCard: typeof ItemCard
    readonly ShareButton: typeof ShareButton
    readonly comment: {
      readonly Children: typeof Children
      readonly Comment: typeof Comment
      readonly CommentRow: typeof CommentRow
      readonly Sender: typeof Sender
    }
    readonly previewUser: typeof PreviewUser
  }
  readonly helper: { readonly createDateString: typeof createDateString }
  readonly layout: { readonly Default: typeof Default }
  readonly model: typeof model
  readonly view: { readonly Image: typeof Image; readonly Video: typeof Video }
}

const onBooted = (): LayoutLib => ({
  view: { Image, Video },
  layout: { Default },
  model,
  component: {
    ItemCard,
    ShareButton,
    FavouriteSelect,
    CreateFavouriteCard,
    comment: { Comment, Children, Sender, CommentRow },
    previewUser: PreviewUser,
  },
  helper: { createDateString },
})

const plugin = definePlugin({
  name: pluginName,
  config: [imageViewConfig],
  i18n: layoutMessages,
  onBooted,
})

export default plugin