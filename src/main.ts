import '@/index.css'
import { definePlugin, PluginExpose } from 'delta-comic-core'
import 'delta-comic-core'
import { imageViewConfig } from './config'
import Default from './layout/default.vue'
import { pluginName } from './symbol'
import Image from './view/image.vue'
import Video from './view/video.vue'

const plugin = definePlugin({
  name: pluginName,
  onBooted: () => ({ view: { Image, Video }, layout: { Default } }),
  config: [imageViewConfig]
})

export type LayoutLib = PluginExpose<typeof plugin>