import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import test from 'node:test'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'
import { createCanvas } from 'canvas'

const payloadRequire = createRequire(import.meta.resolve('payload'))
const authRequire = createRequire(import.meta.resolve('next-auth'))
const loadPayloadDependency = (name) => import(pathToFileURL(payloadRequire.resolve(name)).href)

test('native image processing and Payload upload detection', async () => {
  const image = createCanvas(3, 2).toBuffer('image/png')
  const metadata = await sharp(image).metadata()
  assert.equal(metadata.width, 3)
  assert.equal(metadata.height, 2)
  const { fileTypeFromBuffer } = await loadPayloadDependency('file-type')
  assert.equal((await fileTypeFromBuffer(image)).mime, 'image/png')
  const resized = await sharp(image).resize(6, 4).png().toBuffer()
  assert.equal((await sharp(resized).metadata()).width, 6)
})

test('NextAuth nodemailer override creates a verification email offline', async () => {
  const nodemailer = authRequire('nodemailer')
  const transport = nodemailer.createTransport({ jsonTransport: true })
  const result = await transport.sendMail({
    from: 'test@example.invalid', to: 'user@example.invalid',
    subject: 'Verification', text: 'Offline compatibility test',
  })
  const message = JSON.parse(result.message)
  assert.equal(message.subject, 'Verification')
  assert.equal(message.to[0].address, 'user@example.invalid')
})

test('Payload session UUID generation retains valid identifiers', async () => {
  const { v4, validate } = await loadPayloadDependency('uuid')
  assert.equal(validate(v4()), true)
})
