import '@/index.css'
import { definePlugin, type PluginExpose } from '@delta-comic/plugin'
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
import type * as DefaultLayoutInject from './layout/default'
import Default from './layout/Default.vue'
import * as model from './model'
import { pluginName } from './symbol'
import { createDateString } from './utils/date'
import type * as ImageViewInject from './view/image'
import Image from './view/Image.vue'
import type * as VideoViewInject from './view/video'
import Video from './view/Video.vue'

declare module '@delta-comic/plugin' {
  interface GlobalInjections {
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

const plugin = definePlugin({
  name: pluginName,
  onBooted: () =>
    ({
      view: { Image, Video },
      layout: { Default },
      model,
      component: {
        ItemCard,
        ShareButton,
        FavouriteSelect,
        CreateFavouriteCard,
        comment: { Comment, Children, Sender, CommentRow },
        previewUser: PreviewUser
      },
      helper: { createDateString }
    }) as {
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
    },
  config: [imageViewConfig]
})

export type LayoutLib = PluginExpose<() => typeof plugin>