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
      admin: {
        readOnly: true, // Make the field read-only since it's auto-generated
      },
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
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data && data.content) {
          // Convert Lexical JSON to plain text
          const plainText = convertLexicalToPlainText(data.content);

          // Extract the first 20 characters and append "...."
          data.shortDescription = plainText.slice(0, 20) + "....";
        }
        return data;
      },
    ],
  },
};

// Function to convert Lexical JSON to plain text
function convertLexicalToPlainText(lexicalJSON: any): string {
  let plainText = "";

  // Traverse the Lexical JSON structure
  if (lexicalJSON.root && lexicalJSON.root.children) {
    for (const child of lexicalJSON.root.children) {
      if (child.type === "paragraph" && child.children) {
        for (const textNode of child.children) {
          if (textNode.type === "text" && textNode.text) {
            plainText += textNode.text;
          }
        }
        plainText += "\n"; // Add newline after paragraphs
      } else if (child.type === "heading" && child.children) {
        for (const textNode of child.children) {
          if (textNode.type === "text" && textNode.text) {
            plainText += textNode.text;
          }
        }
        plainText += "\n"; // Add newline after headings
      }
      // Add more cases as needed (e.g., lists, links, etc.)
    }
  }

  return plainText.trim(); // Trim any leading/trailing whitespace
}