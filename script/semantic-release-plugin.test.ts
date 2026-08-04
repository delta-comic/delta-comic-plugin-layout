import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import JSZip from 'jszip'
import { describe, expect, it, vi } from 'vitest'

import { createReleaseNameTemplate, prereleaseWarning } from './release-notes.mts'
import {
  assertVersion,
  generateNotes,
  packageName,
  preparePackageArtifact,
  prepareReleaseArtifacts,
  publishPackage,
  releaseAssetNames,
  verifyRelease,
} from './semantic-release-plugin.mts'

async function createPluginDist(version: string) {
  const pluginDist = await mkdtemp(join(tmpdir(), 'layout-plugin-dist-'))
  const manifest = {
    apiVersion: 1,
    author: 'delta-comic',
    description: 'Layout plugin',
    entry: { cssPath: 'index.css', jsPath: 'index.js' },
    name: { display: 'Layout', id: 'layout' },
    require: [{ id: 'core' }],
    version: { plugin: version, supportCore: '>=3.0.0-next.9 <4.0.0' },
  }
  const archive = new JSZip()
  archive.file('manifest.json', JSON.stringify(manifest))
  archive.file('index.css', 'body{}')
  archive.file('index.js', 'export default {}')
  await Promise.all([
    writeFile(join(pluginDist, 'manifest.json'), JSON.stringify(manifest)),
    writeFile(join(pluginDist, 'index.css'), 'body{}'),
    writeFile(join(pluginDist, 'index.js'), 'export default {}'),
    writeFile(join(pluginDist, 'plugin.zip'), await archive.generateAsync({ type: 'nodebuffer' })),
  ])
  return pluginDist
}

describe('semantic release plugin', () => {
  it.each(['1.0.0', '1.2.3-next.4', '1.2.3+build.5'])('accepts semantic version %s', version => {
    expect(() => assertVersion(version)).not.toThrow()
  })

  it.each(['v1.0.0', '1.0', '01.0.0', '1.0.0-next_1'])('rejects invalid version %s', version => {
    expect(() => assertVersion(version)).toThrow('Invalid semantic version')
  })

  it('publishes only the two loader artifacts', () => {
    expect(releaseAssetNames).toEqual(['manifest.json', 'plugin.zip'])
  })

  it('builds, validates and stages exactly the release assets', async () => {
    const version = '1.2.3-next.4'
    const pluginDist = await createPluginDist(version)
    const destination = await mkdtemp(join(tmpdir(), 'layout-release-'))
    const runBuild = vi.fn()

    const result = await prepareReleaseArtifacts(version, { destination, pluginDist, runBuild })

    expect(runBuild).toHaveBeenCalledWith(version)
    expect(result.manifest.version.plugin).toBe(version)
    await expect(readFile(join(destination, 'manifest.json'), 'utf8')).resolves.toContain(version)
    await expect(readFile(join(destination, 'plugin.zip'))).resolves.not.toHaveLength(0)
  })

  it('stages a GitHub Package with the semantic-release version', async () => {
    const version = '1.2.3-next.4'
    const pluginDist = await createPluginDist(version)
    const release = await mkdtemp(join(tmpdir(), 'layout-release-'))
    const destination = await mkdtemp(join(tmpdir(), 'layout-package-'))
    await prepareReleaseArtifacts(version, { destination: release, pluginDist, runBuild: vi.fn() })

    await preparePackageArtifact(version, { destination, release, pluginDist })

    const packageManifest = JSON.parse(await readFile(join(destination, 'package.json'), 'utf8'))
    expect(packageManifest).toMatchObject({
      name: packageName,
      version,
      files: ['dist'],
      publishConfig: { registry: 'https://npm.pkg.github.com' },
    })
    await expect(readFile(join(destination, 'dist', 'plugin.zip'))).resolves.not.toHaveLength(0)
  })

  it('publishes the generated package to GitHub Packages with the channel tag', async () => {
    const runCommand = vi.fn().mockResolvedValue(undefined)

    await publishPackage('next', runCommand)

    expect(runCommand).toHaveBeenCalledWith('vp', [
      'pm',
      'publish',
      expect.stringMatching(/dist\/package$/),
      '--no-git-checks',
      '--tag',
      'next',
      '--',
      '--registry=https://npm.pkg.github.com',
    ])
  })

  it('refuses to stage artifacts built for another version', async () => {
    const pluginDist = await createPluginDist('1.2.3-next.3')
    await expect(
      prepareReleaseArtifacts('1.2.3-next.4', {
        destination: await mkdtemp(join(tmpdir(), 'layout-release-')),
        pluginDist,
        runBuild: vi.fn(),
      }),
    ).rejects.toThrow('does not match release')
  })

  it('adds a warning only to prerelease notes', async () => {
    await expect(
      generateNotes({}, { nextRelease: { channel: 'next', version: '1.2.3-next.4' } }),
    ).resolves.toBe(prereleaseWarning)
    await expect(
      generateNotes({}, { nextRelease: { channel: null, version: '1.2.3' } }),
    ).resolves.toBe('')
    expect(createReleaseNameTemplate()).toContain('基础布局插件')
  })

  it('verifies the version supplied by semantic-release', async () => {
    await expect(
      verifyRelease({}, { nextRelease: { version: '1.2.3-next.4' } }),
    ).resolves.toBeUndefined()
    await expect(verifyRelease({}, { nextRelease: { version: 'next' } })).rejects.toThrow(
      'Invalid semantic version',
    )
  })
})