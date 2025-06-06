import { JSX } from "react/jsx-runtime";
import Image from "next/image";
import { getPayload } from "payload";
import configPromise from '@payload-config';
import Link from "next/link";
import { KontenBerita } from "@/payload-types";
// import { revalidateTag } from 'next/cache';


interface BeritaContent {
  id: string;
  title: string;
  imageSrc: string;
  shortDescription: string;
  slug: string; // Add slug field
}

async function fetchBeritaContents(): Promise<BeritaContent[]> {
  try {
    const payload = await getPayload({ config: configPromise });

    // revalidateTag('konten-berita');

    // Fetch data from Payload CMS
    const result = await payload.find({
      collection: "konten-berita",
      pagination: false, // Disable pagination
    });

    // Map the Payload data to the BeritaContent interface
    return result.docs.map((doc: KontenBerita) => ({
      id: doc.id.toString(),
      title: doc.judul,
      imageSrc: typeof doc.gambar === 'object' && 'url' in doc.gambar ? doc.gambar.url || '': '', // Check if 'gambar' is an object and has 'url' property
      shortDescription: doc.shortDescription || "No description available", // Use richText field excerpt or fallback
      slug: doc.slug, // Fetch the slug
    }));
  } catch (error) {
    console.error("Error fetching data from Payload CMS:", error);
    return []; // Return an empty array on error
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0; // This disables cache and forces dynamic rendering


export default async function BeritaPage(): Promise<JSX.Element> {
  const beritaContents = await fetchBeritaContents();

  return (
    <div className="min-h-screen">
      <div className="bg-blue-210 text-center font-semibold text-2xl mt-10 p-4">
        <h1>Berita</h1>
      </div>
      <div className="bg-blue-210 grid grid-cols-1 md:grid-cols-3 gap-7 mt-10 mb-10 px-8 md:px-10 py-14">
        {beritaContents.map((beritaContent, index) => (
          <Link
            key={index}
            href={`/berita/${beritaContent.slug}`} // Use the slug for the href
            passHref
          >
            <div className="justify-center bg-white p-10 rounded-xl flex flex-col items-center hover:shadow-lg cursor-pointer">
              <h1 className="font-semibold text-2xl">{beritaContent.title}</h1>
              <Image
                src={beritaContent.imageSrc}
                alt={beritaContent.title}
                width={300}
                height={300}
                className="m-8"
              />
              <p className="text-justify">{beritaContent.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
