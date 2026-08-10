import '@/index.css'
import { defineDeltaComicPlugin } from '@delta-comic/plugin'

import { imageViewConfig } from './config'
import { expose } from './expose'
import { layoutMessages } from './i18n'
import { pluginName } from './symbol'
import { artplayerRuntime } from './view/video/player'

export { expose, type LayoutPluginExpose, type LibLayout } from './expose'

const plugin = defineDeltaComicPlugin(() => ({
  config: imageViewConfig,
  hooks: { onUnload: () => artplayerRuntime.disposeAll() },
  i18n: layoutMessages,
  model: { expose },
  name: pluginName,
}))

export default plugin