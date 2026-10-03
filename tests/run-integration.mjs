import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'

assert.ok(process.env.USERS_ACCESS_TEST_DATABASE_URI,
  'test:integration requires USERS_ACCESS_TEST_DATABASE_URI pointing to disposable loopback /neotic_test')
const result = spawnSync(process.execPath, [
  '--experimental-vm-modules', '--test',
  'tests/users-access.integration.test.mjs',
  'tests/payload-upgrade.integration.test.mjs',
], { stdio: 'inherit', env: process.env })
if (result.error) throw result.error
process.exit(result.status ?? 1)
