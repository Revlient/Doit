import { useEffect, useRef, useState, useMemo, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; 
import { getGalleryImages } from '../../lib/sanity';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
  const [allItems, setAllItems] = useState<GalleryItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('All'); 
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function loadImages() {
      const data = await getGalleryImages();
      if (mounted) setAllItems(data);
    }
    loadImages();
    return () => { mounted = false; };
  }, []);

  const filteredItems = useMemo(() => {
    let items = allItems;
    if (activeFilter !== 'All') {
      items = allItems.filter(item => item.category === activeFilter);
    }
    return limit ? items.slice(0, limit) : items;
  }, [allItems, activeFilter, limit]);

  const categories = useMemo(() => ['All', ...new Set(allItems.map(item => item.category))], [allItems]);

  const handleFilterChange = (category: string) => {
    if (selectedCategory === category || isTransitioning) return;

    setSelectedCategory(category);
    setIsTransitioning(true);

    const grid = gridRef.current;
    if (grid) {
      grid.style.minHeight = `${grid.offsetHeight}px`;
    }

    if (containerRef.current && grid) {
        const rect = grid.getBoundingClientRect();
        if (rect.top < 100) {
            gsap.to(window, { scrollTo: { y: containerRef.current, offsetY: 100 }, duration: 0.8, ease: 'power3.inOut' });
        }
    }

    const ctx = gsap.context(() => {
      gsap.to('.gallery-item', {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power3.out',
        stagger: 0.02,
        onComplete: () => {
          setActiveFilter(category);
          ctx.revert();
        }
      });
    }, containerRef);
  };

  useLayoutEffect(() => {
    if (filteredItems.length === 0 && allItems.length === 0) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger && (t.vars.trigger as Element).classList?.contains('gallery-item')) {
           t.kill();
        }
      });

      const items = gsap.utils.toArray<HTMLElement>('.gallery-item');
      
      if (isTransitioning) {
        gsap.set(items, { opacity: 0, y: 30 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.05,
          onComplete: () => {
            setIsTransitioning(false);
            if (gridRef.current) gridRef.current.style.minHeight = '';
            setupScrollTriggers(items);
            ScrollTrigger.refresh();
          }
        });
      } else {
        gsap.set(items, { opacity: 0, y: 50 });
        ScrollTrigger.batch(items, {
            onEnter: batch => gsap.to(batch, {
                opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out', overwrite: true
            }),
            start: "top 90%",
            once: true
        });
        setupScrollTriggers(items);
      }
    }, containerRef);
    return () => ctx.revert();
  }, [filteredItems]);

  const setupScrollTriggers = (items: HTMLElement[]) => {
    items.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            gsap.to(img, {
                scale: 1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
            gsap.set(img, { scale: 1.2 }); 
        }
    });
  };

  return (
    <section ref={containerRef} className="pb-24 px-4 md:px-8 lg:px-12 bg-doit-white relative z-10 flex flex-col items-center">
      <div className="max-w-[1920px] mx-auto w-full">
        
        {!limit && (
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16 md:mb-24 px-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleFilterChange(cat)}
                        disabled={isTransitioning}
                        className={cn(
                            "text-sm md:text-base font-serif transition-colors duration-300 relative py-1",
                            selectedCategory === cat 
                                ? "text-doit-black" 
                                : "text-doit-stone opacity-50 hover:opacity-100"
                        )}
                    >
                        {cat}
                        <span className={cn(
                            "absolute bottom-0 left-0 w-full h-[1px] bg-doit-charcoal transform transition-transform duration-500 ease-luxury origin-left",
                            selectedCategory === cat ? "scale-x-100" : "scale-x-0"
                        )}></span>
                    </button>
                ))}
            </div>
        )}
        
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 md:gap-y-24 md:gap-x-12 min-h-[50vh]">
          {filteredItems.map((image, index) => (
            <div 
              key={image._id} 
              className={cn(
                "gallery-item group relative overflow-hidden",
                (filteredItems.length > 2 && index % 3 === 1) ? "md:translate-y-12 lg:translate-y-20" : ""
              )}
            >
              <div 
                className="relative overflow-hidden w-full bg-doit-beige cursor-pointer"
                style={{ aspectRatio: image.aspectRatio || 4/3 }}
              >
                <img 
                  src={image.imageUrl} 
                  alt={image.title}
                  style={{ transform: 'scale(1.2)' }}
                  className="w-full h-full object-cover transform origin-center will-change-transform"
                />
                
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
              </div>

              <div className="mt-4 flex justify-between items-baseline opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-lg md:text-xl font-serif text-doit-charcoal">{image.title}</h3>
                <span className="text-xs font-sans tracking-widest uppercase text-doit-stone">{image.category}</span>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && allItems.length > 0 && (
             <div className="h-96 flex items-center justify-center text-doit-stone opacity-50 col-span-full">
                {activeFilter === 'All' ? 'Loading Gallery...' : 'No projects found in this category'}
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
