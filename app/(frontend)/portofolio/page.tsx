import { JSX } from "react/jsx-runtime";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { PortofolioPage } from "@/payload-types"; // Adjust the import path as needed
import React from "react";

interface PortoContent {
  id: string;
  title: string;
  imageSrc: string;
  shortDescription: string;
  slug: string;
}

type PortoTop = {
  id: string;
  description: string;
  imageSrc: string;
};

async function fetchPortoContents(): Promise<PortoContent[]> {
  try {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "portofolioPage",
      pagination: false,
    });

    return result.docs.map((doc: PortofolioPage) => ({
      id: doc.id.toString(),
      title: doc.title,
      imageSrc:
        typeof doc.image === "object" && "url" in doc.image
          ? doc.image.url || ""
          : "",
      shortDescription: doc.shortDescription || "No description available",
      slug: doc.slug,
    }));
  } catch (error) {
    console.error("Error fetching data from Payload CMS:", error);
    return []; // Return an empty array on error
  }
}

async function fetchPortoTop(): Promise<PortoTop[]> {
  try {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      // ignore this error
      collection: "portofolioTop",
      pagination: false,
    });

    return result.docs.map((doc: PortofolioTop) => ({
      id: doc.id.toString(),
      description: doc.description || "No description available",
      imageSrc:
        typeof doc.image === "object" && "url" in doc.image
          ? doc.image.url || ""
          : "",
    }));
  } catch (error) {
    console.error("Error fetching data from Payload CMS:", error);
    return []; // Return an empty array on error
  }
}

export default async function PortofolioPage(): Promise<JSX.Element> {
  const portoContents = await fetchPortoContents();
  const portoTopData = await fetchPortoTop();

  return (
    <div className="my-10 min-h-screen">
      {/* Title */}
      <div className="bg-blue-210 text-center font-semibold text-2xl p-4">
        <h1>Portofolio</h1>
      </div>

      {/* First Section: About intro */}
      <div className="bg-blue-210 w-full mt-10 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 p-4">
          {portoTopData.map((portoTop, index) => (
            <React.Fragment key={index}>
              <div className="flex justify-center items-center m-8">
                <Image
                  src={portoTop.imageSrc}
                  alt="Neotic Logo"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex flex-col justify-center text-center m-8 text-lg items-center">
                <p>{portoTop.description}</p>
                <Button variant="secondary" className="w-32 m-4 bg-blue-210">
                  <Link href="/tentang">Tentang Kami</Link>
                </Button>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Second Section: Our Work */}
      <div className="bg-blue-210 w-full mt-10 mb-10">
        <div>
          <h1 className="text-center font-semibold text-2xl p-10">Our Work</h1>
          {portoContents.map((portoContent, index) => (
            <div
              key={index}
              className="grid grid-flow-row auto-rows-max justify-center"
            >
              <div className="bg-white shadow-md rounded-lg p-8 m-4 mb-10 hover:shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex justify-center items-center m-8">
                    <Image
                      src={portoContent.imageSrc}
                      alt="Neotic Logo"
                      width={300}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col justify-center text-center m-8">
                    <h1 className="font-semibold text-xl mb-2">
                      {portoContent.title}
                    </h1>
                    <p className="text-base">{portoContent.shortDescription}</p>
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
