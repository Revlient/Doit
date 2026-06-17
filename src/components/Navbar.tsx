import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';
import { WHATSAPP_URL } from '../config';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

type NavLink = {
  name: string;
  href?: string;
  subLinks?: { name: string; href: string }[];
};

const navLinks: NavLink[] = [
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/services' },
  {
    name: 'Packages',
    subLinks: [
      { name: 'Civil Works', href: '/packages/Civil Works' },
      { name: 'Interior Works', href: '/packages/Interior Works' }
    ]
  },
  { name: 'Projects', href: '/work' },
  { name: 'What We Do', href: '/#process' },
  { name: 'Contact', href: '/#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLElement | null)[]>([]);
  const overlayLinksRef = useRef<(HTMLElement | null)[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const lenis = useLenis();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith('/#')) {
      const hash = href.substring(1);
      if (pathname === '/') {
        if (lenis) {
          const target = document.querySelector<HTMLElement>(hash);
          if (target) lenis.scrollTo(target, { offset: 0 });
        } else {
          document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.pushState(null, '', href);
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  // Magnetic Hover for Hamburger
  useEffect(() => {
    const hamburger = hamburgerRef.current;
    if (!hamburger) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hamburger.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;

      gsap.to(hamburger, {
        x,
        y,
        duration: 0.4,
        ease: 'power3.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(hamburger, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    hamburger.addEventListener('mousemove', handleMouseMove);
    hamburger.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      hamburger.removeEventListener('mousemove', handleMouseMove);
      hamburger.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Toggle Menu Animation - Premium Experience
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });

      tl.to(menuRef.current, {
        y: '0%',
        duration: 1.2,
      })
        .fromTo(
          overlayLinksRef.current,
          {
            y: 120,
            opacity: 0,
            rotateX: -20,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.1,
            stagger: 0.08,
          },
          '-=0.8'
        )
        .fromTo(
          '.social-link',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
          '-=0.6'
        );

    } else {
      document.body.style.overflow = '';

      const tl = gsap.timeline();
      tl.to(overlayLinksRef.current, {
        y: -80,
        opacity: 0,
        rotateX: 15,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.in'
      }).to(menuRef.current, {
        y: '-100%',
        duration: 0.9,
        ease: 'power4.in'
      }, '-=0.3');
    }
  }, [isOpen]);

  // Scroll Intelligence
  useEffect(() => {
    const showAnim = gsap.fromTo(
      navRef.current,
      { yPercent: -100 },
      {
        yPercent: 0,
        paused: true,
        duration: 0.45,
        ease: 'power3.inOut'
      }
    );

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        const currentScroll = self.scroll();

        // Direction-based hide/show
        if (self.direction === -1) {
          showAnim.play();
        } else if (currentScroll > 120) {
          showAnim.reverse();
        }

        // Background evolution
        if (currentScroll > 60) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-5 flex justify-between items-center transition-all duration-700",
          isScrolled
            ? "bg-doit-black/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl py-4"
            : "bg-transparent"
        )}
      >
        {/* Logo with subtle reveal */}
        <a
          href="/"
          className="group relative z-[101] flex items-center gap-3"
        >
          <div className="relative overflow-hidden">
            <img
              src="/images/logo.png"
              alt="Doit Design & Interiors"
              className="h-10 md:h-15 w-auto object-contain transition-all duration-500 group-hover:scale-115"
            />
          </div>
          <div className="hidden md:block text-[10px] font-mono tracking-[3px] text-doit-white/40 group-hover:text-doit-teal/70 transition-colors">
            EST 2018
          </div>
        </a>

        {/* Desktop Navigation - Elevated */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            link.subLinks ? (
              <div
                key={link.name}
                ref={el => { linksRef.current[i] = el; }}
                className="group relative px-1 py-2 text-sm font-medium tracking-[0.5px] text-doit-white/75 hover:text-white transition-all duration-300"
              >
                <div className="flex items-center gap-1.5 cursor-pointer">
                  <span className="relative inline-block transition-all duration-500 group-hover:-translate-y-3">
                    {link.name}
                  </span>
                  {/* Hover Reveal Layer */}
                  <span className="absolute left-1 text-doit-teal font-serif italic tracking-normal text-base translate-y-0 opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 transition-all duration-500 pointer-events-none">
                    {link.name}
                  </span>

                  <svg className="w-3.5 h-3.5 mb-0.5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                  <div className="w-48 bg-doit-surface-elevated border border-doit-border rounded-xl shadow-xl overflow-hidden py-2 flex flex-col">
                    {link.subLinks.map(sub => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        onClick={(e) => handleLinkClick(e, sub.href)}
                        className="px-5 py-3 text-sm text-doit-stone hover:text-doit-teal hover:bg-white/5 transition-colors duration-200 text-center"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href!)}
                ref={el => { linksRef.current[i] = el; }}
                className="group relative px-1 py-2 text-sm font-medium tracking-[0.5px] text-doit-white/75 hover:text-white transition-all duration-300 overflow-hidden"
              >
                {/* Primary Text */}
                <span className="relative inline-block transition-all duration-500 group-hover:-translate-y-3">
                  {link.name}
                </span>

                {/* Hover Reveal Layer */}
                <span className="absolute left-0 top-full text-doit-teal font-serif italic tracking-normal text-base translate-y-0 opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 transition-all duration-500 pointer-events-none">
                  {link.name}
                </span>

                {/* Underline accent */}
                <span className="absolute bottom-0 left-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-doit-teal to-transparent group-hover:w-full transition-all duration-700" />
              </a>
            )
          ))}
        </div>

        {/* Magnetic Hamburger */}
        <button
          ref={hamburgerRef}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-[101] relative w-11 h-11 flex items-center justify-center group"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <span
              className={cn(
                "absolute left-0 top-1/2 h-[1.5px] w-full bg-white transition-all duration-500",
                isOpen ? "rotate-45 top-1/2" : "-translate-y-1.5"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1/2 h-[1.5px] w-full bg-white transition-all duration-500",
                isOpen ? "opacity-0" : ""
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1/2 h-[1.5px] w-full bg-white transition-all duration-500",
                isOpen ? "-rotate-45 top-1/2" : "translate-y-1.5"
              )}
            />
          </div>
        </button>

        {/* Desktop "Let's Talk" Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-3 px-8 py-3.5 rounded-full border border-doit-teal/30 hover:border-doit-teal text-sm font-medium tracking-widest transition-all duration-500 hover:bg-doit-teal hover:text-doit-black group"
        >
          LET'S TALK
          <span className="block w-2 h-2 bg-doit-teal rounded-full group-hover:animate-ping" />
        </a>
      </nav>

      {/* Fullscreen Menu - Cinematic Experience */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-doit-black z-[90] translate-y-[-100%] flex flex-col overflow-hidden"
      >
        {/* Background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_0.5px,transparent_1px)] bg-[length:4px_4px] pointer-events-none" />

        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 pt-20">
          <div className="max-w-4xl mx-auto w-full space-y-2">
            {navLinks.map((link, i) => (
              <div key={link.name} className="overflow-hidden">
                {link.subLinks ? (
                  <div ref={el => { overlayLinksRef.current[i] = el; }} className="group block text-white hover:text-doit-teal transition-colors duration-500">
                    <span className="font-serif text-[13vw] md:text-[9vw] leading-[0.82] tracking-[-2.5px] inline-block transition-transform duration-700">
                      {link.name}
                    </span>
                    <div className="ml-8 mt-4 md:mt-6 flex flex-col gap-4">
                      {link.subLinks.map(sub => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          onClick={(e) => handleLinkClick(e, sub.href)}
                          className="font-sans text-xl md:text-2xl tracking-wider text-doit-stone hover:text-doit-teal transition-colors"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href!)}
                    ref={el => { overlayLinksRef.current[i] = el; }}
                    className="block font-serif text-[13vw] md:text-[9vw] leading-[0.82] tracking-[-2.5px] text-white hover:text-doit-teal transition-colors duration-500 cursor-pointer group"
                  >
                    <span className="inline-block group-hover:translate-x-3 transition-transform duration-700">
                      {link.name}
                    </span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t border-white/10 py-12 px-6 md:px-12 mt-auto">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-sm tracking-widest text-doit-stone">
              <a href="https://www.facebook.com/doitdesigninteriors" target="_blank" rel="noopener noreferrer" className="social-link hover:text-white transition-colors">FACEBOOK</a>
              <a href="https://www.youtube.com/@doitdesignandinteriors" target="_blank" rel="noopener noreferrer" className="social-link hover:text-white transition-colors">YOUTUBE</a>
              <a href="https://www.instagram.com/doitdesigninterior" target="_blank" rel="noopener noreferrer" className="social-link hover:text-white transition-colors">INSTAGRAM</a>
            </div>

            <div className="text-xs text-doit-stone/70 font-mono tracking-[2px]">
              © DOIT STUDIO 2026
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-xs uppercase tracking-widest border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-all"
            >
              CLOSE MENU
            </button>
          </div>
        </div>
      </div>
    </>
  );
}