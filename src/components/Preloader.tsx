import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);
  const lenis = useLenis();

  useLayoutEffect(() => {
    // Check if we should skip the loader
    const hasLoaded = sessionStorage.getItem('doit_loaded');
    if (hasLoaded) {
      setEnabled(false);
      return;
    }

    // Disable lenis scrolling
    if (lenis) lenis.stop();
    // Also lock body scroll to be safe
    document.body.style.overflow = 'hidden';

    // Context for cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setEnabled(false);
          // Re-enable scrolling
          if (lenis) lenis.start();
          document.body.style.overflow = '';
          sessionStorage.setItem('doit_loaded', 'true');
        }
      });

      const letters = gsap.utils.toArray('.loader-char');
      
      // Check for reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        // Simple fade out for reduced motion
        tl.to(containerRef.current, { opacity: 0, duration: 1, delay: 0.5 });
      } else {
        // Full Animation Sequence
        
        // 1. Reveal Letters D O I T
        tl.fromTo(letters, 
          { 
            y: 60,
            opacity: 0,
            filter: 'blur(5px)' 
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.3
          }
        )
        // 2. Increase spacing between DO and IT
        .to(letters, {
            x: (i) => {
                // DO (indices 0,1) move slightly Left
                // IT (indices 2,3) move slightly Right
                if (i < 2) return -15; 
                return 15;
            },
            duration: 1.8,
            ease: 'power2.inOut',
        }, "-=0.8") // Overlap significantly with the reveal settling
        
        // 3. Transition to Website
        // Logo is at top-left. We want to scale down and move towards "Doit." logo position.
        // We simulate this by moving the text container towards top-left.
        .to(textContainerRef.current, {
           scale: 0.3,       
           y: '-45vh',       
           x: '-42vw',       
           duration: 1.2,
           ease: 'power4.inOut'
        })
        .to(containerRef.current, {
           yPercent: -100,  // Slide the background curtain up 
           duration: 1.2,
           ease: 'power3.inOut' 
        }, "<0.2") // Start 0.2s after text starts moving
        
        .to(textContainerRef.current, {
            opacity: 0,
            duration: 0.4
        }, ">-0.4"); 
      }

    }, containerRef);

    return () => {
        ctx.revert();
        document.body.style.overflow = ''; // Ensure cleanup
        if (lenis) lenis.start();
    };
  }, [lenis]);

  if (!enabled) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-doit-white flex items-center justify-center pointer-events-none"
    >
      <div ref={textContainerRef} className="overflow-visible flex items-center justify-center translate-y-0 translate-x-0">
        <h1 
            className="text-[12vw] md:text-[8vw] font-serif leading-none tracking-tighter text-doit-black flex relative"
        >
            <span className="loader-char inline-block">D</span>
            <span className="loader-char inline-block">O</span>
            <span className="loader-char inline-block">I</span>
            <span className="loader-char inline-block">T</span>
        </h1>
      </div>
    </div>
  );
}
