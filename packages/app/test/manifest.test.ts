import { DELTA_COMIC_PLUGIN_API_VERSION } from '@delta-comic/model'
import { describe, expect, it } from 'vitest'

import { createPluginManifest } from '../vite.config'

describe('plugin manifest', () => {
  it('targets the next.16 API v1 host contract', () => {
    const manifest = createPluginManifest('1.2.3')

    expect(manifest).toMatchObject({
      apiVersion: DELTA_COMIC_PLUGIN_API_VERSION,
      entry: { cssPath: 'index.css', jsPath: 'index.js' },
      name: { id: 'layout' },
      require: [{ id: 'core' }],
      version: { plugin: '1.2.3', supportCore: '>=3.0.0-next.16 <4.0.0' },
    })
  })

  it('returns independent nested manifest values for each build', () => {
    const first = createPluginManifest('1.0.0')
    const second = createPluginManifest('2.0.0')

    expect(first.entry).not.toBe(second.entry)
    expect(first.name).not.toBe(second.name)
    expect(first.require).not.toBe(second.require)
  })
})