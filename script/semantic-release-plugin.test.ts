import { describe, expect, it, vi } from 'vitest'

import { createReleaseNameTemplate, prereleaseWarning } from './release-notes.mts'
import {
  assertVersion,
  generateNotes,
  packageDirectory,
  prepareRelease,
  publishPackage,
  verifyRelease,
} from './semantic-release-plugin.mts'

describe('semantic release plugin', () => {
  it.each(['1.0.0', '1.2.3-next.4', '1.2.3+build.5'])('accepts semantic version %s', version => {
    expect(() => assertVersion(version)).not.toThrow()
  })

  it.each(['v1.0.0', '1.0', '01.0.0', '1.0.0-next_1'])('rejects invalid version %s', version => {
    expect(() => assertVersion(version)).toThrow('Invalid semantic version')
  })

  it('builds the monorepo package with the semantic-release version', async () => {
    const version = '1.2.3-next.4'
    const runBuild = vi.fn()
    const writeVersion = vi.fn()

    await prepareRelease(version, { runBuild, writeVersion })

    expect(writeVersion).toHaveBeenCalledWith(version)
    expect(runBuild).toHaveBeenCalledWith(version)
  })

  it('publishes the generated package to GitHub Packages with the channel tag', async () => {
    const runCommand = vi.fn().mockResolvedValue(undefined)

    await publishPackage('next', runCommand)

    expect(runCommand).toHaveBeenCalledWith('vp', [
      'pm',
      'publish',
      packageDirectory,
      '--no-git-checks',
      '--tag',
      'next',
      '--',
      '--registry=https://npm.pkg.github.com',
    ])
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