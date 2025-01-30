/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from "payload";
import { JSX } from "react/jsx-runtime";
import configPromise from "@payload-config";
import Link from "next/link";
import Image from "next/image";
import { PayloadLexicalReact } from '@zapal/payload-lexical-react'

interface BeritaPage {
  id: string;
  title: string;
  imageSrc: string;
  content: string;
  slug: string;
}

async function fetchBeritaPage(): Promise<BeritaPage[]> {
  try {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "konten-berita",
      pagination: false,
    });

    return result.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.judul,
      imageSrc: doc.gambar.url,
      content: doc.konten,
      slug: doc.slug,
    }));
  } catch (error) {
    console.error("Error fetching data from Payload CMS:", error);
    return [];
  }
}

export default async function BeritaPage(): Promise<JSX.Element> {
  const beritaPage = await fetchBeritaPage();

  return (
    <div className="min-h-screen">
      <div className="bg-blue-210 text-center font-semibold text-2xl mt-10 p-4">
        <Link href="/berita">
          <h1>Berita</h1>
        </Link>
      </div>
      {beritaPage.map((berita, index) => (
        <div className="" key={index}>
            <Image 
                src={berita.imageSrc}
                alt={berita.title}
                width={200}
                height={200}
            />
            <h1>{berita.title}</h1>
            <PayloadLexicalReact />
        </div>
      ))}
    </div>
  );
}
