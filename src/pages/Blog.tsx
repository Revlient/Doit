import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────── */
/*  Data                                         */
/* ───────────────────────────────────────────── */

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  isDraft?: boolean;
  slug: string;
}

const allPosts: BlogPost[] = [
  {
    id: 1,
    title: 'How Does One Go About a Buying Furniture?',
    excerpt:
      `Navigating the world of bespoke furniture requires an eye for craft and an understanding of how materials age — here's where to begin your journey.`,
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2000&auto=format&fit=crop',
    category: 'Interior Tips',
    date: 'May 28, 2026',
    author: 'Doit Studio',
    readTime: '5 min read',
    slug: 'buying-furniture',
  },
  {
    id: 2,
    title: 'How Does One Go About a Buying Furniture16?',
    excerpt:
      'From sourcing sustainable timber to selecting the perfect upholstery, discover the sixteen considerations that define a thoughtful purchase.',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop',
    category: 'How-To',
    date: 'May 15, 2026',
    author: 'Doit Studio',
    readTime: '8 min read',
    slug: 'buying-furniture-16',
  },
  {
    id: 3,
    title: 'tst',
    excerpt: '',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
    category: 'Design Ideas',
    date: 'Jun 1, 2026',
    author: 'Doit Studio',
    readTime: '2 min read',
    isDraft: true,
    slug: 'tst',
  },
  {
    id: 4,
    title: 'The Art of Layered Lighting in Living Spaces',
    excerpt:
      'Ambient, task, and accent — learn how three lighting layers can transform a flat room into a richly textured experience.',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop',
    category: 'Interior Tips',
    date: 'Apr 22, 2026',
    author: 'Doit Studio',
    readTime: '6 min read',
    slug: 'layered-lighting',
  },
  {
    id: 5,
    title: 'Minimalism vs. Maximalism: Finding Your Balance',
    excerpt:
      'Two philosophies, one home. Discover how restraint and abundance can coexist in spaces that feel authentically yours.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    category: 'Design Ideas',
    date: 'Apr 10, 2026',
    author: 'Doit Studio',
    readTime: '7 min read',
    slug: 'minimalism-maximalism',
  },
  {
    id: 6,
    title: 'Choosing Natural Stone for Kitchen Countertops',
    excerpt:
      `Marble, granite, or quartzite? A designer's guide to selecting stone that ages beautifully in the heart of your home.`,
    image:
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2000&auto=format&fit=crop',
    category: 'How-To',
    date: 'Mar 30, 2026',
    author: 'Doit Studio',
    readTime: '4 min read',
    slug: 'natural-stone-countertops',
  },
];

const categories = ['All', 'Interior Tips', 'Design Ideas', 'How-To'];
const POSTS_PER_PAGE = 6;

/* ───────────────────────────────────────────── */
/*  Component                                    */
/* ───────────────────────────────────────────── */

