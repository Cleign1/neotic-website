/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from "payload";
import { JSX } from "react/jsx-runtime";
import configPromise from "@payload-config";
import Link from "next/link";
import Image from "next/image";
import { PayloadLexicalReact } from '@zapal/payload-lexical-react';

interface BeritaPage {
  id: string;
  title: string;
  imageSrc: string;
  content: string;
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

    const doc = result.docs[0];
    return {
      id: doc.id.toString(),
      title: doc.judul,
      imageSrc: doc.gambar.url,
      content: doc.konten,
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

  return result.docs.map((doc: any) => ({
    slug: doc.slug,
  }));
}

interface Args {
  params: {
    slug: string;
  };
}

export default async function BeritaPage({ params }: Args): Promise<JSX.Element> {
  // Destructure `slug` from `params` directly
  const { slug } = params;

  // Fetch the post using the slug
  const berita = await fetchBeritaBySlug(slug);

  if (!berita) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="bg-blue-210 text-center font-semibold text-2xl mt-10 p-4">
        <Link href="/berita">
          <h1>Berita</h1>
        </Link>
      </div>
      <div className="">
        <Image 
          src={berita.imageSrc}
          alt={berita.title}
          width={200}
          height={200}
        />
        <h1>{berita.title}</h1>
        <PayloadLexicalReact content={berita.content} />
      </div>
    </div>
  );
}