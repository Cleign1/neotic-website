import { CollectionConfig } from 'payload';

export const PortofolioTop: CollectionConfig = {
  slug: 'portofolioTop',
  fields: [
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};
