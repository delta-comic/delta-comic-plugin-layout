import { spawn } from 'node:child_process'
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { rootDir, validatePluginArtifacts } from './artifacts.mts'
import { prereleaseWarning } from './release-notes.mts'

export const releaseAssetNames = ['manifest.json', 'plugin.zip'] as const
export const releaseDirectory = join(rootDir, 'dist/release')
export const packageDirectory = join(rootDir, 'dist/package')
export const packageName = '@delta-comic/delta-comic-plugin-layout'

interface ReleaseContext {
  nextRelease: { channel?: string | null; version: string }
}

export type BuildRunner = (version: string) => Promise<void>

export interface ReleasePreparationOptions {
  destination?: string
  pluginDist?: string
  runBuild?: BuildRunner
}

const semanticVersion =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/

export function assertVersion(version: string) {
  if (!semanticVersion.test(version)) throw new Error(`Invalid semantic version: ${version}`)
}

async function buildPlugin(version: string) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn('vp', ['run', 'build'], {
      cwd: rootDir,
      env: { ...process.env, DELTA_PLUGIN_VERSION: version },
      stdio: 'inherit',
    })
    child.on('error', reject)
    child.on('close', status => {
      if (status === 0) resolve()
      else reject(new Error(`Plugin build failed with status ${String(status ?? 1)}`))
    })
  })
}

export type PublishRunner = (command: string, args: string[]) => Promise<void>

async function runPublishCommand(command: string, args: string[]) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { cwd: rootDir, stdio: 'inherit' })
    child.on('error', reject)
    child.on('close', status => {
      if (status === 0) resolve()
      else reject(new Error(`Command failed with status ${String(status ?? 1)}: ${command}`))
    })
  })
}

export async function publishPackage(
  distTag: string,
  runCommand: PublishRunner = runPublishCommand,
) {
  await runCommand('vp', [
    'pm',
    'publish',
    packageDirectory,
    '--no-git-checks',
    '--tag',
    distTag,
    '--',
    '--registry=https://npm.pkg.github.com',
  ])
}

export async function prepareReleaseArtifacts(
  version: string,
  {
    destination = releaseDirectory,
    pluginDist = join(rootDir, 'packages/app/dist'),
    runBuild = buildPlugin,
  }: ReleasePreparationOptions = {},
) {
  assertVersion(version)
  await runBuild(version)

  const validated = await validatePluginArtifacts(pluginDist)
  if (validated.manifest.version.plugin !== version) {
    throw new Error(
      `Built manifest version ${validated.manifest.version.plugin} does not match release ${version}`,
    )
  }

  await rm(destination, { force: true, recursive: true })
  await mkdir(destination, { recursive: true })
  await Promise.all(
    releaseAssetNames.map(name => copyFile(join(pluginDist, name), join(destination, name))),
  )
  return validated
}

export async function preparePackageArtifact(
  version: string,
  {
    destination = packageDirectory,
    release = releaseDirectory,
    pluginDist = join(rootDir, 'packages/app/dist'),
  }: { destination?: string; release?: string; pluginDist?: string } = {},
) {
  assertVersion(version)
  const manifest = JSON.parse(await readFile(join(release, 'manifest.json'), 'utf8')) as {
    entry: { cssPath: string; jsPath: string }
    version: { plugin: string }
  }
  if (manifest.version.plugin !== version) {
    throw new Error(
      `Release manifest version ${manifest.version.plugin} does not match package ${version}`,
    )
  }
  const packageDist = join(destination, 'dist')
  await rm(destination, { force: true, recursive: true })
  await mkdir(packageDist, { recursive: true })
  await Promise.all([
    copyFile(join(release, 'manifest.json'), join(packageDist, 'manifest.json')),
    copyFile(join(release, 'plugin.zip'), join(packageDist, 'plugin.zip')),
    copyFile(join(pluginDist, manifest.entry.cssPath), join(packageDist, manifest.entry.cssPath)),
    copyFile(join(pluginDist, manifest.entry.jsPath), join(packageDist, manifest.entry.jsPath)),
    writeFile(
      join(destination, 'package.json'),
      `${JSON.stringify(
        {
          name: packageName,
          version,
          description: 'Delta Comic 的基础内容布局插件',
          homepage: 'https://github.com/delta-comic/delta-comic-plugin-layout',
          license: 'AGPL-3.0-only',
          author: { name: 'wenxig', email: 'wenxinguo12@gmail.com' },
          repository: {
            type: 'git',
            url: 'https://github.com/delta-comic/delta-comic-plugin-layout.git',
          },
          files: ['dist'],
          type: 'module',
          main: './dist/index.js',
          publishConfig: { registry: 'https://npm.pkg.github.com' },
        },
        null,
        2,
      )}\n`,
      'utf8',
    ),
  ])
}

export async function verifyRelease(_pluginConfig: unknown, { nextRelease }: ReleaseContext) {
  assertVersion(nextRelease.version)
}

export async function prepare(_pluginConfig: unknown, { nextRelease }: ReleaseContext) {
  await prepareReleaseArtifacts(nextRelease.version)
  await preparePackageArtifact(nextRelease.version)
}

export async function publish(_pluginConfig: unknown, { nextRelease }: ReleaseContext) {
  await publishPackage(nextRelease.channel || 'latest')
}

export async function generateNotes(_pluginConfig: unknown, { nextRelease }: ReleaseContext) {
  return nextRelease.channel ? prereleaseWarning : ''
}