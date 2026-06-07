import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  isDraft?: boolean;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'How Does One Go About a Buying Furniture?',
    excerpt:
      `Navigating the world of bespoke furniture requires an eye for craft and an understanding of how materials age — here's where to begin your journey.`,
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2000&auto=format&fit=crop',
    slug: 'buying-furniture',
  },
  {
    title: 'How Does One Go About a Buying Furniture16?',
    excerpt:
      `From sourcing sustainable timber to selecting the perfect upholstery, discover the sixteen considerations that define a thoughtful purchase.`,
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop',
    slug: 'buying-furniture-16',
  },
  {
    title: 'tst',
    excerpt: '',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
    isDraft: true,
    slug: 'tst',
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
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
      // Heading slide-up reveal
      if (headingRef.current) {
        const children = headingRef.current.querySelectorAll('.blog-heading-reveal');
        gsap.fromTo(
          children,
          { y: 70, opacity: 0, rotateX: -10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.15,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
          }
        );
      }

      // Staggered card fade-in-up
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 85, opacity: 0, rotateX: -6 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.05,
            ease: 'expo.out',
            delay: i * 0.12,
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative bg-doit-surface py-24 md:py-36 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-doit-teal/[0.03] blur-[130px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-doit-deep-blue/[0.05] blur-[110px]" />
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-14 lg:px-20 relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <span className="blog-heading-reveal text-xs font-sans tracking-[0.2em] uppercase text-doit-teal mb-5 block">
            Latest Blog
          </span>
          <h2 className="blog-heading-reveal text-4xl md:text-5xl lg:text-6xl font-serif text-doit-white leading-tight tracking-[-1.5px] max-w-3xl mx-auto">
            Your guide to{' '}
            <span className="italic font-light text-doit-teal/70">
              inspired interiors
            </span>
          </h2>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="group relative bg-doit-black rounded-3xl border border-white/5 hover:border-doit-teal/25 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_48px_rgba(47,143,179,0.08)] overflow-hidden"
            >
              {/* Image Area */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06] brightness-[0.7] group-hover:brightness-[0.8]"
                />
                {/* Soft overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-doit-black/70 via-doit-black/20 to-transparent" />

                {/* Draft badge */}
                {post.isDraft && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 text-[10px] font-sans tracking-[2px] uppercase bg-doit-surface-elevated/80 backdrop-blur-sm text-doit-stone border border-doit-teal/15 rounded-full">
                      Draft
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 md:p-9">
                <h3 className="font-serif text-xl md:text-2xl text-doit-white mb-4 leading-snug tracking-[-0.3px] group-hover:text-doit-white/90 transition-colors">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-doit-stone text-[14px] leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-3 text-sm tracking-[2px] uppercase text-doit-white/50 hover:text-doit-teal transition-colors duration-300 group/link"
                >
                  Read More
                  <span className="inline-block h-px w-5 bg-current transition-all duration-300 group-hover/link:w-9" />
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-14 md:mt-20">
          <Link
            to="/blog"
            className="inline-flex items-center gap-5 text-sm tracking-[3.5px] uppercase text-doit-white/75 hover:text-doit-white transition-colors duration-300 font-sans group"
          >
            View all articles
            <span className="inline-block h-px w-8 bg-current transition-all duration-300 group-hover:w-14" />
            <span className="text-[17px] transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
