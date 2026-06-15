import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { WHATSAPP_URL } from '../config';

interface FloatingUIProps {
  onToggle?: (isOpen: boolean) => void;
}

export default function FloatingUI({ onToggle }: FloatingUIProps) {
  const mainBtnRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    onToggle?.(next);
  };

  /* ── Entrance animation for the main FAB ── */
  useEffect(() => {
    if (mainBtnRef.current) {
      gsap.fromTo(
        mainBtnRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)', delay: 1 }
      );
    }
  }, []);

  return (
    <div className="fixed bottom-5 md:bottom-7 right-5 md:right-7 z-[90] flex flex-col items-end gap-4">
      
      {/* ═══════════════════════════════════════
          EXPANDING MENU ITEMS
         ═══════════════════════════════════════ */}
      <div 
        className={`flex flex-col items-end gap-4 transition-all duration-300 origin-bottom ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* 1. Free Estimate */}
        <div className="flex items-center justify-end gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-doit-deep-blue border border-doit-teal/30 text-[12px] font-sans text-white whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-opacity duration-300">
            Free Estimate
          </span>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-doit-deep-blue text-white shadow-[0_4px_16px_rgba(36,74,124,0.35)] transition-all duration-300 hover:scale-110 hover:bg-doit-teal active:scale-95"
            aria-label="Get a free estimate"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </a>
        </div>

        {/* 2. Call Back */}
        <div className="flex items-center justify-end gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-doit-deep-blue border border-doit-teal/30 text-[12px] font-sans text-white whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-opacity duration-300">
            Call Back
          </span>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-doit-deep-blue text-white shadow-[0_4px_16px_rgba(36,74,124,0.35)] transition-all duration-300 hover:scale-110 hover:bg-doit-teal active:scale-95"
            aria-label="Call us"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
        </div>

        {/* 3. WhatsApp */}
        <div className="flex items-center justify-end gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-[#25D366] border border-[#25D366]/30 text-[12px] font-sans text-white whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-opacity duration-300">
            WhatsApp
          </span>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_24px_rgba(37,211,102,0.45)] active:scale-95"
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MAIN FAB BUTTON
         ═══════════════════════════════════════ */}
      <button 
        ref={mainBtnRef}
        onClick={handleToggle}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-doit-teal text-white shadow-[0_6px_24px_rgba(47,143,179,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 z-[91]"
        aria-label="Toggle contact menu"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300 rotate-90">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

    </div>
  );
}

