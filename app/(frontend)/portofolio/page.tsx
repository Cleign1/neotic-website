import { JSX } from "react/jsx-runtime";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from '@payload-config';


interface PortoContent {
  id: string;
  title: string;
  imageSrc: string;
  shortDescription: string;
  slug: string;
}

async function fetchPortoContents(): Promise<PortoContent[]> {
  try {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "portofolioPage",
      pagination: false,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      imageSrc: doc.image.url,
      shortDescription: doc.shortDescription || "No description available",
      slug: doc.slug,
    }))

  } catch (error) {
    console.error("Error fetching data from Payload CMS:", error);
    return [];  // Return an empty array on error
  }
}

export default async function PortofolioPage(): Promise<JSX.Element> {
  const portoContents = await fetchPortoContents();

  return (
    <div className="my-10 min-h-screen">
      {/* Title */}
      <div className="bg-blue-210 text-center font-semibold text-2xl p-4">
        <h1>Portofolio</h1>
      </div>

      {/* First Section: About intro */}
      <div className="bg-blue-210 w-full mt-10 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 p-4">
          <div className="flex justify-center items-center m-8">
            <Image src="https://cdn.ibnukhaidar-pi.com/neotic_transparent.svg" alt="Neotic Logo" width={300} height={300}/>
          </div>
          <div className="flex flex-col justify-center text-center m-8 text-lg items-center">
            <p>
              Menciptakan produk aplikasi desktop, website, dan mobile untuk
              kebutuhan konsumen dan klien
            </p>
            <Button variant="secondary" className="w-32 m-4 bg-blue-210">
              <Link href="/tentang">Tentang Kami</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Second Section: Our Work */}
      <div className="bg-blue-210 w-full mt-10 mb-10">
        <div>
          <h1 className="text-center font-semibold text-2xl p-10">Our Work</h1>
          {portoContents.map((portoContents, index) => (
            <div
              key={index}
              className="grid grid-flow-row auto-rows-max justify-center">
              <div className="bg-white shadow-md rounded-lg p-8 m-4 mb-10 hover:shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex justify-center items-center m-8">
                    <Image
                      src={portoContents.imageSrc}
                      alt="Neotic Logo"
                      width={300}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col justify-center text-center m-8">
                    <h1 className="font-semibold text-xl mb-2">
                      {portoContents.title}
                    </h1>
                    <p className="text-base">
                      {portoContents.shortDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
