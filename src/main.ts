import '@/index.css'
import { definePlugin, type PluginExpose } from '@delta-comic/plugin'

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
      component: { ItemCard, ShareButton, FavouriteSelect, CreateFavouriteCard },
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
      }
      helper: { createDateString: typeof createDateString }
    },
  config: [imageViewConfig]
})

export type LayoutLib = PluginExpose<() => typeof plugin>