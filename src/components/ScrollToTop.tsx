import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) {
      // Try to find the element and scroll to it
      const target = document.querySelector(hash);
      if (target) {
        // Small delay to ensure the DOM is ready and any page transitions have started
        setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(target, { offset: 0 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return;
      }
    }

    // Force instant scroll to top when no hash is present
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
    
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash, lenis]);

  return null;
}
