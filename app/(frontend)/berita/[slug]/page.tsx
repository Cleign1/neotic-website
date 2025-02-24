// import { JSX } from "react/jsx-runtime";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import NotFound from "../../[...notFound]/page";
import type { KontenBerita } from "@/payload-types";

interface BeritaPageProps {
  id: string;
  title: string;
  imageSrc: string;
  content: SerializedEditorState;
  slug: string;
}

async function fetchBeritaBySlug(
  slug: string
): Promise<BeritaPageProps | null> {
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
      slug: doc.slug as string,
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
    params: {
      slug: doc.slug,
    },
  }));
}

export default async function BeritaSlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const berita = await fetchBeritaBySlug(slug);

  if (!berita) {
    return <NotFound />;
  }

  return (
    // header berita
    <div className="my-10 min-h-screen">
      <div className="bg-blue-210 text-center font-semibold p-4">
        <Link href="/berita">
          <h1 className="text-2xl md:text-3xl">Berita</h1>
        </Link>
      </div>

      {/* Isi dari Kontent Berita */}
      <div className="bg-blue-210 p-4 md:p-8 mt-10 mb-10 ">
        <div className="container mx-auto  py-10 md:py-20">
          <Image
            src={berita.imageSrc}
            alt={berita.title}
            width={300}
            height={300}
            className="rounded-xl mx-auto w-full max-w-[300px]"
          />
          <h1 className="mt-4 text-xl md:text-2xl font-semibold p-4 md:p-6 text-center">
            {berita.title}
          </h1>
          <div className="container mx-auto mt-4 md:px-96 rich-text-content">
            <RichText data={berita.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
