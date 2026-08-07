import '@/index.css'
import { defineDeltaComicPlugin } from '@delta-comic/plugin'

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
import Default from './layout/Default.vue'
import * as model from './model'
import { pluginName } from './symbol'
import { createDateString } from './utils/date'
import Image from './view/Image.vue'
import Video from './view/Video.vue'
import { artplayerRuntime } from './view/video/player'

export const expose = {
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
} as const

const plugin = defineDeltaComicPlugin(() => ({
  config: imageViewConfig,
  hooks: { onUnload: () => artplayerRuntime.disposeAll() },
  i18n: layoutMessages,
  model: { expose },
  name: pluginName,
}))

export default plugin

export type LibLayout = typeof expose