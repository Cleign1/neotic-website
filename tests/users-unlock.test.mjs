import assert from 'node:assert/strict'
import test from 'node:test'
import { Users } from '../collections/Users.ts'

for (const [label, user, expected] of [
  ['unauthenticated', null, false],
  ['editor', { role: 'Editor' }, false],
  ['admin', { role: 'admin' }, true],
]) {
  test(`account unlock: ${label}`, async () => {
    assert.equal(typeof Users.access?.unlock, 'function', 'unlock must have explicit access control')
    assert.equal(await Users.access.unlock({ req: { user } }), expected)
  })
}
