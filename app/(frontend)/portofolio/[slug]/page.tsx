/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from "react/jsx-runtime";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";
import Image from "next/image";
import type { PortofolioPage } from "@/payload-types";
// import RichText from "@/app/components/RichText";
import { RichText } from '@payloadcms/richtext-lexical/react';

interface PortofolioPageProps {
    id: string,
    title: string,
    imageSrc: string,
    content: any,
    slug: string,
}

async function fetchPortofolioBySlug(slug: string): Promise<PortofolioPageProps | null> {
    try {
        const payload = await getPayload({ config: configPromise });

        const result = await payload.find({
            collection: "portofolioPage",
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

        const doc = result.docs[0] as PortofolioPage;
        return {
            id: doc.id.toString(),
            title: doc.title,
            imageSrc:
                typeof doc.image === "object" && "url" in doc.image
                    ? doc.image.url || ""
                    : "",
            content: doc.content,
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
        collection: "portofolioPage",
        pagination: false,
    });

    return result.docs.map((doc: PortofolioPage) => ({
        params: {
            slug: doc.slug,
        },
    }));
}

interface Args {
    params: {
        slug: string;
    };
}

export default async function PortofolioSlug({ params }: Args): Promise<JSX.Element> {
    const { slug } = await params;

    const portofolio = await fetchPortofolioBySlug(slug);

    if (!portofolio) {
        return <div>Halaman tidak ditemukan</div>;
    }    

    return(
        // header berita
        <div className="my-10 min-h-screen">
            <div className="bg-blue-210 text-center font-semibold text-2xl p-4">
                <Link href='/portofolio'>
                    <h1 className="text-3xl">Portofolio</h1>
                </Link>
            </div>

            {/* Isi dari Kontent Portofolio */}
            <div className="bg-blue-210 p-8 mt-10 mb-10 text-center">
                <div className="container mx-auto py-20">
                    <Image 
                        src={portofolio.imageSrc}
                        alt={portofolio.title}
                        width={300}
                        height={300}
                        className="rounded-xl mx-auto"
                    />
                    <h1 className="mt-4 text-2xl font-semibold p-6">{portofolio.title}</h1>
                    <div className="container mx-auto mt-4 p-20 text-left">
                        <RichText data={portofolio.content} />
                    </div>
                </div>
            </div>
        </div>
    )
}