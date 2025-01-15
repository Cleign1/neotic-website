import Link from "next/link";
import Image from "next/image";
import neoticText from "../components/logo/Neotic Text.svg";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-3 py-0 flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              priority
              src={neoticText}
              alt="Neotic Logo"
              width={80}
             />
          </Link>
        </div>
        <nav className="flex-grow">
          <ul className="flex justify-center space-x-10">
            <li>
              <Link
                href="/berita"
                className="text-black text-lg font-semibold hover:text-gray-800 px-3 py-1">
                Berita
              </Link>
            </li>
            <li>
              <Link
                href="/portofolio"
                className="text-black text-lg font-semibold hover:text-gray-800 px-3 py-1">
                Portofolio
              </Link>
            </li>
            <li>
              <Link
                href="https://google.com"
                className="text-black text-lg font-semibold hover:text-gray-800 px-3 py-1">
                Get In Touch
              </Link>
            </li>
            <li>
              <Link
                href="/tentang"
                className="text-black text-lg font-semibold hover:text-gray-800 px-3 py-1">
                About
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex-shrink-0 ">
          <button className="text-black hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}