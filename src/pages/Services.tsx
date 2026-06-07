import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { WHATSAPP_URL } from '../config';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────── */
/*  Data                                         */
/* ───────────────────────────────────────────── */

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  anchor: string;
}

const services: ServiceItem[] = [
  {
    title: 'Architectural Designing',
    description:
      `From concept sketches to detailed construction drawings, our architects translate your vision into structurally sound, aesthetically compelling spaces that stand the test of time.`,
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop',
    anchor: '#architectural-designing',
  },
  {
    title: 'Civil Contracting',
    description:
      `We manage the complete civil construction lifecycle — foundations, structural framing, and finishing — with rigorous quality control and transparent timelines.`,
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop',
    anchor: '#civil-contracting',
  },
  {
    title: 'Interior Designing',
    description:
      `Our design team crafts immersive interiors that balance form and function — curating materials, lighting, and spatial flow to create rooms that feel effortlessly elevated.`,
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
    anchor: '#interior-designing',
  },
  {
    title: 'Interior Contracting',
    description:
      `Precision-driven execution of interior fit-outs, from false ceilings and modular kitchens to bespoke joinery — delivered on schedule with meticulous craftsmanship.`,
    image:
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2000&auto=format&fit=crop',
    anchor: '#interior-contracting',
  },
  {
    title: 'Renovations',
    description:
      `Breathe new life into existing spaces with thoughtful renovations that respect the original character while introducing modern comfort, efficiency, and style.`,
    image:
      'https://images.unsplash.com/photo-1585128792020-803d29415281?q=80&w=2000&auto=format&fit=crop',
    anchor: '#renovations',
  },
  {
    title: 'Landscaping',
    description:
      `We design outdoor environments that extend your living experience — blending hardscape, softscape, water features, and lighting into cohesive garden narratives.`,
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2000&auto=format&fit=crop',
    anchor: '#landscaping',
  },
  {
    title: 'Comprehensive Project Management',
    description:
      `End-to-end oversight of your project — coordinating architects, contractors, vendors, and timelines so you can focus on the excitement of seeing your space come alive.`,
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
    anchor: '#project-management',
  },
  {
    title: 'CCTV & Smart Solutions',
    description:
      `Integrate intelligent surveillance, automated lighting, climate control, and home automation systems that offer security, convenience, and energy efficiency.`,
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2000&auto=format&fit=crop',
    anchor: '#smart-solutions',
  },
  {
    title: 'Home Decoring',
    description:
      `The finishing layer — curated art, textiles, statement furniture, and decorative accents that inject personality and warmth into every corner of your home.`,
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop',
    anchor: '#home-decoring',
  },
];

/* ───────────────────────────────────────────── */
/*  Component                                    */
/* ───────────────────────────────────────────── */

