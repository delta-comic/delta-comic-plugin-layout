import Children from './components/comment/Children.vue'
import Comment from './components/comment/Comment.vue'
import CommentRow from './components/comment/CommentRow.vue'
import Sender from './components/comment/Sender.vue'
import CreateFavouriteCard from './components/CreateFavouriteCard.vue'
import FavouriteSelect from './components/FavouriteSelect.vue'
import ItemCard from './components/ItemCard.vue'
import ShareButton from './components/ShareButton.vue'
import PreviewUser from './components/user/PreviewUser.vue'
import Default from './layout/Default.vue'
import * as model from './model'
import { createDateString } from './utils/date'
import Image from './view/Image.vue'
import Video from './view/Video.vue'

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

export type LibLayout = typeof expose

declare module '@delta-comic/plugin' {
  interface PluginExposeRegistry {
    layout: LibLayout
  }
}