import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from "@payload-config";


interface RichTextNode {
  text?: string;
  children?: RichTextNode[];
}

interface RichTextData {
  root: {
    children: RichTextNode[];
  };
}

// Helper function to search within rich text
const searchRichText = (richText: RichTextData, query: string): boolean => {
  if (!richText || !richText.root || !richText.root.children) return false;

  // Recursively search through the rich text structure
  const searchNode = (node: RichTextNode): boolean => {
    if (node.text && node.text.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    if (node.children) {
      return node.children.some(searchNode);
    }
    return false;
  };

  return richText.root.children.some(searchNode);
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const payload = await getPayload({ config: configPromise });


  if (!query) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch documents from both collections
    const [beritaResults, portofolioResults] = await Promise.all([
      payload.find({
        collection: 'konten-berita',
        limit: 100, // Adjust the limit as needed
      }),
      payload.find({
        collection: 'portofolioPage',
        limit: 100, // Adjust the limit as needed
      }),
    ]);

    // Filter documents where `judul` or `konten` contains the query
    const filteredBerita = beritaResults.docs.filter((doc) => {
      const matchesJudul = doc.judul && doc.judul.toLowerCase().includes(query.toLowerCase());
      const matchesKonten = doc.konten && searchRichText(doc.konten, query);
      return matchesJudul || matchesKonten;
    });

    // Filter documents from `portofolioPage` collection
    const filteredPortofolio = portofolioResults.docs.filter((doc) => {
      const matchesJudul = doc.title && doc.title.toLowerCase().includes(query.toLowerCase());
      const matchesKonten = doc.content && searchRichText(doc.content, query);
      return matchesJudul || matchesKonten;
    });

    // Combine results from both collections
    const combinedResults = [
      ...filteredBerita.map((doc) => ({ ...doc, collection: 'konten-berita' })),
      ...filteredPortofolio.map((doc) => ({ ...doc, collection: 'portofolioPage' })),
    ];
    return NextResponse.json({ docs: combinedResults });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}