export default function Blog() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [filterVisible, setFilterVisible] = useState(true);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Filtered posts ── */
  const filtered =
    activeCategory === 'All'
      ? allPosts
      : allPosts.filter((p) => p.category === activeCategory);

  const visiblePosts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  /* ── Smart-hide filter bar ── */
  useEffect(() => {
    if (prefersReducedMotion) return;

    let lastScroll = 0;
    const onScroll = () => {
      const current = window.scrollY;
      if (current < 300) {
        setFilterVisible(true);
      } else if (current > lastScroll) {
        setFilterVisible(false); // scrolling down
      } else {
        setFilterVisible(true); // scrolling up
      }
      lastScroll = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [prefersReducedMotion]);

  /* ── Hero parallax ── */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }

      // Hero text reveal
      const headingEls = heroRef.current?.querySelectorAll('.blog-hero-reveal');
      if (headingEls?.length) {
        gsap.fromTo(
          headingEls,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.1,
            delay: 0.2,
          }
        );
      }
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  /* ── Card stagger on scroll ── */
  const animateCards = useCallback(() => {
    if (prefersReducedMotion) return;

    const cards = gridRef.current?.querySelectorAll('.blog-card');
    if (!cards?.length) return;

    cards.forEach((card, i) => {
      if ((card as HTMLElement).dataset.animated === '1') return;
      (card as HTMLElement).dataset.animated = '1';

      gsap.fromTo(
        card,
        { y: 80, opacity: 0, rotateX: -5 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: 'expo.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: card, start: 'top 88%' },
        }
      );
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    // Small delay so DOM is ready after filter/load-more changes
    const id = setTimeout(animateCards, 60);
    return () => clearTimeout(id);
  }, [activeCategory, visibleCount, animateCards]);

  /* ── Category change ── */
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(POSTS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-doit-black selection:bg-doit-teal/30 selection:text-white">
      <Navbar />

      {/* ─────────── Hero ─────────── */}
      <div ref={heroRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
        {/* Parallax background */}
        <div ref={heroBgRef} className="absolute inset-0 -top-[15%] -bottom-[15%] z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2400&auto=format&fit=crop)',
            }}
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-doit-black via-doit-black/80 to-doit-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-doit-black/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_90%)]" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <span className="blog-hero-reveal text-xs font-sans tracking-[0.2em] uppercase text-doit-teal mb-5 block">
            Latest Blog
          </span>
          <h1 className="blog-hero-reveal text-5xl md:text-7xl lg:text-8xl font-serif text-doit-white leading-[0.92] tracking-[-2px]">
            Your guide to{' '}
            <span className="italic font-light text-doit-teal/70">
              inspired interiors
            </span>
          </h1>
          <p className="blog-hero-reveal mt-7 text-doit-stone text-lg md:text-xl font-light max-w-md mx-auto">
            Stories, guides, and ideas from the Doit studio.
          </p>
        </div>
      </div>

      {/* ─────────── Filter Bar (sticky + smart hide) ─────────── */}
      <div
        ref={filterRef}
        className="sticky top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.62,0.05,0.01,0.99)]"
        style={{ transform: filterVisible ? 'translateY(0)' : 'translateY(-100%)' }}
      >
        <div className="bg-doit-black/90 backdrop-blur-2xl border-b border-white/5">
          <div className="max-w-[1920px] mx-auto px-6 md:px-14 lg:px-20 py-4 flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`
                  flex-shrink-0 px-5 py-2 rounded-full text-xs font-sans tracking-[2px] uppercase transition-all duration-400 border
                  ${
                    activeCategory === cat
                      ? 'bg-doit-teal text-doit-black border-doit-teal shadow-[0_0_20px_rgba(47,143,179,0.15)]'
                      : 'bg-transparent text-doit-stone border-doit-border hover:border-doit-border-hover hover:text-doit-white'
                  }
                `}
              >
                {cat}
              </button>
            ))}

            {/* Post count */}
            <span className="ml-auto flex-shrink-0 text-[11px] font-sans tracking-[2px] text-doit-stone/40 uppercase hidden md:block">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* ─────────── Card Grid ─────────── */}
      <main className="max-w-[1920px] mx-auto px-6 md:px-14 lg:px-20 py-16 md:py-24">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              className="blog-card group relative bg-doit-surface rounded-3xl border border-white/5 hover:border-doit-teal/25 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_48px_rgba(47,143,179,0.08)] overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06] brightness-[0.65] group-hover:brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-doit-surface via-doit-surface/30 to-transparent" />

                {/* Category tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-[10px] font-sans tracking-[2px] uppercase bg-doit-black/60 backdrop-blur-sm text-doit-teal border border-doit-teal/15 rounded-full">
                    {post.category}
                  </span>
                </div>

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
                {/* Meta */}
                <div className="flex items-center gap-4 mb-4 text-[11px] font-sans tracking-[1.5px] text-doit-stone/50 uppercase">
                  {/* Author avatar placeholder */}
                  <div className="w-6 h-6 rounded-full bg-doit-teal/15 border border-doit-teal/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[8px] text-doit-teal font-medium">D</span>
                  </div>
                  <span>{post.author}</span>
                  <span className="w-1 h-1 rounded-full bg-doit-stone/30" />
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-xl md:text-2xl text-doit-white mb-4 leading-snug tracking-[-0.3px] group-hover:text-doit-white/90 transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-doit-stone text-[14px] leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[11px] font-sans tracking-[1.5px] text-doit-stone/40 uppercase">
                    {post.readTime}
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs tracking-[2px] uppercase text-doit-white/50 hover:text-doit-teal transition-colors duration-300 group/link"
                  >
                    Read More
                    <span className="inline-block h-px w-4 bg-current transition-all duration-300 group-hover/link:w-7" />
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1 text-sm">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-16 md:mt-20">
            <button
              onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
              className="px-12 py-4 border border-doit-teal/30 hover:bg-doit-teal hover:text-doit-black hover:border-doit-teal transition-all duration-500 rounded-full text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(47,143,179,0.2)] text-doit-white/80"
            >
              Load More Articles
            </button>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-doit-stone text-lg font-light">
              No articles found in this category yet.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
