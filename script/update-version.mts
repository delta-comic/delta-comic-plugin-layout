import semantic from 'semantic-release'

import config from '../.releaserc.mjs'
import { setVersion } from './set-version.mts'

const result = await semantic(config, { env: { IS_DUR_RUN: true } })

if (result) {
  await setVersion(result.nextRelease.version)
  console.log(result.lastRelease.version)
  process.exit(0)
}
process.exit(0)