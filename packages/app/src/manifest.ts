import { DELTA_COMIC_PLUGIN_API_VERSION, type PluginManifest } from '@delta-comic/model'

import { pluginName } from './symbol.js'

export const pluginManifestBase = {
  apiVersion: DELTA_COMIC_PLUGIN_API_VERSION,
  author: 'wenxig',
  description: 'Delta Comic 的基础内容布局插件',
  entry: { cssPath: 'index.css', jsPath: 'index.js' },
  name: { display: '基础布局组件', id: pluginName },
  require: [{ id: 'core' }],
} satisfies Omit<PluginManifest, 'version'>

export const createPluginManifest = (version: string): PluginManifest => ({
  ...pluginManifestBase,
  entry: { ...pluginManifestBase.entry },
  name: { ...pluginManifestBase.name },
  require: pluginManifestBase.require.map(dependency => ({ ...dependency })),
  version: { plugin: version, supportCore: '>=3.0.0-next.12 <4.0.0' },
})