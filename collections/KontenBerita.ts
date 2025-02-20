/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
// to be used in the future
// import { generatePreviewPath } from "@/lib/generatePreviewPath";

export const KontenBerita: CollectionConfig = {
  slug: "konten-berita",
  labels: {
    singular: "Konten Berita Page",
    plural: "Konten Berita Pages",
  },
  admin: {
    defaultColumns: ["judul", "slug", "publishedAt", "updatedAt"],
    // untuk future use
    // livePreview: {
    //     url: ({ data, req}) => {
    //         const path = generatePreviewPath({
    //             slug: typeof data?.slug === 'string' ? data.slug : '',
    //             collection: 'konten-berita',
    //             req,
    //         })
    //         return path
    //     },
    // },
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
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data && data.konten) {
          // Convert Lexical JSON to plain text
          const plainText = convertLexicalToPlainText(data.konten);
  
          // Extract the first 50 characters and append "...."
          data.shortDescription = plainText.slice(0, 50) + "....";
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
