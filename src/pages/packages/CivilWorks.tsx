import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PackageLayout from '../../components/PackageLayout';
import { WHATSAPP_URL } from '../../config';

gsap.registerPlugin(ScrollTrigger);

/* ─── Tier data ─── */
interface Tier {
  name: string;
  price: string;
  unit: string;
  tagline: string;
  features: string[];
  popular?: boolean;
}

const tiers: Tier[] = [
  {
    name: 'Budget-Friendly',
    price: '₹1,699',
    unit: '/Sqft*',
    tagline: 'Affordable & reliable construction without compromising on quality essentials.',
    features: [
      'RCC Structure',
      'Solid Block Masonry',
      'Vitrified Tile Flooring',
      'Solid Wood Main Door',
      'Metal Frame Doors & Windows',
      'Concealed Wiring',
      'Plumbing & Quality Sanitary Fixtures',
      'White Cement Finish',
      'Affordable & Reliable Construction',
    ],
  },
  {
    name: 'Standard',
    price: '₹1,999',
    unit: '/Sqft*',
    tagline: 'Professional quality construction with the ideal balance of durability, aesthetics, and value.',
    features: [
      'RCC Structure',
      'Solid Block Masonry',
      'Vitrified Flooring',
      'Steel Main Door & Flush Internal Doors',
      'Concealed Wiring & Modular Switches',
      'AC, Inverter & Geyser Provisions',
      'CPVC Plumbing & Standard Sanitaryware',
      'Interior & Exterior Paint Finish',
      'Professional Quality Construction',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: '₹2,299',
    unit: '/Sqft*',
    tagline: 'Elevated materials with smart home provisions and luxury finishes for spaces that make a statement.',
    features: [
      'RCC Structure & Waterproofing',
      'Solid / Laterite Block Masonry',
      'Premium Vitrified Flooring',
      'Premium Steel Main Door & WPC Internal Doors',
      'Concealed Wiring & Premium Switches',
      'Smart Home & EV Charging Provisions',
      'Premium Plumbing & Sanitaryware',
      'Putty with Luxury Paint Finishes',
      'Quality Construction with Professional Supervision',
    ],
  },
];

export default function CivilWorks() {
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
      breadcrumbLabel="Civil Works"
      headline="Civil Works"
      tagline="A behind the scenes look at our agency"
      subtext="From concept to completion, discover how we bring your vision to life with innovation, collaboration, and expert craftsmanship."
      heroImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2600&auto=format&fit=crop"
    >
      {/* ═══  Pricing Section  ═══ */}
      <section className="relative py-20 md:py-32">
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] left-[8%] w-[500px] h-[500px] rounded-full bg-doit-teal/[0.025] blur-[140px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-doit-deep-blue/[0.04] blur-[120px]" />
        </div>

        <div
          ref={gridRef}
          className="max-w-[1280px] mx-auto px-6 md:px-14 lg:px-20 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`
                  pricing-card group relative rounded-3xl border transition-all duration-500
                  hover:-translate-y-2 hover:shadow-[0_16px_60px_rgba(47,143,179,0.1)] overflow-hidden
                  flex flex-col
                  ${
                    tier.popular
                      ? 'bg-gradient-to-b from-doit-surface-elevated to-doit-surface border-doit-teal/30 shadow-[0_0_40px_rgba(47,143,179,0.08)]'
                      : 'bg-doit-surface border-white/5 hover:border-doit-teal/20'
                  }
                `}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-doit-teal to-transparent" />
                )}

                <div className="p-8 md:p-10 flex flex-col flex-1">
                  {/* Badge */}
                  {tier.popular && (
                    <span className="self-start px-4 py-1.5 rounded-full text-[10px] font-sans tracking-[2.5px] uppercase bg-doit-teal/15 text-doit-teal border border-doit-teal/20 mb-6">
                      Most Popular
                    </span>
                  )}

                  {/* Tier name */}
                  <h3 className="text-xs font-sans tracking-[3px] uppercase text-doit-stone/60 mb-4">
                    {tier.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-5">
                    <span className="text-[11px] font-sans tracking-[1.5px] uppercase text-doit-stone/40 block mb-1">
                      Starts From
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-4xl md:text-5xl font-serif tracking-[-2px] ${tier.popular ? 'text-doit-teal' : 'text-doit-white'}`}>
                        {tier.price}
                      </span>
                      <span className="text-sm text-doit-stone/50 font-sans tracking-wide">
                        {tier.unit}
                      </span>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-doit-stone text-[14px] leading-relaxed mb-8">
                    {tier.tagline}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-white/5 mb-7" />

                  {/* Features */}
                  <ul className="space-y-4 mb-10 flex-1">
                    {tier.features.map((feat, j) => (
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
                        tier.popular
                          ? 'bg-doit-teal text-doit-black hover:shadow-[0_0_36px_rgba(47,143,179,0.25)] hover:scale-[1.02]'
                          : 'border border-doit-teal/30 text-doit-white/80 hover:bg-doit-teal hover:text-doit-black hover:border-doit-teal hover:scale-[1.02]'
                      }
                    `}
                  >
                    {/* Ripple layer */}
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
