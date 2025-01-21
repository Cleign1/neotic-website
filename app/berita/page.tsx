import { JSX } from "react/jsx-runtime";
import Image, { StaticImageData } from "next/image";
import berita01 from "../components/images/berita/01berita.jpg";
import berita02 from "../components/images/berita/02berita.jpg";
import berita03 from "../components/images/berita/03berita.jpg";
import berita04 from "../components/images/berita/04berita.jpg";
import berita05 from "../components/images/berita/05berita.jpg";
import berita06 from "../components/images/berita/06berita.jpg";
import berita07 from "../components/images/berita/07berita.jpg";
import berita08 from "../components/images/berita/08berita.jpg";
import berita09 from "../components/images/berita/09berita.jpg";

interface BeritaContent {
  id: number;
  title: string;
  imageSrc: StaticImageData;
  shortDescription: string;
}

export default function BeritaPage(): JSX.Element {
  const beritaContents: BeritaContent[] = [
    {
      	id: 1,
      	title: "Berita 1",
      	imageSrc: berita01,
      	shortDescription:
        	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim quos eaque, maiores in animi voluptates! Libero, repellat.",
    },
    {
		id: 2,
		title: "Berita 2",
		imageSrc: berita02,
		shortDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita explicabo sit iusto minima consequatur corporis recusandae molestiae fuga aperiam natus!",
	},
	{
		id: 3,
		title: "Berita 3",
		imageSrc: berita03,
		shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim quos eaque, maiores in animi voluptates! Libero, repellat.",
	},
	{
		id:4,
		title: "Berita 4",
		imageSrc: berita04,
		shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim quos eaque, maiores in animi voluptates! Libero, repellat.",
	},
	{
		id: 5,
		title: "Berita 5",
		imageSrc: berita05,
		shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim quos eaque, maiores in animi voluptates! Libero, repellat.",
	},
	{
		id: 6,
		title: "Berita 6",
		imageSrc: berita06,
		shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim quos eaque, maiores in animi voluptates! Libero, repellat.",
	},
	{
		id: 7,
		title: "Berita 7",
		imageSrc: berita07,
		shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim quos eaque, maiores in animi voluptates! Libero, repellat.",
	},
	{
		id: 8,
		title: "Berita 8",
		imageSrc: berita08,
		shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim quos eaque, maiores in animi voluptates! Libero, repellat.",
	},
	{
		id: 9,
		title: "Berita 9",
		imageSrc: berita09,
		shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim quos eaque, maiores in animi voluptates! Libero, repellat.",
	}
  ];

  return (
    <div>
      <div className="bg-blue-210  text-center font-semibold text-2xl mt-10 p-4">
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
              alt="gambarblog1"
              className="m-8"
            />
            <p className="text-justify">{beritaContent.shortDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
