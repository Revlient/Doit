import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: string;
  title: string;
  descriptor: string;
}

const services: Service[] = [
  {
    icon: '⌂',
    title: 'Architectural Designing',
    descriptor: 'Sculpting structures where form meets intention — built to endure, designed to inspire.',
  },
  {
    icon: '⬡',
    title: 'Civil Contracting',
    descriptor: 'Precision-led construction with an unwavering commitment to quality and schedule.',
  },
  {
    icon: '◈',
    title: 'Interior Designing',
    descriptor: 'Curating atmospheres that balance elegance, comfort, and the art of living well.',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.set(cardRefs.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Section title animation
      const heading = sectionRef.current?.querySelector('.services-heading');
      if (heading) {
        gsap.fromTo(
          heading,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: heading, start: 'top 82%' },
          }
        );
      }

      // Staggered fade-in-up on each card
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 90, opacity: 0, rotateX: -6 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.05,
            ease: 'expo.out',
            delay: i * 0.12, // 0ms, 120ms, 240ms
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        );
      });

      // Subtle parallax on background layer
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-doit-black py-24 md:py-36 overflow-hidden"
    >
      {/* Parallax Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {/* Ambient glow orbs — matches AboutPhilosophy pattern */}
        <div className="absolute top-[10%] right-[12%] w-[500px] h-[500px] rounded-full bg-doit-teal/[0.04] blur-[140px]" />
        <div className="absolute bottom-[5%] left-[8%] w-[420px] h-[420px] rounded-full bg-doit-deep-blue/[0.06] blur-[120px]" />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(47,143,179,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(47,143,179,0.15) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-14 lg:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-teal mb-5 block">
            What We Do
          </span>
          <h2 className="services-heading text-4xl md:text-5xl lg:text-6xl font-serif text-doit-white leading-tight tracking-[-1.5px] max-w-3xl mx-auto">
            Innovative design services{' '}
            <span className="italic font-light text-doit-teal/70">
              for every need
            </span>
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="group relative bg-doit-surface p-10 md:p-12 rounded-3xl border border-white/5 hover:border-doit-teal/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(47,143,179,0.08)]"
            >
              {/* Background number watermark */}
              <span className="absolute top-4 right-6 text-[7rem] font-serif leading-none text-doit-deep-blue/[0.07] select-none pointer-events-none transition-colors duration-500 group-hover:text-doit-teal/[0.06]">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className="text-5xl md:text-6xl mb-8 text-doit-teal/60 group-hover:text-doit-teal transition-colors duration-500">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-[-0.5px] text-doit-white mb-5 leading-[1.1]">
                {service.title}
              </h3>

              {/* Descriptor */}
              <p className="text-doit-stone text-[15px] leading-relaxed mb-8 max-w-xs">
                {service.descriptor}
              </p>

              {/* Arrow Link */}
              <a
                href="/services"
                className="inline-flex items-center gap-4 text-sm tracking-[3px] uppercase text-doit-white/60 hover:text-doit-teal transition-colors duration-300 group/link"
              >
                <span className="h-px w-6 bg-current transition-all duration-300 group-hover/link:w-10" />
                <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                  →
                </span>
              </a>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-doit-teal/0 to-transparent group-hover:via-doit-teal/30 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
