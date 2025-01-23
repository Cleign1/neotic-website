import Link from "next/link";
import Image from "next/image";
import neoticText from "../components/logo/Neotic Text.svg";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="md:hidden flex items-center container mx-auto px-3 py-0">
        <Sheet>
          <Link href="/">
            <Image src={neoticText} alt="Neotic Logo" width={80} />
          </Link>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden ml-auto text-black">
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <span className="sr-only">Neotic.id</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="font-semibold">Menu</SheetTitle>
            <div className="grid gap-2 py-4">
              <Link
                href="/berita"
                className="text-black text-base font-semibold hover:text-gray-800 px-3 py-1"
              >
                Berita
              </Link>
              <Link
                href="/portofolio"
                className="text-black text-base font-semibold hover:text-gray-800 px-3 py-1"
              >
                Portofolio
              </Link>
              <Link
                href="https://google.com"
                className="text-black text-base font-semibold hover:text-gray-800 px-3 py-1"
              >
                Get In Touch
              </Link>
              <Link
                href="/tentang"
                className="text-black text-base font-semibold hover:text-gray-800 px-3 py-1"
              >
                About
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="container mx-auto px-3 py-4 md:flex justify-between items-center hidden">
        <div className="shrink-0">
          <Link href="/">
            <Image priority src={neoticText} alt="Neotic Logo" width={80} />
          </Link>
        </div>
        {/* pc navbar */}
        <nav className="hidden md:flex grow justify-center">
          <ul className="flex justify-center space-x-10">
            <li>
              <Link
                href="/berita"
                className="text-black text-lg font-semibold hover:text-gray-800 px-3 py-1"
              >
                Berita
              </Link>
            </li>
            <li>
              <Link
                href="/portofolio"
                className="text-black text-lg font-semibold hover:text-gray-800 px-3 py-1"
              >
                Portofolio
              </Link>
            </li>
            <li>
              <Link
                href="https://google.com"
                className="text-black text-lg font-semibold hover:text-gray-800 px-3 py-1"
              >
                Get In Touch
              </Link>
            </li>
            <li>
              <Link
                href="/tentang"
                className="text-black text-lg font-semibold hover:text-gray-800 px-3 py-1"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
        <div className="hidden md:flex shrink-0 ">
          <button className="text-black hover:text-gray-800">
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
