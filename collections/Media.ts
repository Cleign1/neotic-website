import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  labels: {
    singular: 'Media / Gambar',
    plural: 'Media / Gambar',
  },
  slug: 'media',
  admin: {
    description: 'Media yang digunakan di website',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'kotak',
        width: 500,
        height: 500,
      },
      {
        name: 'banner',
        width: 1024,
        height: 640,
      }
    ]
  }
}
