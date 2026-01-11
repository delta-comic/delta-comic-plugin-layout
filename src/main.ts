import "@/index.css"
import { definePlugin } from "delta-comic-core"
import { pluginName } from "./symbol"
import { imageViewConfig } from "./config"
import Image from "./view/image.vue"
import Video from "./view/video.vue"
import Default from "./layout/default.vue"

definePlugin({
  name: pluginName,
  onBooted: () => ({
    view: {
      Image,
      Video
    },
    layout: {
      Default
    }
  }),
  config: [
    imageViewConfig
  ],
})