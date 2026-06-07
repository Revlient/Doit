import { useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

/* ─── Trust-strip data ─── */
const trustItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5Z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Quality Materials',
    desc: 'ISI-certified materials sourced from trusted manufacturers.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'On-time Delivery',
    desc: 'Milestone-driven schedules with committed handover dates.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 1v4M12 19v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M1 12h4M19 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: 'Transparent Pricing',
    desc: 'No hidden costs — itemized quotations from day one.',
  },
];

/* ─── Props ─── */
interface PackageLayoutProps {
  /** Breadcrumb segments after "Home / Packages /" */
  breadcrumbLabel: string;
  /** Hero headline */
  headline: string;
  /** Eyebrow tagline */
  tagline: string;
  /** Subtext paragraph */
  subtext: string;
  /** Hero background image URL */
  heroImage: string;
  /** Pricing section content */
  children: ReactNode;
}

export default function PackageLayout({
  breadcrumbLabel,
  headline,
  tagline,
  subtext,
  heroImage,
  children,
}: PackageLayoutProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  const prefersRM =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Hero parallax + reveal ── */
  useEffect(() => {
    if (prefersRM) return;
    const ctx = gsap.context(() => {
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 28,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
      const els = heroRef.current?.querySelectorAll('.pkg-hero-reveal');
      if (els?.length) {
        gsap.fromTo(
          els,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.1, delay: 0.15 }
        );
      }
    });
    return () => ctx.revert();
  }, [prefersRM]);

  /* ── Trust strip reveal ── */
  useEffect(() => {
    if (prefersRM) return;
    const ctx = gsap.context(() => {
      const items = trustRef.current?.querySelectorAll('.trust-item');
      if (items?.length) {
        gsap.fromTo(
          items,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: trustRef.current, start: 'top 82%' } }
        );
      }
    }, trustRef);
    return () => ctx.revert();
  }, [prefersRM]);

  return (
    <div className="min-h-screen bg-doit-black selection:bg-doit-teal/30 selection:text-white">
      <Navbar />

      {/* ═══════════  Hero  ═══════════ */}
      <div
        ref={heroRef}
        className="relative h-[60vh] md:h-[72vh] overflow-hidden flex items-center justify-center"
      >
        <div ref={heroBgRef} className="absolute inset-0 -top-[18%] -bottom-[18%] z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-doit-black via-doit-black/75 to-doit-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-doit-black/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.55)_90%)]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="pkg-hero-reveal flex items-center justify-center gap-2 text-[11px] font-sans tracking-[2.5px] uppercase text-doit-stone/50 mb-7">
            <Link to="/" className="hover:text-doit-teal transition-colors duration-300">Home</Link>
            <span className="text-doit-stone/30">/</span>
            <span className="text-doit-stone/50">Packages</span>
            <span className="text-doit-stone/30">/</span>
            <span className="text-doit-teal/70">{breadcrumbLabel}</span>
          </nav>

          {/* Eyebrow */}
          <span className="pkg-hero-reveal text-xs font-sans tracking-[0.2em] uppercase text-doit-teal mb-5 block">
            {tagline}
          </span>

          <h1 className="pkg-hero-reveal text-5xl md:text-7xl lg:text-[5.5rem] font-serif text-doit-white leading-[0.92] tracking-[-2.5px]">
            {headline}
          </h1>

          <p className="pkg-hero-reveal mt-7 text-doit-stone text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed">
            {subtext}
          </p>

          <div className="pkg-hero-reveal mt-9 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-doit-teal/25" />
            <span className="w-1.5 h-1.5 rounded-full bg-doit-teal/40" />
            <span className="h-px w-10 bg-doit-teal/25" />
          </div>
        </div>
      </div>

      {/* ═══════════  Pricing Cards (children)  ═══════════ */}
      {children}

      {/* ═══════════  Trust Strip  ═══════════ */}
      <section ref={trustRef} className="relative py-20 md:py-28 border-t border-white/5">
        <div className="max-w-[1920px] mx-auto px-6 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {trustItems.map((item, i) => (
              <div
                key={i}
                className="trust-item flex flex-col items-center text-center px-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-doit-teal/[0.08] border border-doit-teal/15 flex items-center justify-center text-doit-teal mb-5">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg text-doit-white mb-2 tracking-[-0.3px]">
                  {item.title}
                </h3>
                <p className="text-doit-stone text-sm leading-relaxed max-w-[260px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════  Footnote  ═══════════ */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-14 lg:px-20 pb-16">
        <p className="text-center text-[12px] text-doit-stone/40 tracking-wide font-sans">
          * Prices are indicative and subject to site conditions.
        </p>
      </div>

      <Footer />
    </div>
  );
}
