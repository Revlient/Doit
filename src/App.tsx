import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './pages/Home';
import Work from './pages/Work';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

function GSAPLenisIntegration() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Sync ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis with GSAP Ticker for perfect sync
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

function App() {
  const lenisOptions = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical' as const,
    gestureOrientation: 'vertical' as const,
    smoothWheel: true,
  };

  return (
    <ReactLenis root options={lenisOptions} autoRaf={false}>
      <GSAPLenisIntegration />
      <Router>
        <Preloader />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </Router>
    </ReactLenis>
  );
}

export default App;
