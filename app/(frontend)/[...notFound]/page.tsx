import Link from "next/link";

export default function NotFound() {
  return (
        <div className="min-h-screen flex items-center justify-center bg-blue-210 dark:bg-gray-900">
          <div className="text-center space-y-4 p-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">404 - Halaman Tidak Ditemukan</h1>
            <p className="text-gray-600 dark:text-gray-300">Maaf, halaman yang Anda cari tidak ada.</p>
            <Link 
              href="/" 
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kembali ke beranda
            </Link>
          </div>
        </div>
  );
}
