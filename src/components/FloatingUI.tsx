import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { WHATSAPP_URL } from '../config';

/* ────────────────────────────────────────────
   Persistent floating UI elements:
   1. Free Estimate — fixed left, rotated 90°
   2. Call Back FAB — fixed bottom-right (upper)
   3. WhatsApp FAB — fixed bottom-right (lower)
   ──────────────────────────────────────────── */

export default function FloatingUI() {
  const estimateBtnRef = useRef<HTMLAnchorElement>(null);
  const callbackBtnRef = useRef<HTMLAnchorElement>(null);
  const whatsappBtnRef = useRef<HTMLAnchorElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const [compact, setCompact] = useState(false);

  /* ── Entrance animations ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'back.out(1.4)' } });

    // Free Estimate — slide in from left
    if (estimateBtnRef.current) {
      gsap.set(estimateBtnRef.current, { x: -80, opacity: 0 });
      tl.to(estimateBtnRef.current, { x: 0, opacity: 1, duration: 0.8 }, 1);
    }

    // WhatsApp — slide up
    if (whatsappBtnRef.current) {
      gsap.set(whatsappBtnRef.current, { y: 60, opacity: 0 });
      tl.to(whatsappBtnRef.current, { y: 0, opacity: 1, duration: 0.7 }, 1.5);
    }

    // Call Back — bounce in
    if (callbackBtnRef.current) {
      gsap.set(callbackBtnRef.current, { scale: 0, opacity: 0 });
      tl.to(callbackBtnRef.current, { scale: 1, opacity: 1, duration: 0.6 }, 2);
    }

    return () => { tl.kill(); };
  }, []);

  /* ── Pulse animation for Call Back (idle) ── */
  useEffect(() => {
    const el = callbackBtnRef.current;
    if (!el) return;

    const pulse = gsap.to(el, {
      boxShadow: '0 0 0 8px rgba(47,143,179,0.18)',
      duration: 1,
      repeat: -1,
      yoyo: true,
      repeatDelay: 2,
      ease: 'sine.inOut',
    });

    return () => { pulse.kill(); };
  }, []);

  /* ── Compact on scroll-down, expand on scroll-up ── */
  useEffect(() => {
    let lastScroll = 0;
    const onScroll = () => {
      const cur = window.scrollY;
      if (cur > 300 && cur > lastScroll) {
        setCompact(true);
      } else {
        setCompact(false);
      }
      lastScroll = cur;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════
          1. FREE ESTIMATE — Left Side Rotated
         ═══════════════════════════════════════ */}
      <a
        ref={estimateBtnRef}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="
          fixed left-0 top-1/2 -translate-y-1/2 z-[90] cursor-pointer
          group
        "
        aria-label="Get a free estimate"
      >
        {/* Desktop: rotated text label */}
        <span
          className="
            hidden md:flex items-center gap-2
            origin-center -rotate-90 translate-x-[-38%]
            px-5 py-2.5 rounded-b-xl
            bg-doit-deep-blue text-white text-[12px] font-sans tracking-[2.5px] uppercase
            shadow-[0_4px_20px_rgba(36,74,124,0.35)]
            transition-all duration-400
            group-hover:translate-x-[-32%] group-hover:shadow-[0_4px_28px_rgba(47,143,179,0.45)] group-hover:bg-doit-teal
          "
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 rotate-90">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          Free Estimate
        </span>

        {/* Mobile: small icon pill */}
        <span
          className="
            md:hidden flex items-center justify-center
            w-10 h-10 rounded-r-xl
            bg-doit-deep-blue text-white
            shadow-[0_4px_16px_rgba(36,74,124,0.35)]
            transition-all duration-300
            active:scale-95
          "
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </span>
      </a>

      {/* ═══════════════════════════════════════
          2. CALL BACK FAB — Bottom-right upper
         ═══════════════════════════════════════ */}
      <a
        ref={callbackBtnRef}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          fixed bottom-[120px] md:bottom-[110px] right-5 md:right-7 z-[90]
          flex items-center justify-center rounded-full
          bg-doit-deep-blue text-white
          shadow-[0_6px_24px_rgba(36,74,124,0.4)]
          transition-all duration-400
          hover:bg-doit-teal hover:scale-110 hover:shadow-[0_6px_32px_rgba(47,143,179,0.4)]
          active:scale-95
          ${compact ? 'w-11 h-11' : 'w-14 h-14'}
        `}
        aria-label="Call us on WhatsApp"
      >
        {/* Phone icon */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`transition-all duration-300 ${compact ? 'w-4.5 h-4.5' : 'w-5.5 h-5.5'}`}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>

      {/* ═══════════════════════════════════════
          3. WHATSAPP FAB — Bottom-right lowest
         ═══════════════════════════════════════ */}
      <a
        ref={whatsappBtnRef}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          fixed bottom-5 md:bottom-7 right-5 md:right-7 z-[90]
          group flex items-center justify-center rounded-full
          bg-[#25D366] text-white
          shadow-[0_6px_24px_rgba(37,211,102,0.35)]
          transition-all duration-400
          hover:scale-110 hover:shadow-[0_8px_32px_rgba(37,211,102,0.45)]
          active:scale-95
          ${compact ? 'w-11 h-11' : 'w-14 h-14'}
        `}
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp icon */}
        <svg viewBox="0 0 24 24" fill="currentColor" className={`transition-all duration-300 ${compact ? 'w-5 h-5' : 'w-6 h-6'}`}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Tooltip */}
        <span
          ref={tooltipRef}
          className="
            absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2
            px-3 py-1.5 rounded-lg
            bg-doit-surface-elevated border border-doit-border
            text-[11px] font-sans tracking-[1px] text-doit-white whitespace-nowrap
            opacity-0 -translate-x-2 pointer-events-none
            transition-all duration-300
            group-hover:opacity-100 group-hover:translate-x-0
            shadow-[0_4px_16px_rgba(0,0,0,0.4)]
          "
        >
          Chat with us
        </span>
      </a>

      {/* ── Keyframe for popover entrance ── */}
      <style>{`
        @keyframes fadeScaleIn {
          0% { opacity: 0; transform: scale(0.92) translateY(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}
