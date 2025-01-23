import { JSX } from "react/jsx-runtime";
import neoticlogobig from "../components/logo/neotic_transparent.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import neoCourse2 from "../components/images/berita/05berita.jpg";
import neoCourse1 from "../components/images/berita/neocoursebatch1.jpg";
import { StaticImageData } from "next/image";

interface PortoContent {
  id: number;
  title: string;
  imageSrc: StaticImageData;
  shortDescription: string;
}

export default function PortofolioPage(): JSX.Element {
  const portoContents: PortoContent[] = [
    {
      id: 1,
      title: "NeoCourse Batch 1",
      imageSrc: neoCourse1,
      shortDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim quos eaque, maiores in animi voluptates! Libero, repellat.",
    },
    {
      id: 2,
      title: "NeoCourse Batch 2",
      imageSrc: neoCourse2,
      shortDescription:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita explicabo sit iusto minima consequatur corporis recusandae molestiae fuga aperiam natus!",
    },
  ];

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
            <Image src={neoticlogobig} alt="Neotic Logo" width={300} />
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
