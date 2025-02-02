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

    // ignore this error, ini gk ngaruh ke hasil akhir
    const doc = result.docs[0];
    return {
      id: doc.id,
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
  params: Promise<{
    slug: string;
  }>;
}

export default async function BeritaPage(props: Args): Promise<JSX.Element> {
  const params = await props.params;
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
          <h1 className="text-3xl">Berita</h1>
        </Link>
      </div>
      <div className="bg-blue-210 p-8 mt-10 mb-10 text-center">
        <Image 
          src={berita.imageSrc}
          alt={berita.title}
          width={200}
          height={200}
          className="rounded-xl mx-auto"
        />
        <h1 className="mt-4 text-2xl font-semibold">{berita.title}</h1>
        {/* ignore this error */}
        <div className="px-64 my-16">
          <PayloadLexicalReact content={berita.content}/>
        </div>
      </div>
    </div>
  );
}