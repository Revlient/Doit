import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';
import { useLenis } from 'lenis/react'; // Note: Assuming lenis/react might be used, but since we use a custom hook, we'll rely on window scroll or just standard GSAP ScrollTrigger for show/hide.

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Process', href: '#process' },
  { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const overlayLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle Menu Animation
  useEffect(() => {
    if (isOpen) {
        // Prevent scrolling when menu is open
        document.body.style.overflow = 'hidden';

         const tl = gsap.timeline();
         
         tl.to(menuRef.current, {
             y: '0%',
             duration: 1,
             ease: 'power4.inOut'
         })
         .fromTo(overlayLinksRef.current, 
            { y: '100%', rotate: 5, opacity: 0 },
            { y: '0%', rotate: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' },
            '-=0.5'
         );

    } else {
        document.body.style.overflow = '';
        
        gsap.to(menuRef.current, {
            y: '-100%',
            duration: 0.8,
            ease: 'power3.inOut'
        });
    }
  }, [isOpen]);

  // Smart Hide/Show on Scroll
  useEffect(() => {
    const showAnim = gsap.from(navRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.4,
      ease: 'power3.out'
    }).progress(1);

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        // Determine scroll direction
        if (self.direction === -1) showAnim.play();
        else showAnim.reverse();

        // Check if scrolled past top threshold for background style
        if (self.scroll() > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    });
  }, []);

  return (
    <>
      <nav 
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 md:py-8 flex justify-between items-center transition-all duration-500",
          isScrolled ? "bg-doit-white/80 backdrop-blur-md text-doit-charcoal shadow-sm py-4 md:py-5" : "mix-blend-difference text-doit-white"
        )}
      >
        {/* Logo */}
        <a href="/" className="z-[101] group relative">
            <span className="font-serif text-3xl md:text-4xl tracking-tighter font-bold">
                Doit.
            </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link, i) => (
                <a 
                    key={link.name}
                    href={link.href}
                    ref={el => linksRef.current[i] = el}
                    className="group relative text-xs font-sans font-medium tracking-[0.2em] uppercase overflow-hidden"
                >
                    <span className="inline-block transition-transform duration-500 ease-luxury group-hover:-translate-y-full">
                        {link.name}
                    </span>
                    <span className="absolute left-0 top-0 inline-block transition-transform duration-500 ease-luxury translate-y-full group-hover:translate-y-0 text-doit-stone font-serif italic normal-case tracking-normal text-lg leading-3">
                        {link.name}
                    </span>
                </a>
            ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden z-[101] flex flex-col gap-[6px] w-8 group"
        >
            <span className={cn("w-full h-[1px] bg-current transition-transform duration-300", isOpen && "rotate-45 translate-y-[7px]")}></span>
            <span className={cn("w-full h-[1px] bg-current transition-opacity duration-300", isOpen && "opacity-0")}></span>
            <span className={cn("w-full h-[1px] bg-current transition-transform duration-300", isOpen && "-rotate-45 -translate-y-[7px]")}></span>
        </button>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-doit-charcoal z-[90] flex flex-col justify-center px-6 md:px-12 translate-y-[-100%]"
      >
        <div className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                    <a 
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        ref={el => overlayLinksRef.current[i] = el}
                        className="block text-[15vw] md:text-[8vw] leading-[0.9] font-serif text-doit-white hover:italic hover:text-doit-stone transition-all duration-300"
                    >
                        {link.name}
                    </a>
                </div>
            ))}
        </div>

        <div className="absolute bottom-12 left-6 md:left-12 flex gap-8 text-doit-stone text-xs tracking-widest uppercase font-sans">
             <a href="#">Instagram</a>
             <a href="#">LinkedIn</a>
             <a href="#">Contact</a>
        </div>
      </div>
    </>
  );
}
