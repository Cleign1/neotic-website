import { JSX } from "react";
import neoticlatestnewsImage from "./components/images/neotic-latest news.jpg";
import neoticlatestprogramImage from "./components/images/neotic_latest program.jpg";
import revouLogo from "./components/images/P3Limage3Revou.png";
import dicodingLogo from "./components/images/P3Limage2Dicoding.png";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Section {
  type: "Program" | "Berita";
  title: string;
  imageSrc: StaticImageData;
  description: string;
}

export default function Home(): JSX.Element {
  const sections: Section[] = [
    {
      type: "Program",
      title: "Our Latest Program",
      imageSrc: neoticlatestprogramImage,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam illum fugit vero amet possimus? Dicta sunt hic eveniet accusantium fugiat?",
    },
    {
      type: "Berita",
      title: "Our Latest News",
      imageSrc: neoticlatestnewsImage,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam illum fugit vero amet possimus? Dicta sunt hic eveniet accusantium fugiat?",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 mb-10">
            {sections.map((section, index) => (
              <div
                key={index}
                className="p-16 rounded-xl flex flex-col items-center hover:shadow-lg justify-center"
              >
                <Link href={section.type === "Program" ? "/program" : "/berita"} className="flex flex-col items-center">
                  <h2 className="text-xl font-semibold mb-4 text-center">{section.title}</h2>
                  <Image
                    src={section.imageSrc}
                    alt={`${section.title} image`}
                    width={300}
                    height={300}
                    className="mx-auto"
                  />
                  <p className="text-gray-800 text-center p-3">{section.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 gap-5">
          <h1 className="font-semibold text-lg">Our Sponsor</h1>
          <div className="flex justify-center items-center space-x-10 mt-10 mb-10">
            <div>
              <Link href={"https://www.revou.co/"} target="_blank">
                <Image
                  src={revouLogo}
                  alt="Revou Logo"
                  width={150}
                  height={150}
                  className="mx-auto"
                />
              </Link>
              <Link href={"https://www.dicoding.com/"} target="_blank">
                <Image
                  src={dicodingLogo}
                  alt="Dicoding Logo"
                  width={150}
                  height={150}
                  className="mx-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
