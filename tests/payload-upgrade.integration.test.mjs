import assert from 'node:assert/strict'
import { randomBytes, randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import test from 'node:test'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { getPayload } from 'payload'

// Use the same TypeScript loader as Payload's CLI for the complete application config.
const require = createRequire(import.meta.resolve('payload'))
await import(require.resolve('tsx/esm'))
const databaseURI = process.env.USERS_ACCESS_TEST_DATABASE_URI

test('populated Payload 3.24.0 database upgrades without losing content or user login', { skip: !databaseURI }, async (t) => {
  const database = new URL(databaseURI)
  assert.ok(['127.0.0.1', 'localhost', '[::1]'].includes(database.hostname))
  assert.equal(database.pathname, '/neotic_test')
  const schemaName = `payload_upgrade_${randomUUID().replaceAll('-', '')}`
  process.env.PAYLOAD_SECRET = randomBytes(32).toString('hex')
  const { default: configPromise } = await import('../payload.config.ts')
  const config = await configPromise
  config.db = postgresAdapter({ pool: { connectionString: databaseURI }, schemaName, push: false })
  config.typescript.autoGenerate = false
  const payload = await getPayload({ config, disableDBConnect: true })
  const pool = new payload.db.pg.Pool(payload.db.poolOptions)
  payload.db.pool = pool
  t.after(async () => {
    try {
      await pool.query(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`)
    } finally {
      try { await payload.destroy() } finally { await pool.end() }
    }
  })
  await pool.query(`CREATE SCHEMA "${schemaName}"`)
  // The fixture is a pg_dump of the full application config on 3.24.0, not a hand-written Users schema.
  const fixture = await readFile(new URL('./fixtures/payload-3.24.0/populated.sql', import.meta.url), 'utf8')
  await pool.query(fixture.replace(/^\\.*$/gm, '').replaceAll('public.', `"${schemaName}".`))
  await payload.db.connect()
  const { password, messageID } = JSON.parse(await readFile(new URL('./fixtures/payload-3.24.0/users.json', import.meta.url)))
  const before = (await pool.query(`SELECT id, email, role, hash, salt FROM "${schemaName}".users ORDER BY id`)).rows
  assert.equal(before.length, 2)
  await assert.rejects(payload.find({ collection: 'users' }), /reset_password_requested_at|users_sessions/)
  // Payload's migration runner owns the transaction and applied-migration ledger.
  await payload.db.migrate()
  const after = (await pool.query(`SELECT id, email, role, hash, salt FROM "${schemaName}".users ORDER BY id`)).rows
  assert.deepEqual(after, before)
  assert.equal((await payload.findByID({ collection: 'messages', id: messageID })).message, 'Existing content survives')
  for (const user of before) {
    const login = await payload.login({ collection: 'users', data: { email: user.email, password } })
    assert.equal(login.user.id, user.id)
    assert.equal(login.user.role, user.role)
    assert.ok(login.token)
    const authenticated = await payload.auth({ headers: new Headers({ Authorization: `JWT ${login.token}` }) })
    assert.equal(authenticated.user.id, user.id)
  }
  assert.equal((await pool.query(`SELECT count(*)::int AS count FROM "${schemaName}".users_sessions`)).rows[0].count, 2)
  await pool.query(`INSERT INTO "${schemaName}".payload_kv (key, data) VALUES ($1, $2)`, ['upgrade-test', { value: 'stored' }])
  assert.deepEqual((await pool.query(`SELECT data FROM "${schemaName}".payload_kv WHERE key = $1`, ['upgrade-test'])).rows[0].data, { value: 'stored' })
  assert.ok((await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema = $1 AND table_name = 'media' AND column_name = '_objectkey'`, [schemaName])).rowCount)
  await payload.db.migrate()
  assert.equal((await pool.query(`SELECT count(*)::int AS count FROM "${schemaName}".payload_migrations`)).rows[0].count, 1)
  const afterLogin = (await pool.query(`SELECT id, email, role, hash, salt FROM "${schemaName}".users ORDER BY id`)).rows
  // Payload upgrades legacy password hashes lazily on successful authentication.
  assert.ok(afterLogin.every((user) => user.hash.startsWith('pbkdf2-sha256-v1:')))
  // DOWN discards new sessions/KV/S3 metadata, but must not change persisted users/content.
  await payload.db.migrateDown()
  assert.deepEqual((await pool.query(`SELECT id, email, role, hash, salt FROM "${schemaName}".users ORDER BY id`)).rows, afterLogin)
  assert.equal((await payload.findByID({ collection: 'messages', id: messageID })).message, 'Existing content survives')
  await payload.db.migrate()
  assert.ok((await payload.login({ collection: 'users', data: { email: before[0].email, password } })).token)
})
