import assert from 'node:assert/strict'
import { randomBytes, randomUUID } from 'node:crypto'
import test from 'node:test'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig, getPayload, handleEndpoints } from 'payload'
import { Users } from '../collections/Users.ts'

// Opt in with a disposable loopback PostgreSQL database, never the application DATABASE_URI.
const databaseURI = process.env.USERS_ACCESS_TEST_DATABASE_URI

test('Users REST access lifecycle prevents role escalation', { skip: !databaseURI }, async (t) => {
  const database = new URL(databaseURI)
  assert.ok(['127.0.0.1', 'localhost', '[::1]'].includes(database.hostname))
  assert.equal(database.pathname, '/neotic_test')
  const schemaName = `users_access_${randomUUID().replaceAll('-', '')}`
  const config = await buildConfig({
    secret: randomBytes(32).toString('hex'),
    collections: [Users],
    admin: { user: 'users' },
    db: postgresAdapter({ pool: { connectionString: databaseURI }, schemaName }),
    typescript: { autoGenerate: false },
  })
  const payload = await getPayload({ config, disableDBConnect: true })
  // Own the pool so teardown can close it; the adapter otherwise retains a checkout.
  const pool = new payload.db.pg.Pool(payload.db.poolOptions)
  payload.db.pool = pool
  t.after(async () => {
    try {
      await pool.query(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`)
    } finally {
      try { await payload.destroy() } finally { await pool.end() }
    }
  })
  await payload.db.connect()
  const password = randomBytes(24).toString('hex')
  const request = async (method, path, data, token) => {
    const response = await handleEndpoints({
      config,
      request: new Request(`http://localhost/api/users${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `JWT ${token}` } : {}),
        },
        ...(data ? { body: JSON.stringify(data) } : {}),
      }),
    })
    return { status: response.status, body: await response.json() }
  }
  const adminData = { name: 'Admin', email: 'admin@example.test', password, role: 'admin' }
  assert.equal((await request('POST', '', adminData)).status, 403,
    'ordinary anonymous create must be denied even before bootstrap')
  const bootstrap = await request('POST', '/first-register', adminData)
  assert.equal(bootstrap.status, 200, JSON.stringify(bootstrap.body))
  assert.equal(bootstrap.body.user.role, 'admin')
  const adminToken = bootstrap.body.token
  const editorData = { name: 'Editor', email: 'editor@example.test', password, role: 'Editor' }
  const editor = await request('POST', '', editorData, adminToken)
  assert.equal(editor.status, 201, JSON.stringify(editor.body))
  const editorID = editor.body.doc.id
  const login = async (email) => {
    const result = await request('POST', '/login', { email, password })
    assert.equal(result.status, 200, JSON.stringify(result.body))
    return result.body.token
  }
  const editorToken = await login(editorData.email)
  const unlockData = { email: adminData.email }

  await t.test('Editor cannot promote self via PATCH and then unlock', async () => {
    assert.equal((await request('POST', '/unlock', unlockData, editorToken)).status, 403)
    const patched = await request('PATCH', `/${editorID}`, { role: 'admin', name: 'Updated Editor' }, editorToken)
    assert.equal(patched.status, 200, JSON.stringify(patched.body))
    // Payload field access silently strips forbidden changes; verify persisted state, not status alone.
    const persisted = await payload.findByID({ collection: 'users', id: editorID })
    assert.equal(persisted.role, 'Editor')
    assert.equal(persisted.name, 'Updated Editor')
    assert.equal((await request('POST', '/unlock', unlockData, await login(editorData.email))).status, 403)
  })

  await t.test('Editor cannot create an admin or another editor', async () => {
    for (const role of ['admin', 'Editor']) {
      const email = `forbidden-${role.toLowerCase()}@example.test`
      const result = await request('POST', '', { name: 'Forbidden', email, password, role }, editorToken)
      assert.equal(result.status, 403, JSON.stringify(result.body))
      assert.equal((await payload.count({ collection: 'users', where: { email: { equals: email } } })).totalDocs, 0)
      assert.equal((await request('POST', '/login', { email, password })).status, 401)
    }
  })

  await t.test('Editor cannot change another user or delete users to reopen bootstrap', async () => {
    assert.equal((await request('PATCH', `/${bootstrap.body.user.id}`, { password: randomBytes(24).toString('hex') }, editorToken)).status, 403)
    assert.equal((await request('DELETE', `/${bootstrap.body.user.id}`, undefined, editorToken)).status, 403)
    assert.equal((await request('DELETE', `/${editorID}`, undefined, editorToken)).status, 403)
  })

  await t.test('unauthenticated creation and repeated bootstrap are denied', async () => {
    assert.equal((await request('POST', '', { ...adminData, email: 'anonymous@example.test' })).status, 403)
    assert.equal((await request('POST', '/first-register', { ...adminData, email: 'bootstrap-again@example.test' })).status, 403)
  })

  await t.test('Admin can create admins, change roles, and unlock', async () => {
    const created = await request('POST', '', { ...adminData, email: 'second-admin@example.test' }, adminToken)
    assert.equal(created.status, 201, JSON.stringify(created.body))
    assert.equal(created.body.doc.role, 'admin')
    const updated = await request('PATCH', `/${editorID}`, { role: 'admin' }, adminToken)
    assert.equal(updated.status, 200, JSON.stringify(updated.body))
    assert.equal((await payload.findByID({ collection: 'users', id: editorID })).role, 'admin')
    assert.equal((await request('POST', '/unlock', unlockData, adminToken)).status, 200)
  })
})
