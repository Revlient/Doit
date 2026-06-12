import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PackageLayout from '../../components/PackageLayout';
import { WHATSAPP_URL } from '../../config';

gsap.registerPlugin(ScrollTrigger);

/* ─── Package data ─── */
interface PackageItem {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const packages: PackageItem[] = [
  {
    name: 'Economy Package',
    subtitle: 'Turnkey 3 BHK Home or Flat Interior',
    price: '4.99 Lakhs*',
    features: [
      'Modular Kitchen',
      'Wardrobes',
      'TV Unit',
      'Basic Electrical Fittings',
      'Standard Paint Finish',
      'Quality Materials',
      'Professional Execution',
    ],
  },
  {
    name: 'Premium Package',
    subtitle: 'Turnkey 3 BHK Home or Flat Interior',
    price: '7.99 Lakhs*',
    features: [
      'Premium Modular Kitchen',
      'Designer Wardrobes',
      'TV Unit & Study Area',
      'Upgraded Electrical Fittings',
      'Premium Paint & Texture Finish',
      'Branded Materials',
      'Dedicated Project Manager',
      'Professional Execution',
    ],
    popular: true,
  },
  {
    name: 'Premium Luxury Plus',
    subtitle: 'Turnkey 3 BHK Home or Flat Interior',
    price: '11.99 Lakhs*',
    features: [
      'Luxury Modular Kitchen',
      'Premium Designer Wardrobes',
      'Custom TV Unit & Study',
      'Smart Electrical & Automation',
      'Luxury Paint & Wallpaper Finishes',
      'Imported / Top-Tier Materials',
      'Dedicated Senior Designer',
      'Dedicated Project Manager',
      'End-to-End Supervision',
    ],
  },
];

export default function InteriorWorks() {
  const gridRef = useRef<HTMLDivElement>(null);

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
      tagline="Turnkey Interior Solutions"
      subtext="Complete 3 BHK home and flat interior packages — from economy to premium luxury. Designed, executed, and delivered turnkey."
      heroImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2600&auto=format&fit=crop"
    >
      {/* ═══  Pricing Section  ═══ */}
      <section className="relative py-20 md:py-32">
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[12%] right-[10%] w-[480px] h-[480px] rounded-full bg-doit-teal/[0.025] blur-[140px]" />
          <div className="absolute bottom-[15%] left-[8%] w-[400px] h-[400px] rounded-full bg-doit-deep-blue/[0.04] blur-[120px]" />
        </div>

        <div
          ref={gridRef}
          className="max-w-[1280px] mx-auto px-6 md:px-14 lg:px-20 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`
                  pricing-card group relative rounded-3xl border transition-all duration-500
                  hover:-translate-y-2 hover:shadow-[0_16px_60px_rgba(47,143,179,0.1)] overflow-hidden
                  flex flex-col
                  ${
                    pkg.popular
                      ? 'bg-gradient-to-b from-doit-surface-elevated to-doit-surface border-doit-teal/30 shadow-[0_0_40px_rgba(47,143,179,0.08)]'
                      : 'bg-doit-surface border-white/5 hover:border-doit-teal/20'
                  }
                `}
              >
                {/* Popular accent */}
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-doit-teal to-transparent" />
                )}

                <div className="p-8 md:p-10 flex flex-col flex-1">
                  {/* Badge */}
                  {pkg.popular && (
                    <span className="self-start px-4 py-1.5 rounded-full text-[10px] font-sans tracking-[2.5px] uppercase bg-doit-teal/15 text-doit-teal border border-doit-teal/20 mb-6">
                      Most Popular
                    </span>
                  )}

                  {/* Subtitle */}
                  <span className="text-[10px] font-sans tracking-[2px] uppercase text-doit-stone/50 mb-2">
                    {pkg.subtitle}
                  </span>

                  {/* Package name */}
                  <h3 className="text-lg md:text-xl font-serif text-doit-white mb-5 tracking-[-0.3px]">
                    {pkg.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <span className={`text-4xl md:text-5xl font-serif tracking-[-2px] ${pkg.popular ? 'text-doit-teal' : 'text-doit-white'}`}>
                      ₹{pkg.price.split('Lakhs')[0].replace('₹', '').trim()}
                    </span>
                    <span className="text-sm text-doit-stone/50 font-sans tracking-wide ml-1.5">
                      Lakhs*
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/5 mb-7" />

                  {/* Inclusions header */}
                  <h4 className="text-[11px] font-sans tracking-[2.5px] uppercase text-doit-stone/50 mb-5">
                    What's Included
                  </h4>

                  {/* Features */}
                  <ul className="space-y-4 mb-10 flex-1">
                    {pkg.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-doit-teal/10 border border-doit-teal/20 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-doit-teal">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-doit-stone text-[13.5px] leading-snug">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      block text-center py-4 rounded-full text-sm font-medium tracking-[2px] uppercase transition-all duration-500 group/btn relative overflow-hidden
                      ${
                        pkg.popular
                          ? 'bg-doit-teal text-doit-black hover:shadow-[0_0_36px_rgba(47,143,179,0.25)] hover:scale-[1.02]'
                          : 'border border-doit-teal/30 text-doit-white/80 hover:bg-doit-teal hover:text-doit-black hover:border-doit-teal hover:scale-[1.02]'
                      }
                    `}
                  >
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-full" />
                    <span className="relative z-10">Free Estimate</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Terms note */}
          <p className="text-center text-[11px] text-doit-stone/40 tracking-wide font-sans mt-10">
            *Terms & Conditions Apply
          </p>
        </div>
      </section>
    </PackageLayout>
  );
}
