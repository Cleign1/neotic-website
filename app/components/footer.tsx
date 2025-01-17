import neoticBigLogi from "../components/logo/Neotic_Doang_Big logo.svg";
import neoticText from "../components/logo/Neotic Text.svg";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white shadow-md">
      <div className="container mx-auto px-3 py-2 flex justify-between items-center">
        <div className="flex-shrink-0">
          <div>
            <Link href="/">
              <Image
                priority
                src={neoticBigLogi}
                alt="Neotic Logo"
                height={100}
              />
            </Link>
            <p className="pl-2 font-semibold">
              &quot;Easy to use, Easy to work&quot; <br />
              Dig your knowledge, <br />
              engrave your curiosity with us
            </p>
          </div>
        </div>
        <div className="flex-grow">
          <ul className="flex justify-center space-x-10 text-center">
            <li>
              <Link href="/">
                <Image
                  src={neoticText}
                  alt="Neotic Logo"
                  height={100}
                />
              </Link>
              <Link href="/about" className="text-black hover:text-gray-800 font-semibold">
                About us
              </Link>
              <br />
              <Link href="https://google.com" className="text-black hover:text-gray-800 font-semibold">
                Get In Touch
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-shrink-0">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-black font-semibold text-lg">Social Media</p>
            <div className="flex space-x-4">
              <Link href="https://linkedin.com/neotic.id">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="currentColor"
                  style={{ color: "#0077b5" }}
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5S0 4.881 0 3.5 1.11 1 2.48 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm8.002 0h4.968v2.155c2.096-3.879 11.018-4.166 11.018 3.714V24h-4.988v-8.399c0-5.052-6.029-4.67-6.029 0V24H8.002V8z" />
                </svg>
              </Link>
              <Link href="https://instagram.com/neotic.id">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="currentColor"
                  style={{ color: "#c13584" }}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}