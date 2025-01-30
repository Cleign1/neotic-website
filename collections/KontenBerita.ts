import { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { authenticated } from "@/lib/access/authenticated";
import { authenticatedOrPublished } from "@/lib/access/authenticatedOrPublished";
import { generatePreviewPath } from "@/lib/generatePreviewPath";

export const KontenBerita: CollectionConfig = {
  slug: "konten-berita",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: {
    singular: "Konten Berita",
    plural: "List Konten Berita",
  },
  admin: {
    defaultColumns: ["judul", "slug", "publishedAt", "updatedAt"],
    livePreview: {
        url: ({ data, req}) => {
            const path = generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'konten-berita',
                req,
            })
            return path
        },
    },
  },
  fields: [
    {
      name: "judul",
      type: "text",
      label: "Judul Berita",
      required: true,
    },
    {
      name: "gambar",
      type: "upload",
      label: "Gambar Berita",
      relationTo: "media", // Assumes you have a 'media' collection for uploads
      required: true,
    },
    {
      name: "konten",
      type: "richText",
      label: "Konten Berita",
      editor: lexicalEditor({}), // Use the Lexical editor for rich text
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            // Automatically generate a slug from the title if not provided
            if (data && data.judul && !data.slug) {
              return data.judul
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
            }
            return data?.slug;
          },
        ],
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Tanggal Publikasi",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
  ],
};
