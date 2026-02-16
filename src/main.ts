import '@/index.css'
import { definePlugin, type PluginExpose } from '@delta-comic/plugin'

import Children from './components/comment/children.vue'
import Comment from './components/comment/Comment.vue'
import CommentRow from './components/comment/commentRow.vue'
import Sender from './components/comment/sender.vue'
import CreateFavouriteCard from './components/CreateFavouriteCard.vue'
import FavouriteSelect from './components/FavouriteSelect.vue'
import ItemCard from './components/ItemCard.vue'
import ShareButton from './components/ShareButton.vue'
import { imageViewConfig } from './config'
import Default from './layout/default.vue'
import * as model from './model'
import { pluginName } from './symbol'
import { createDateString } from './utils/date'
import Image from './view/image.vue'
import Video from './view/video.vue'

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
        comment: { Comment, Children, Sender, CommentRow }
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
      }
      helper: { createDateString: typeof createDateString }
    },
  config: [imageViewConfig]
})

export type LayoutLib = PluginExpose<() => typeof plugin>