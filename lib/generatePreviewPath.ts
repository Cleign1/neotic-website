import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
    'konten-berita': '/preview/konten-berita', // Add a prefix for the KontenBerita collection
  };

type Props = {
  collection: CollectionSlug
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, req }: Props ) => {
  const path = `${collectionPrefixMap[collection]}/${slug}`;

  const params = {
    slug,
    collection,
    path,
  };

  const encodedParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value);
  });

  const isProduction =
    process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  const protocol = isProduction ? 'https:' : req.protocol;

  const url = `${protocol}//${req.host}/next/preview?${encodedParams.toString()}`;

  return url;
};