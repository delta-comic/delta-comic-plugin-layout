import '@/index.css'
import { definePlugin } from 'delta-comic-core'

import { imageViewConfig } from './config'
import Default from './layout/default.vue'
import { pluginName } from './symbol'
import Image from './view/image.vue'
import Video from './view/video.vue'

void definePlugin({
  name: pluginName,
  onBooted: () => ({ view: { Image, Video }, layout: { Default } }),
  config: [imageViewConfig]
})