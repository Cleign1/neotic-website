import { JSX } from "react/jsx-runtime";
import Link from "next/link";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import NotFound from "../../[...notFound]/page";

interface BeritaPage {
  id: string;
  title: string;
  imageSrc: string;
  content: SerializedEditorState;
  slug: string;
}

// Helper function to get the base URL dynamically
function getBaseUrl() {
  // Use Vercel's environment variables if available
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Fallback to local development URL
  return "http://localhost";
}

async function fetchBeritaBySlug(slug: string): Promise<BeritaPage | null> {
  try {
    const baseUrl = getBaseUrl();
    const apiUrl = `${baseUrl}/api/konten-berita?where[slug][equals]=${slug}&limit=1`;
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 } // Optional: Add revalidation if needed
    });

    if (!response.ok) throw new Error("Failed to fetch berita");
    
    const data = await response.json();
    if (data.docs.length === 0) return null;

    const doc = data.docs[0];
    return {
      id: doc.id,
      title: doc.judul,
      imageSrc: doc.gambar?.url || "",
      content: doc.konten,
      slug: doc.slug
    };
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const baseUrl = getBaseUrl();
    const apiUrl = `${baseUrl}/api/konten-berita?limit=0`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.docs.map((doc: BeritaPage) => ({ slug: doc.slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function BeritaPage({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const { slug } = params;
  const berita = await fetchBeritaBySlug(slug);

  if (!berita) return <NotFound />;

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
          <h1 className="mt-4 text-xl md:text-2xl font-semibold p-4 md:p-6 text-center">
            {berita.title}
          </h1>
          <div className="container mx-auto mt-4 md:px-56 rich-text-content">
            <RichText data={berita.content} />
          </div>
        </div>
      </div>
    </div>
  );
}