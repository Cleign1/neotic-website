import { CollectionConfig } from 'payload';

export const PortofolioTop: CollectionConfig = {
  labels: {
    singular: "Portofolio Bagian Atas",
    plural: "Portofolio Bagian Atas",
  },
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
