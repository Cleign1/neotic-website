import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between">
        <div className="">
          <Link href="/" className="text-black text-xl font-bold">NEOTIC</Link>
        </div>
        <div className="flex ">
          <nav>
            <ul>
              <li>
                <Link
                  href="/berita"
                  className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded">
                  Berita
                </Link>
              </li>
            </ul>
          </nav>
          <nav>
            <ul>
              <li>
                <Link
                  href="/portofolio"
                  className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded">
                  Portofolio
                </Link>
              </li>
            </ul>
          </nav>
          <nav>
            <ul>
              <li>
                <Link
                  href="/get-in-touch"
                  className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded">
                    Get In Touch
                </Link>
              </li>
            </ul>
          </nav>
          <nav>
            <ul>
              <li>
                <Link
                  href="/tentang"
                  className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded">
                  Tentang
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}