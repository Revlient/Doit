import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Environment variables should be used in production
// For now, we'll use placeholders or read from import.meta.env
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your_project_id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getGalleryImages() {
  // In a real scenario, this fetches from Sanity
  // Schema: Image, Category, Order
  const query = `*[_type == "galleryImage"] | order(order asc) {
    _id,
    title,
    category,
    "imageUrl": image.asset->url,
    "lqip": image.asset->metadata.lqip,
    "aspectRatio": image.asset->metadata.dimensions.aspectRatio
  }`;

  try {
     // Check if we have a project ID to fetch, otherwise mock
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
      console.warn("Sanity Project ID not found. Using mock data.");
      return getMockGalleryImages();
    }
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
    return getMockGalleryImages();
  }
}

function getMockGalleryImages() {
  return [
    {
      _id: '1',
      title: 'Minimalist Loft',
      category: 'Residential',
      imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600',
      aspectRatio: 1.5,
    },
    {
      _id: '2',
      title: 'Stone House',
      category: 'Architecture',
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600',
      aspectRatio: 0.8,
    },
    {
      _id: '3',
      title: 'Concrete Villa',
      category: 'Residential',
      imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1600',
      aspectRatio: 1.2,
    },
    {
      _id: '4',
      title: 'Modern Office',
      category: 'Commercial',
      imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=1600',
      aspectRatio: 1.0,
    },
     {
      _id: '5',
      title: 'Scandinavian Apartment',
      category: 'Residential',
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1600',
      aspectRatio: 1.4,
    },
     {
      _id: '6',
      title: 'Urban Sanctuary',
      category: 'Residential',
      imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1600',
      aspectRatio: 0.7,
    },
    {
      _id: '7',
      title: 'The Glass House',
      category: 'Architecture',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600',
      aspectRatio: 1.3,
    },
    {
      _id: '8',
      title: 'Nordic Retreat',
      category: 'Residential',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1600',
      aspectRatio: 0.9,
    },
    {
      _id: '9',
      title: 'Industrial Loft',
      category: 'Commercial',
      imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=1600',
      aspectRatio: 1.1,
    }
  ];
}
