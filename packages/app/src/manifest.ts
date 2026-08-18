import { DELTA_COMIC_PLUGIN_API_VERSION, type PluginManifest } from '@delta-comic/model'

import { pluginName } from './symbol.js'

export const pluginManifestBase = {
  apiVersion: DELTA_COMIC_PLUGIN_API_VERSION,
  author: 'wenxig',
  description: 'layout.manifest.description',
  entry: { cssPath: 'index.css', jsPath: 'index.js' },
  name: { display: 'layout.manifest.displayName', id: pluginName },
  require: [{ id: 'core' }],
} satisfies Omit<PluginManifest, 'version'>

export const createPluginManifest = (version: string): PluginManifest => ({
  ...pluginManifestBase,
  entry: { ...pluginManifestBase.entry },
  name: { ...pluginManifestBase.name },
  require: pluginManifestBase.require.map(dependency => ({ ...dependency })),
  version: { plugin: version, supportCore: '>=3.0.0-next.13 <4.0.0' },
})