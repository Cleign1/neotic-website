/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from "react/jsx-runtime";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";
import Image from "next/image";
import { KontenBerita } from "@/payload-types"; // Adjust the import path as needed
import { RichText } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import NotFound from "../../[...notFound]/page";

interface BeritaPage {
  id: string;
  title: string;
  imageSrc: string;
  content: SerializedEditorState; // Lexical JSON structure
  slug: string;
}

async function fetchBeritaBySlug(slug: string): Promise<BeritaPage | null> {
  try {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "konten-berita",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });

    if (result.docs.length === 0) {
      return null;
    }

    const doc = result.docs[0] as KontenBerita;
    return {
      id: doc.id.toString(),
      title: doc.judul,
      imageSrc:
        typeof doc.gambar === "object" && "url" in doc.gambar
          ? doc.gambar.url || ""
          : "",
      content: doc.konten as SerializedEditorState,
      slug: doc.slug,
    };
  } catch (error) {
    console.error("Error fetching data from Payload CMS:", error);
    return null;
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "konten-berita",
    pagination: false,
  });

  return result.docs.map((doc: KontenBerita) => ({
    slug: doc.slug,
  }));
}

interface Args {
  params: {
    slug: string;
  };
}

export default async function BeritaPage({
  params,
}: Args): Promise<JSX.Element> {
  const  { slug } = await params;

  // Fetch the post using the slug
  const berita = await fetchBeritaBySlug(slug);

  if (!berita) {
    return (
      <NotFound />
  );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-blue-210 text-center font-semibold mt-10 p-4">
        <Link href="/berita">
          <h1 className="text-2xl md:text-3xl">Berita</h1>
        </Link>
      </div>
      <div className="bg-blue-210 p-4 md:p-8 mt-10 mb-10">
        <div className="container mx-auto py-10 md:py-20">
          <Image
            src={berita.imageSrc}
            alt={berita.title}
            width={300}
            height={300}
            className="rounded-xl mx-auto w-full max-w-[300px]"
          />
          <h1 className="mt-4 text-xl md:text-2xl font-semibold p-4 md:p-6 text-center">{berita.title}</h1>
          <div className="container mx-auto mt-4 md:px-56 rich-text-content">
            <RichText data={berita.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
