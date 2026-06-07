import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getGalleryImages } from '../lib/sanity';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseProject {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  location: string;
}

export default function SelectedWorks() {
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stripsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let mounted = true;
    async function fetchProjects() {
      const data = await getGalleryImages();
      if (mounted && data) {
        const topProjects = data.slice(0, 5).map((p: any) => ({
          ...p,
          location: 'Kochi, Kerala',
        }));
        setProjects(topProjects);
      }
    }
    fetchProjects();
    return () => { mounted = false; };
  }, []);

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (projects.length === 0) return;

    const ctx = gsap.context(() => {
      // Header Animation
      if (headerRef.current) {
        const lines = headerRef.current.querySelectorAll('.title-line');
        gsap.fromTo(lines,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
            }
          }
        );
      }

      // Strips Animation
      if (stripsRef.current.length > 0) {
        gsap.fromTo(stripsRef.current,
          { scaleY: 0.92, opacity: 0, transformOrigin: 'bottom center' },
          {
            scaleY: 1,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.75)',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
            }
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  if (projects.length === 0) return null;

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-8 bg-doit-black relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto">

        {/* SECTION HEADER */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <span className="block text-[10px] tracking-[0.22em] text-white/40 uppercase mb-4 title-line" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            The Collection
          </span>
          <h2 className="text-4xl md:text-6xl text-white leading-none title-line" style={{ fontFamily: '"Playfair Display", serif', fontWeight: 900 }}>
            Selected
          </h2>
          <h2 className="text-4xl md:text-6xl text-white leading-none title-line" style={{ fontFamily: '"Playfair Display", serif', fontWeight: 900 }}>
            Works
          </h2>
        </div>

        {/* ACCORDION CONTAINER */}
        <div
          className={cn(
            "flex w-full gap-1 md:gap-2",
            isMobile ? "flex-col h-[700px]" : "flex-row h-[500px] md:h-[600px]"
          )}
        >
          {projects.map((p, i) => {
            const isActive = activeIndex === i;
            const hasActive = activeIndex !== null;

            // Determine flex value based on state
            let flexValue = 1;
            if (hasActive) {
              flexValue = isActive ? 4 : 0.4;
            }

            return (
              <div
                key={`strip-${p._id}`}
                ref={el => { stripsRef.current[i] = el; }}
                onMouseEnter={() => !isMobile && setActiveIndex(i)}
                onMouseLeave={() => !isMobile && setActiveIndex(null)}
                onClick={() => isMobile && setActiveIndex(isActive ? null : i)}
                className="group relative overflow-hidden cursor-pointer bg-doit-surface rounded-sm"
                style={{
                  flex: flexValue,
                  transition: 'flex 0.65s cubic-bezier(0.76, 0, 0.24, 1)',
                }}
              >
                {/* Image */}
                <div
                  className={cn(
                    "absolute inset-0 w-full h-full transition-transform duration-[0.65s]",
                    "cubic-bezier(0.76, 0, 0.24, 1)",
                    isActive ? "scale-100" : "scale-105"
                  )}
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end pointer-events-none">

                  {/* Title */}
                  <h3
                    className={cn(
                      "text-2xl md:text-3xl text-white mb-2 transition-all duration-400 ease-out",
                      isActive ? "translate-y-0 opacity-100" : "translate-y-[30px] opacity-0"
                    )}
                    style={{ fontFamily: '"Playfair Display", serif', fontWeight: 900 }}
                  >
                    {p.title}
                  </h3>

                  {/* Category */}
                  <div
                    className={cn(
                      "flex items-center justify-between transition-all duration-400 ease-out delay-100",
                      isActive ? "translate-y-0 opacity-100" : "translate-y-[20px] opacity-0"
                    )}
                  >
                    <span
                      className="text-sm text-white/60 uppercase tracking-widest"
                      style={{ fontFamily: '"Cormorant Garamond", serif' }}
                    >
                      {p.category}
                    </span>

                    {/* CTA */}
                    <span
                      className="text-sm text-white flex items-center gap-2 group/cta transition-transform"
                    >
                      View Project <span className="group-hover/cta:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
