"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface SearchOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

interface SearchResult {
  title: string;
  collection: string;
  id: string;
  slug: string;
  judul: string;
  shortDescription: string;
}

const SearchOverlay = ({ isVisible, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setResults(data.docs); // Access the `docs` property
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchBox = document.querySelector(".search-box");
      if (searchBox && !searchBox.contains(event.target as Node)) {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md search-box">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Search</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <input
          type="text"
          placeholder="Search news..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {isLoading && <div className="text-center py-2">Searching...</div>}
        {error && <div className="text-red-500 text-sm py-2">{error}</div>}

        <div className="max-h-[400px] overflow-y-auto">
          {results.map((result) => (
            <Link
              key={result.id}
              href={result.collection === 'konten-berita' ? `/berita/${result.slug}` : `/portofolio/${result.slug}`}
              className="block p-2 hover:bg-gray-100 rounded-lg"
              onClick={onClose}
            >
              <h3 className="font-medium">{result.collection === 'konten-berita' ? result.judul : result.title}</h3>
              <p className="text-sm text-gray-600">{result.shortDescription}</p>
              <p className="text-xs text-gray-500">
                Collection: {result.collection === 'konten-berita' ? 'Berita' : 'Portofolio'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Header() {
  const [isSearchVisible, setSearchVisible] = useState(false);

  // Memoize toggleSearch so it doesn't change on every render
  const toggleSearch = useCallback(() => {
    setSearchVisible((prev) => !prev);
  }, []);

  // add listener for keybind ctrl + k
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        toggleSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleSearch]);

  return (
    <header className="bg-white shadow-md">
      <div className="md:hidden flex items-center container mx-auto px-3 py-0">
        <Sheet>
          <Link href="/">
            <Image
              src="https://cdn.ibnukhaidar-pi.com/Neotic%20Text.svg"
              alt="Neotic Logo"
              width={80}
              height={80}
            />
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
              <button
                className="text-black hover:text-gray-800 px-3 py-1 flex gap-2 hover:cursor-pointer"
                onClick={toggleSearch}
              >
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
                <p className="text-black text-base font-semibold hover:text-gray-800">
                  Search
                </p>
              </button>
              <Link
                href="/berita"
                className="text-black text-base font-semibold hover:text-gray-800 px-3 py-1 flex gap-2"
              >
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
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                  />
                </svg>
                Berita
              </Link>
              <Link
                href="/portofolio"
                className="text-black text-base font-semibold hover:text-gray-800 px-3 py-1 flex gap-2"
              >
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
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                  />
                </svg>
                Portofolio
              </Link>
              <Link
                href="https://google.com"
                className="text-black text-base font-semibold hover:text-gray-800 px-3 py-1 flex gap-2"
              >
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
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                  />
                </svg>
                Get In Touch
              </Link>
              <Link
                href="/tentang"
                className="text-black text-base font-semibold hover:text-gray-800 px-3 py-1 flex gap-2"
              >
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
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                About
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="container mx-auto px-3 md:px-10 py-4 md:flex justify-between items-center hidden">
        <div className="shrink-0">
          <Link href="/">
            <Image
              priority
              src="https://cdn.ibnukhaidar-pi.com/Neotic%20Text.svg"
              alt="Neotic Logo"
              width={80}
              height={80}
            />
          </Link>
        </div>
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
        <div className="hidden md:flex shrink-0">
          <button
            onClick={toggleSearch}
            className="text-black hover:text-gray-800 hover:cursor-pointer"
          >
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

      {/* Search Overlay */}
      <SearchOverlay isVisible={isSearchVisible} onClose={toggleSearch} />
    </header>
  );
}
