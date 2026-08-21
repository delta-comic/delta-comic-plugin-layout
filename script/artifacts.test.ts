import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import JSZip from 'jszip'
import { describe, expect, it } from 'vitest'

import { parsePluginManifest, validatePluginArtifacts } from './artifacts.mts'

const manifest = {
  apiVersion: 1 as const,
  author: 'delta-comic',
  description: 'Layout plugin',
  entry: { cssPath: 'index.css', jsPath: 'index.js' },
  name: { display: 'Layout', id: 'layout' },
  require: [{ id: 'core' }],
  version: { plugin: '1.0.0-next.1', supportCore: '>=3.0.0-next.15 <4.0.0' },
}

async function createFixture(archiveManifest = manifest, includeCss = true) {
  const directory = await mkdtemp(join(tmpdir(), 'layout-artifacts-'))
  await mkdir(directory, { recursive: true })
  await writeFile(join(directory, 'manifest.json'), JSON.stringify(manifest))
  await writeFile(join(directory, 'index.js'), 'export default {}')
  await writeFile(join(directory, 'index.css'), 'body{}')

  const archive = new JSZip()
  archive.file('manifest.json', JSON.stringify(archiveManifest))
  archive.file('index.js', 'export default {}')
  if (includeCss) archive.file('index.css', 'body{}')
  await writeFile(
    join(directory, 'plugin.zip'),
    await archive.generateAsync({ type: 'nodebuffer' }),
  )
  return directory
}

describe('plugin artifacts', () => {
  it('validates the external manifest and archive contents together', async () => {
    const result = await validatePluginArtifacts(await createFixture())

    expect(result.manifest).toEqual(manifest)
    expect(result.files).toEqual(['index.css', 'index.js', 'manifest.json'])
  })

  it('rejects archives that omit an entry file', async () => {
    await expect(validatePluginArtifacts(await createFixture(manifest, false))).rejects.toThrow(
      'plugin.zip is missing index.css',
    )
  })

  it('rejects a manifest mismatch between disk and the archive', async () => {
    const archivedManifest = {
      ...manifest,
      version: { ...manifest.version, plugin: '1.0.0-next.2' },
    }
    await expect(validatePluginArtifacts(await createFixture(archivedManifest))).rejects.toThrow(
      'external and archived manifests are different',
    )
  })

  it('requires all loader-critical manifest fields', () => {
    expect(() =>
      parsePluginManifest({ ...manifest, entry: { cssPath: '', jsPath: 'index.js' } }),
    ).toThrow('entry.cssPath')
    expect(() => parsePluginManifest({ ...manifest, apiVersion: 0 })).toThrow('apiVersion')
  })
})