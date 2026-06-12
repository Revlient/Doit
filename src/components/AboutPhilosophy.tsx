import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface CoreValue {
  title: string;
  desc: string;
  icon: string;
}

export default function AboutPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorHover, setCursorHover] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');

  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // === CUSTOM CURSOR (Premium minimal) ===
  useEffect(() => {
    if (prefersReducedMotion) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'power2.out' });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power3.out' });
    };

    window.addEventListener('mousemove', moveCursor);

    const interactive = document.querySelectorAll('.interactive, .value-card, .image-reveal');
    
    const onEnter = (el: Element) => {
      setCursorHover(true);
      gsap.to(ring, { scale: 1.85, duration: 0.4, ease: 'expo.out' });
      if (el.classList.contains('image-reveal')) {
        setCursorLabel('EXPLORE');
        gsap.to(ring, { borderColor: '#14b8a6', duration: 0.3 }); // doit-teal
      }
    };

    const onLeave = () => {
      setCursorHover(false);
      setCursorLabel('');
      gsap.to(ring, { 
        scale: 1, 
        borderColor: 'rgba(255,255,255,0.5)', 
        duration: 0.5, 
        ease: 'expo.out' 
      });
    };

    interactive.forEach(el => {
      el.addEventListener('mouseenter', () => onEnter(el));
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactive.forEach(el => {
        el.removeEventListener('mouseenter', () => onEnter(el));
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [prefersReducedMotion]);

  // === SCROLL ANIMATIONS ===
  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.set([headlineRef.current, ...valueRefs.current, ...imageRefs.current], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Word-by-word hero cascade
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        gsap.fromTo(words, 
          { y: 80, opacity: 0, rotateX: -12 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 1.15, ease: 'expo.out', stagger: 0.07,
            scrollTrigger: { trigger: headlineRef.current, start: 'top 72%' }
          }
        );
      }

      // Typewriter for founding line
      const founding = document.querySelector('.founding-text');
      if (founding) {
        const chars = founding.querySelectorAll('.char');
        gsap.fromTo(chars,
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0,
            duration: 0.55, ease: 'expo.out', stagger: 0.032,
            scrollTrigger: { trigger: founding, start: 'top 80%' }
          }
        );
      }

      // Core Values
      valueRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 85, opacity: 0, rotateX: -8 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 1.05, ease: 'expo.out', delay: i * 0.07,
            scrollTrigger: { trigger: card, start: 'top 82%' }
          }
        );
      });

      // Cinematic image reveals + parallax
      imageRefs.current.forEach((container) => {
        if (!container) return;
        const img = container.querySelector('img');
        if (!img) return;

        gsap.fromTo(container,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.35, ease: 'expo.inOut',
            scrollTrigger: { trigger: container, start: 'top 78%' }
          }
        );

        gsap.to(img, {
          yPercent: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.6
          }
        });
      });

      // Philosophy paragraphs
      const paragraphs = sectionRef.current?.querySelectorAll('.philosophy-text');
      paragraphs?.forEach((p, i) => {
        gsap.fromTo(p,
          { opacity: 0, y: 38 },
          {
            opacity: 1, y: 0,
            duration: 0.95, ease: 'expo.out', delay: i * 0.1,
            scrollTrigger: { trigger: p, start: 'top 85%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const coreValues: CoreValue[] = [
    {
      title: "Innovative Design",
      desc: "We blend creativity with precision, crafting spaces that push boundaries while honoring timeless design principles.",
      icon: "◈"
    },
    {
      title: "Quality Craftsmanship",
      desc: "Every detail is meticulously executed with premium materials and expert techniques — built to endure for generations.",
      icon: "⟐"
    },
    {
      title: "Client-Centric",
      desc: "Your vision drives every decision. We listen, plan, and deliver spaces tailored to your unique aspirations and lifestyle.",
      icon: "◐"
    }
  ];

  // === IMAGE SETUP ===
  // Place your high-resolution images in: /public/images/
  // Recommended sizes: 2000px+ wide for hero shots
  const luxuryImages = [
    "/images/about.jpeg" 
  ];

  // Fallback demo images (high quality architectural) - replace with your own
  const demoImages = [
    "/images/about.jpeg" 
  ];

  const finalImages = luxuryImages.every(img => img.startsWith('/images/')) 
    ? demoImages 
    : luxuryImages;

  return (
    <>
      {/* Custom Premium Cursor */}
      {!prefersReducedMotion && (
        <div className="fixed inset-0 pointer-events-none z-[300] mix-blend-difference">
          <div 
            ref={cursorDotRef} 
            className="w-[7px] h-[7px] bg-doit-white rounded-full absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          />
          <div 
            ref={cursorRingRef} 
            className={cn(
              "w-8 h-8 border border-white/50 rounded-full absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2",
              cursorHover && "border-doit-teal"
            )}
          >
            {cursorLabel && (
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-[2.5px] text-doit-white/90 whitespace-nowrap">
                {cursorLabel}
              </div>
            )}
          </div>
        </div>
      )}

      <section 
        id="about" 
        ref={sectionRef}
        className="relative bg-doit-black text-doit-white overflow-hidden py-20 md:py-32"
      >
        {/* Ambient slow-drifting organic blobs (subtle, non-distracting) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-[8%] left-[6%] w-[620px] h-[620px] rounded-full bg-doit-teal/5 blur-[140px]"
            style={{ animation: prefersReducedMotion ? 'none' : 'drift 17s ease-in-out infinite' }}
          />
          <div 
            className="absolute bottom-[15%] right-[8%] w-[520px] h-[520px] rounded-full bg-doit-deep-blue/10 blur-[120px]"
            style={{ animation: prefersReducedMotion ? 'none' : 'drift 24s ease-in-out infinite reverse' }}
          />
        </div>

        <div className="max-w-[1920px] mx-auto px-6 md:px-14 lg:px-20 relative z-10">
          
          {/* HERO */}
          <div className="flex flex-col items-center text-center pt-10 pb-16 md:pb-24">
            <div className="founding-text mb-6 flex items-center gap-2.5 text-xs tracking-[4px] font-mono text-doit-teal">
              {"EST. 2019".split('').map((char, i) => (
                <span key={i} className="char inline-block">{char}</span>
              ))}
            </div>

            <h1 
              ref={headlineRef}
              className="max-w-6xl text-6xl md:text-7xl lg:text-[5.6rem] font-serif leading-[0.96] tracking-[-2.8px] text-balance"
            >
              {["A", "Vision", "That", "Inspires", "Excellence."].map((word, i) => (
                <span key={i} className="word inline-block mr-3 md:mr-4">{word}</span>
              ))}
            </h1>
            
            <p className="mt-7 max-w-lg text-xl text-doit-stone tracking-tight">
              Multidisciplinary design & construction firm dedicated to delivering exceptional spaces.
            </p>
          </div>

          {/* MAIN SPLIT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-16 mb-24 md:mb-32">
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <div className="uppercase tracking-[3px] text-xs text-doit-teal mb-4">ABOUT US</div>
                <p className="philosophy-text text-2xl md:text-3xl leading-tight text-doit-stone max-w-[38ch]">
                  Founded in 2019 by Mr. Zakhir Hussain and Mr. Najeeb, delivering exceptional spaces through innovative design.
                </p>
                
                <div className="mt-12 border-l border-doit-teal/30 pl-8">
                  <p className="italic text-xl text-doit-white/90">"Transforming ideas into timeless environments that inspire, perform, and endure."</p>
                  <p className="text-xs tracking-widest mt-4 text-doit-stone">— DO IT DESIGN & INTERIORS</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="lg:col-span-7">
              <div 
                ref={el => { imageRefs.current[0] = el; }}
                className="image-reveal interactive relative aspect-[16/10.8] overflow-hidden rounded-3xl group border border-doit-teal/5"
              >
                <img 
                  src={finalImages[0]} 
                  alt="Signature interior" 
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.055]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/70" />
                <div className="absolute bottom-10 left-10 max-w-xs">
                  <div className="text-doit-teal text-xs tracking-[3px] mb-2">SIGNATURE APPROACH</div>
                  <p className="text-3xl leading-none tracking-[-1px]">Layered simplicity.<br />Enduring beauty.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CORE PRINCIPLES */}
          <div className="mb-28">
            <div className="uppercase tracking-[3px] text-xs text-doit-teal mb-8">WHAT DRIVES US</div>
            <div className="grid md:grid-cols-3 gap-6">
              {coreValues.map((value, i) => (
                <div 
                  key={i}
                  ref={el => { valueRefs.current[i] = el; }}
                  className="value-card interactive group bg-doit-surface p-10 rounded-3xl border border-white/5 hover:border-doit-teal/30 transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div className="text-6xl mb-8 text-doit-teal/60 group-hover:text-doit-teal transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="font-serif text-4xl tracking-[-1px] mb-6">{value.title}</h3>
                  <p className="text-doit-stone leading-relaxed text-[15px]">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

         

          {/* DEEPER NARRATIVE */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-doit-teal text-xs tracking-[4px] mb-5">OUR STORY</div>
            <h2 className="text-5xl md:text-6xl font-serif tracking-[-2px] leading-none mb-12">
              Comprehensive Solutions,<br />Exceptional Results.
            </h2>

            <div className="space-y-8 text-left text-lg text-doit-stone leading-relaxed">
              <p className="philosophy-text">
                We offer comprehensive solutions in architecture, interiors, exteriors, landscaping, and civil construction, serving both residential and commercial clients. Our integrated approach ensures every project is thoughtfully planned, meticulously executed, and tailored to meet the unique aspirations of our clients.
              </p>
              <p className="philosophy-text">
                Driven by creativity, precision, and a passion for excellence, we transform ideas into timeless environments that seamlessly blend functionality, aesthetics, and lasting value. From budget-conscious developments to premium projects, our commitment remains unwavering — creating spaces that inspire, perform, and endure for generations.
              </p>
            </div>

            <a 
              href="#process" 
              className="interactive mt-14 inline-flex items-center gap-4 text-sm tracking-[3px] border-b border-doit-teal pb-1 hover:border-white transition-colors group"
            >
              EXPLORE OUR PROCESS
              <span className="transition-transform group-hover:translate-x-1.5">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}