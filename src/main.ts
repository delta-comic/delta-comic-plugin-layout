import '@/index.css'
import { definePlugin, type PluginExpose } from '@delta-comic/plugin'

import CreateFavouriteCard from './components/CreateFavouriteCard.vue'
import FavouriteSelect from './components/FavouriteSelect.vue'
import ItemCard from './components/ItemCard.vue'
import ShareButton from './components/ShareButton.vue'
import { imageViewConfig } from './config'
import Default from './layout/Default.vue'
import * as model from './model'
import { pluginName } from './symbol'
import Image from './view/Image.vue'
import Video from './view/Video.vue'

const plugin = definePlugin({
  name: pluginName,
  onBooted: () => ({
    view: { Image, Video },
    layout: { Default },
    model,
    component: { ItemCard, ShareButton, FavouriteSelect, CreateFavouriteCard }
  }),
  config: [imageViewConfig]
})

export type LayoutLib = PluginExpose<() => typeof plugin>