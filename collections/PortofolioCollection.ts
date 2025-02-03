/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { authenticated } from "@/lib/access/authenticated";
import { authenticatedOrPublished } from "@/lib/access/authenticatedOrPublished";
import { generatePreviewPath } from "@/lib/generatePreviewPath";

export const PortfolioCollection: CollectionConfig = {
  slug: "portofolioPage",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: {
    singular: "Portfolio Item",
    plural: "Portfolio Items",
  },
  admin: {
    defaultColumns: ["title", "slug", "publishedAt", "updatedAt"],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
            slug: typeof data?.slug === 'string' ? data.slug : '',
            collection: 'portofolioPage',
            req,
        });
        return path;
      },
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      label: "Image",
      relationTo: "media", // Assumes you have a 'media' collection for uploads
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Content",
      editor: lexicalEditor({}), // Use the Lexical editor for rich text
      required: true,
    },
    {
      name: "shortDescription",
      type: "text",
      label: "Short Description",
      minLength: 20,
      maxLength: 100,
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
            if (data && data.title && !data.slug) {
              return data.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
            }
            return data?.slug;
          },
        ],
      },
    },
  ],
};