import { spawn } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { prereleaseWarning } from './release-notes.mts'

export const rootDir = join(import.meta.dirname, '..')
export const packageDirectory = join(rootDir, 'packages/app')

interface ReleaseContext {
  nextRelease: { channel?: string | null; version: string }
}

export type BuildRunner = (version: string) => Promise<void>

export interface ReleasePreparationOptions {
  runBuild?: BuildRunner
  writeVersion?: VersionWriter
}

interface PackageJson extends Record<string, unknown> {
  version: string
}

export type VersionWriter = (version: string) => Promise<void>

const semanticVersion =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/

export function assertVersion(version: string) {
  if (!semanticVersion.test(version)) throw new Error(`Invalid semantic version: ${version}`)
}

function isPackageJson(value: unknown): value is PackageJson {
  return (
    typeof value === 'object' &&
    value !== null &&
    'version' in value &&
    typeof value.version === 'string'
  )
}

function parsePackageJson(content: string): PackageJson {
  const packageJson: unknown = JSON.parse(content)
  if (!isPackageJson(packageJson)) {
    throw new Error('packages/app/package.json must contain a string version')
  }
  return packageJson
}

async function writePackageVersion(version: string) {
  const packagePath = join(packageDirectory, 'package.json')
  const packageJson = parsePackageJson(await readFile(packagePath, 'utf8'))
  await writeFile(packagePath, `${JSON.stringify({ ...packageJson, version }, null, 2)}\n`, 'utf8')
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

export async function prepareRelease(
  version: string,
  { runBuild = buildPlugin, writeVersion = writePackageVersion }: ReleasePreparationOptions = {},
) {
  assertVersion(version)
  await writeVersion(version)
  await runBuild(version)
}

export async function verifyRelease(_pluginConfig: unknown, { nextRelease }: ReleaseContext) {
  assertVersion(nextRelease.version)
}

export async function prepare(_pluginConfig: unknown, { nextRelease }: ReleaseContext) {
  await prepareRelease(nextRelease.version)
}

export async function publish(_pluginConfig: unknown, { nextRelease }: ReleaseContext) {
  await publishPackage(nextRelease.channel || 'latest')
}

export async function generateNotes(_pluginConfig: unknown, { nextRelease }: ReleaseContext) {
  return nextRelease.channel ? prereleaseWarning : ''
}