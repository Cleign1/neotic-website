import { JSX } from "react/jsx-runtime";
import Image from "next/image";
import { getPayload } from "payload";
import configPromise from '@payload-config'

interface BeritaContent {
  id: string;
  title: string;
  imageSrc: string;
  shortDescription: string;
}

async function fetchBeritaContents(): Promise<BeritaContent[]> {
  try {
    const payload = await getPayload({ config: configPromise})

    // Fetch data from Payload CMS
    const result = await payload.find({
      collection: "konten-berita",
      limit: 10, // Limit the number of results to 10
      pagination: false, // Disable pagination
    });

    // Map the Payload data to the BeritaContent interface
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.judul,
      imageSrc: doc.gambar.url, // Assuming 'gambar' is an upload field with a 'url' property
      shortDescription: doc.konten?.excerpt || "No description available", // Use richText field excerpt or fallback
    }));
  } catch (error) {
    console.error("Error fetching data from Payload CMS:", error);
    return []; // Return an empty array on error
  }
}

export default async function BeritaPage(): Promise<JSX.Element> {
  const beritaContents = await fetchBeritaContents();

  return (
    <div className="min-h-screen">
      <div className="bg-blue-210 text-center font-semibold text-2xl mt-10 p-4">
        <h1>Berita</h1>
      </div>
      <div className="bg-blue-210 grid grid-cols-1 md:grid-cols-3 gap-7 mt-10 mb-10 px-8 py-14">
        {beritaContents.map((beritaContent, index) => (
          <div
            key={index}
            className="justify-center bg-white p-10 rounded-xl flex flex-col items-center hover:shadow-lg"
          >
            <h1 className="font-semibold text-2xl">{beritaContent.title}</h1>
            <Image
              src={beritaContent.imageSrc}
              alt={beritaContent.title}
              width={300}
              height={200}
              className="m-8"
            />
            <p className="text-justify">{beritaContent.shortDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
