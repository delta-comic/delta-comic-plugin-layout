import semantic from 'semantic-release'
import { WritableStreamBuffer } from 'stream-buffers'

import config from '../.releaserc.mjs'
import { setVersion } from './set-version.mts'
const stdoutBuffer = new WritableStreamBuffer()
const stderrBuffer = new WritableStreamBuffer()

const result = await semantic(config, {
  env: { ...process.env, IS_DUR_RUN: true },
  stdout: stdoutBuffer as any,
  stderr: stderrBuffer as any
})

if (result) {
  await setVersion(result.nextRelease.version)
  console.log(result.lastRelease.version)
  process.exit(0)
}
process.exit(0)