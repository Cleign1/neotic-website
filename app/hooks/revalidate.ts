import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateBerita: CollectionAfterChangeHook = ({
  doc,
  req: { payload }, // Remove context since it's not used
}) => {
  // Revalidate the home page since it shows latest news
  payload.logger.info('Revalidating home page after berita change')
  revalidatePath('/')
  
  // Revalidate the news page
  revalidatePath('/berita')
  
  // Revalidate the specific news article page if needed
  if (doc.id) {
    revalidatePath(`/berita/${doc.id}`)
  }
  
  // Add a tag for berita collection
  revalidateTag('berita')
  
  return doc
}

export const revalidatePortofolio: CollectionAfterChangeHook = ({
  doc,
  req: { payload }, // Remove context since it's not used
}) => {
  // Revalidate the home page since it shows latest portfolio
  payload.logger.info('Revalidating home page after portfolio change')
  revalidatePath('/')
  
  // Revalidate the portfolio page
  revalidatePath('/portofolio')
  
  // Revalidate specific portfolio page if needed
  if (doc.id) {
    revalidatePath(`/portofolio/${doc.id}`)
  }
  
  // Add a tag for portfolio collection
  revalidateTag('portofolio')
  
  return doc
}

export const revalidateBeritaDelete: CollectionAfterDeleteHook = ({ 
  doc, 
  req: { payload } 
}) => {
  payload.logger.info('Revalidating after berita deletion')
  revalidatePath('/')
  revalidatePath('/berita')
  revalidateTag('berita')
  return doc
}

export const revalidatePortofolioDelete: CollectionAfterDeleteHook = ({ 
  doc, 
  req: { payload } 
}) => {
  payload.logger.info('Revalidating after portfolio deletion')
  revalidatePath('/')
  revalidatePath('/portofolio')
  revalidateTag('portofolio')
  return doc
}