export default function Services() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Hero parallax + text reveal ── */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Background parallax at 0.4× speed
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Hero text elements reveal
      const reveals = heroRef.current?.querySelectorAll('.hero-reveal');
      if (reveals?.length) {
        gsap.fromTo(
          reveals,
          { y: 55, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.1,
            delay: 0.15,
          }
        );
      }
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  /* ── Service card stagger per row ── */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (!cards?.length) return;

      // Group by rows of 3
      const rows: Element[][] = [];
      cards.forEach((card, i) => {
        const rowIdx = Math.floor(i / 3);
        if (!rows[rowIdx]) rows[rowIdx] = [];
        rows[rowIdx].push(card);
      });

      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 90, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: row[0],
              start: 'top 85%',
            },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  /* ── CTA fade-in ── */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!ctaRef.current) return;

      const inner = ctaRef.current.querySelectorAll('.cta-reveal');
      const sweep = ctaRef.current.querySelector('.cta-sweep');

      if (sweep) {
        gsap.fromTo(
          sweep,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.3,
            ease: 'expo.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' },
          }
        );
      }

      if (inner.length) {
        gsap.fromTo(
          inner,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
          }
        );
      }
    }, ctaRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-doit-black selection:bg-doit-teal/30 selection:text-white">
      <Navbar />

      {/* ═══════════════  Hero  ═══════════════ */}
      <div
        ref={heroRef}
        className="relative h-[65vh] md:h-[75vh] overflow-hidden flex items-center justify-center"
      >
        {/* Parallax background */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 -top-[20%] -bottom-[20%] z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2600&auto=format&fit=crop)',
            }}
          />
          {/* Layered overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-doit-black via-doit-black/75 to-doit-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-doit-black/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.55)_90%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="hero-reveal flex items-center justify-center gap-2 text-[11px] font-sans tracking-[2.5px] uppercase text-doit-stone/50 mb-8">
            <Link
              to="/"
              className="hover:text-doit-teal transition-colors duration-300"
            >
              Home
            </Link>
            <span className="text-doit-stone/30">/</span>
            <span className="text-doit-teal/70">Services</span>
          </nav>

          <h1 className="hero-reveal text-5xl md:text-7xl lg:text-[5.5rem] font-serif text-doit-white leading-[0.92] tracking-[-2.5px]">
            Our{' '}
            <span className="italic font-light text-doit-teal/70">
              Services
            </span>
          </h1>

          <p className="hero-reveal mt-7 text-doit-stone text-lg md:text-xl font-light max-w-lg mx-auto leading-relaxed">
            Comprehensive design and construction solutions tailored for you
          </p>

          {/* Decorative divider */}
          <div className="hero-reveal mt-10 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-doit-teal/25" />
            <span className="w-1.5 h-1.5 rounded-full bg-doit-teal/40" />
            <span className="h-px w-10 bg-doit-teal/25" />
          </div>
        </div>
      </div>

      {/* ═══════════════  Services Grid  ═══════════════ */}
      <section className="relative py-20 md:py-32">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-[550px] h-[550px] rounded-full bg-doit-teal/[0.025] blur-[140px]" />
          <div className="absolute bottom-[15%] right-[8%] w-[450px] h-[450px] rounded-full bg-doit-deep-blue/[0.04] blur-[120px]" />
          <div className="absolute top-[55%] left-[50%] w-[300px] h-[300px] rounded-full bg-doit-teal/[0.02] blur-[100px]" />
        </div>

        <div
          ref={gridRef}
          className="max-w-[1920px] mx-auto px-6 md:px-14 lg:px-20 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <article
                key={i}
                className="service-card group relative bg-doit-surface rounded-3xl border border-white/5 hover:border-doit-teal/25 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_56px_rgba(47,143,179,0.08)] overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.6] group-hover:brightness-[0.75]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-doit-surface via-doit-surface/25 to-transparent" />

                  {/* Number watermark */}
                  <span className="absolute bottom-3 right-5 text-[11px] font-sans tracking-[3px] uppercase text-doit-white/15 select-none pointer-events-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 md:p-9">
                  <h3 className="font-serif text-xl md:text-2xl text-doit-white mb-4 leading-snug tracking-[-0.3px] group-hover:text-doit-white/90 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-doit-stone text-[14px] leading-relaxed mb-7 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Arrow link */}
                  <a
                    href={service.anchor}
                    className="inline-flex items-center gap-3 text-sm tracking-[2px] uppercase text-doit-white/40 hover:text-doit-teal transition-colors duration-300 group/link"
                  >
                    Explore
                    <span className="inline-block h-px w-5 bg-current transition-all duration-300 group-hover/link:w-9" />
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1.5">
                      →
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════  CTA Strip  ═══════════════ */}
      <section ref={ctaRef} className="relative py-20 md:py-28 overflow-hidden">
        {/* Background sweep */}
        <div className="cta-sweep absolute inset-0 origin-left bg-gradient-to-r from-doit-surface via-doit-surface-alt/40 to-doit-surface" />

        <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-14 lg:px-20 text-center">
          <span className="cta-reveal text-xs font-sans tracking-[0.2em] uppercase text-doit-teal mb-5 block">
            Let's Build Together
          </span>

          <h2 className="cta-reveal text-3xl md:text-5xl lg:text-6xl font-serif text-doit-white leading-tight tracking-[-1.5px] max-w-2xl mx-auto">
            Ready to start your{' '}
            <span className="italic font-light text-doit-teal/70">
              project?
            </span>
          </h2>

          <p className="cta-reveal mt-5 text-doit-stone text-lg font-light max-w-md mx-auto">
            Share your vision and we'll craft a tailored plan with a free,
            no-obligation estimate.
          </p>

          <div className="cta-reveal mt-10">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-10 py-4 rounded-full border border-doit-teal/30 hover:bg-doit-teal hover:text-doit-black hover:border-doit-teal transition-all duration-500 text-sm font-medium tracking-[2.5px] uppercase text-doit-white/80 hover:shadow-[0_0_40px_rgba(47,143,179,0.2)] group"
            >
              Get a Free Estimate
              <span className="block w-2 h-2 bg-doit-teal rounded-full group-hover:bg-doit-black group-hover:animate-ping" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
