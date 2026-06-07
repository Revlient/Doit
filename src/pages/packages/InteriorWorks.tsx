import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PackageLayout from '../../components/PackageLayout';
import { WHATSAPP_URL } from '../../config';

gsap.registerPlugin(ScrollTrigger);

/* ─── Package data ─── */
interface PackageItem {
  name: string;
  price: string;
  inclusions: string[];
}

const packages: PackageItem[] = [
  {
    name: '2 BHK',
    price: '₹2,99,000/-*',
    inclusions: [
      'TV Unit',
      'Prayer Unit',
      'Dining Wash Unit',
      'Wardrobe (2 Nos)',
      'Modular Kitchen',
    ],
  },
  {
    name: '3 BHK',
    price: '₹3,49,000/-*',
    inclusions: [
      'TV Unit',
      'Prayer Unit',
      'Dining Wash Unit',
      'Wardrobe (3 Nos)',
      'Modular Kitchen',
    ],
  },
];

export default function InteriorWorks() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  const prefersRM =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Card animations ── */
  useEffect(() => {
    if (prefersRM) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.pricing-card');
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 70, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
          }
        );
      }
    }, gridRef);
    return () => ctx.revert();
  }, [prefersRM]);

  return (
    <PackageLayout
      breadcrumbLabel="Interior Works"
      headline="Interior Works"
      tagline="A behind the scenes look at our agency"
      subtext="From concept to completion, discover how we bring your vision to life with innovation, collaboration, and expert craftsmanship."
      heroImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2600&auto=format&fit=crop"
    >
      {/* ═══  Pricing Section  ═══ */}
      <section className="relative py-20 md:py-32">
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[12%] right-[10%] w-[480px] h-[480px] rounded-full bg-doit-teal/[0.025] blur-[140px]" />
          <div className="absolute bottom-[15%] left-[8%] w-[400px] h-[400px] rounded-full bg-doit-deep-blue/[0.04] blur-[120px]" />
        </div>

        <div className="max-w-[960px] mx-auto px-6 md:px-14 lg:px-20 relative z-10">
          {/* ── Mobile toggle ── */}
          <div className="flex md:hidden justify-center mb-10">
            <div className="inline-flex rounded-full border border-doit-border p-1 bg-doit-surface">
              {packages.map((pkg, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`
                    px-7 py-2.5 rounded-full text-xs font-sans tracking-[2px] uppercase transition-all duration-400
                    ${
                      activeTab === i
                        ? 'bg-doit-teal text-doit-black shadow-[0_0_20px_rgba(47,143,179,0.15)]'
                        : 'text-doit-stone hover:text-doit-white'
                    }
                  `}
                >
                  {pkg.name}
                </button>
              ))}
            </div>
          </div>

          {/* ── Cards grid (desktop: 2 cols, mobile: toggle) ── */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`
                  pricing-card group relative rounded-3xl border border-white/5 hover:border-doit-teal/25
                  bg-gradient-to-b from-doit-surface-elevated to-doit-surface
                  transition-all duration-500 hover:-translate-y-2
                  hover:shadow-[0_16px_60px_rgba(47,143,179,0.1)] overflow-hidden flex flex-col
                  ${i !== activeTab ? 'hidden md:flex' : 'flex'}
                `}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-doit-teal to-transparent" />

                <div className="p-9 md:p-11 flex flex-col flex-1">
                  {/* Package name */}
                  <span className="self-start px-4 py-1.5 rounded-full text-[10px] font-sans tracking-[2.5px] uppercase bg-doit-teal/15 text-doit-teal border border-doit-teal/20 mb-7">
                    {pkg.name} Package
                  </span>

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-[11px] font-sans tracking-[1.5px] uppercase text-doit-stone/40 block mb-1.5">
                      Just
                    </span>
                    <span className="text-4xl md:text-5xl font-serif tracking-[-2px] text-doit-teal">
                      {pkg.price}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/5 mb-7" />

                  {/* Inclusions header */}
                  <h4 className="text-[11px] font-sans tracking-[2.5px] uppercase text-doit-stone/50 mb-5">
                    What's Included
                  </h4>

                  {/* Inclusions list */}
                  <ul className="space-y-4 mb-10 flex-1">
                    {pkg.inclusions.map((item, j) => (
                      <li key={j} className="flex items-center gap-3.5">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-doit-teal/10 border border-doit-teal/20 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-doit-teal">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-doit-white/80 text-[15px] font-sans">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-4 rounded-full bg-doit-teal text-doit-black text-sm font-medium tracking-[2px] uppercase transition-all duration-500 hover:shadow-[0_0_36px_rgba(47,143,179,0.25)] hover:scale-[1.02] relative overflow-hidden group/btn"
                  >
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-full" />
                    <span className="relative z-10">Free Estimate</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PackageLayout>
  );
}
