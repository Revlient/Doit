import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getGalleryImages } from '../../lib/sanity';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  aspectRatio: number;
}

interface GalleryProps {
  limit?: number;
  showViewMore?: boolean;
}

export default function Gallery({ limit, showViewMore = false }: GalleryProps) {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadImages() {
      const data = await getGalleryImages();
      // Apply limit if specified
      setImages(limit ? data.slice(0, limit) : data);
    }
    loadImages();
  }, [limit]);

  useEffect(() => {
    if (images.length === 0) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>('.gallery-item');
        
        items.forEach((item, i) => {
          // Clean up previous animations if any (optional but good practice)
          gsap.killTweensOf(item);
          const img = item.querySelector('img');
          if(img) gsap.killTweensOf(img);

          // Parallax effect for image inside the container
          gsap.fromTo(item, 
            { 
              y: 100, 
              opacity: 0 
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom-=10%',
                toggleActions: 'play none none reverse'
              }
            }
          );

          if (img) {
             gsap.fromTo(img,
              { scale: 1.2 },
              {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: item,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                }
              }
             );
          }
        });
      }, containerRef);
      
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [images]);

  return (
    <section ref={containerRef} className="pb-24 px-4 md:px-8 lg:px-12 bg-doit-white relative z-10 flex flex-col items-center">
      <div className="max-w-[1920px] mx-auto w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 md:gap-y-24 md:gap-x-12">
          {images.map((image, index) => (
            <div 
              key={image._id} 
              className={cn(
                "gallery-item group relative overflow-hidden",
                // Offset every 2nd item in a column for masonry feel (simplified)
                index % 3 === 1 ? "md:translate-y-12 lg:translate-y-20" : ""
              )}
            >
              <div 
                className="relative overflow-hidden w-full bg-doit-beige cursor-pointer"
                style={{ aspectRatio: image.aspectRatio || 4/3 }}
              >
                <img 
                  src={image.imageUrl} 
                  alt={image.title}
                  className="w-full h-full object-cover transform origin-center transition-transform duration-700 will-change-transform"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
              </div>

              <div className="mt-4 flex justify-between items-baseline opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-lg md:text-xl font-serif text-doit-charcoal">{image.title}</h3>
                <span className="text-xs font-sans tracking-widest uppercase text-doit-stone">{image.category}</span>
              </div>
            </div>
          ))}
        </div>
        
        {images.length === 0 && (
             <div className="h-96 flex items-center justify-center text-doit-stone opacity-50">
                Loading Gallery...
             </div>
        )}
      </div>

      {showViewMore && (
        <div className="mt-32 md:mt-40">
           <button 
             onClick={() => navigate('/work')}
             className="relative group overflow-hidden px-8 py-3"
           >
              <span className="relative z-10 text-sm font-sans tracking-[0.2em] uppercase text-doit-charcoal transition-colors group-hover:text-doit-white">
                View All Projects
              </span>
              <div className="absolute inset-0 bg-doit-charcoal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-luxury origin-left"></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-doit-charcoal/30 group-hover:bg-transparent transition-colors"></div>
           </button>
        </div>
      )}
    </section>
  );
}
