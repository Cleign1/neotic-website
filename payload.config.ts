// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { KontenBerita } from './collections/KontenBerita'
import { PortfolioCollection } from './collections/PortofolioCollection'
import { PortofolioTop } from './collections/PortofolioTop'
import { AboutPage } from './collections/AboutPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  collections: [Users, Media, KontenBerita, PortfolioCollection, PortofolioTop, AboutPage],
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: true, // Enable S3 storage for the 'media' collection
      },
      bucket: process.env.S3_BUCKET || "", // Your Cloudflare R2 bucket name
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "", // Your R2 Access Key ID
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "", // Your R2 Secret Access Key
        },
        region: 'auto', // Cloudflare R2 uses 'auto' as the region
        endpoint: process.env.S3_ENDPOINT, // Your R2 endpoint, e.g., 'https://<account-id>.r2.cloudflarestorage.com'
        forcePathStyle: true, // Required for Cloudflare R2
      },
    }),
  ],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
})
