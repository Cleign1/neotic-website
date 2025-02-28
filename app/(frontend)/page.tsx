import revouLogo from "@/components/images/P3Limage3Revou.png";
import dicodingLogo from "@/components/images/P3Limage2Dicoding.png";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react/jsx-runtime";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import CreateMessage from "../components/CreateMessage";
// import { revalidateTag } from 'next/cache';


interface Section {
  type: "Portofolio" | "Berita";
  id: string;
  title: string;
  imageSrc: string;
  description: string;
}


async function fetchSections(): Promise<Section[]> {
  try {
    const payload = await getPayload({ config: configPromise });

    // revalidateTag('konten-berita');
    // revalidateTag('portofolioPage');

    const beritaResult = await payload.find({
      collection: "konten-berita",
      pagination: false,
    });

    const portofolioResult = await payload.find({
      collection: "portofolioPage",
      pagination: false,
    });

    const newestBerita = beritaResult.docs[0];
    const newestPortofolio = portofolioResult.docs[0];

    const hasilAkhir = [
      {
        type: "Berita",
        id: newestBerita.id.toString(),
        title: newestBerita.judul,
        imageSrc:
          typeof newestBerita.gambar === "object" &&
          "url" in newestBerita.gambar
            ? newestBerita.gambar.url || ""
            : "",
        description: newestBerita.shortDescription || "Tidak ada deskripsi",
      },
      {
        type: "Portofolio",
        id: newestPortofolio.id.toString(),
        title: newestPortofolio.title,
        imageSrc:
          typeof newestPortofolio.image === "object" &&
          "url" in newestPortofolio.image
            ? newestPortofolio.image.url || ""
            : "",
        description: newestPortofolio.shortDescription || "Tidak ada deskripsi",
      },
    ] as Section[];

    return hasilAkhir;
  } catch (error) {
    console.error("Error fetching data from Payload CMS:", error);
    return [];
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0; // This disables cache and forces dynamic rendering

export default async function Home(): Promise<JSX.Element> {
  const Sections = await fetchSections();

  return (
    <div className="min-h-screen">
      {/* Add Sonner Toaster */}
      {/* section latest program */}
      <div className="bg-blue-210">
        <div className="container mx-auto px-4 md:px-10 gap-5 p-1 mt-10 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 mb-10">
            {Sections.map((section, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl flex flex-col items-center hover:shadow-lg justify-center"
              >
                <Link
                  href={
                    section.type === "Portofolio" ? "/portofolio" : "/berita"
                  }
                  className="flex flex-col items-center"
                >
                  <h2 className="text-xl font-semibold mb-4 text-center p-4">
                    {section.title}
                  </h2>
                  <Image
                    src={section.imageSrc}
                    alt={`${section.title} image`}
                    width={300}
                    height={300}
                    className="mx-auto"
                  />
                  <p className="text-gray-800 text-center p-3 mt-5">
                    {section.description}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* section sponsor  */}
      <div className="bg-blue-210 py-10">
        <div className="container mx-auto px-4 gap-5">
          <h1 className="font-semibold text-lg text-center mb-8">
            Our Sponsor
          </h1>
          <div className="flex justify-center items-center space-x-10">
            <div>
              <Link href={"https://www.revou.co/"} target="_blank">
                <Image src={revouLogo} alt="Revou Logo" className="mx-auto" />
              </Link>
            </div>
            <div>
              <Link href={"https://www.dicoding.com/"} target="_blank">
                <Image
                  src={dicodingLogo}
                  alt="Dicoding Logo"
                  className="mx-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* section question query */}
      <div className="bg-blue-210 py-10 mt-10 mb-10">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* section kiri: contact info */}
            <div className="order-1 md:order-none">
              <h2 className="text-2xl font-semibold mb-4">Punya Pertanyaan?</h2>
              <p className="text-gray-900 mb-4">
                Jika anda punya pertanyaan bisa hubungi kami disini.
              </p>
              <p className="text-gray-900 mb-4">
                Pertanyaan akan dijawab paling lama 24 pada Jam Kerja, atau bisa
                menghubungi di bawah ini
              </p>
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                <Link className="text-gray-900" href="mailto:info@neotic.id">
                  info@neotic.id
                </Link>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </span>
                <Link
                  className="text-gray-900"
                  href="https://instagram.com/neotic.id"
                  target="_blank"
                >
                  @neotic.id
                </Link>
              </div>
            </div>

            {/* section kanan: form kontak */}
            <CreateMessage />
          </div>
        </div>
      </div>
    </div>
  );
}