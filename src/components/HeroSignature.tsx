import { WHATSAPP_URL, WHATSAPP_NUMBER } from '../config';

export default function HeroSignature() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-doit-black">
      {/* Cinematic Video Background — Immersive & Slow */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-[0.88] contrast-[1.06]"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source
          src="https://videos.pexels.com/video-files/10135156/10135156-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Multi-layered Sophisticated Overlays — Enhanced left-side visibility */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Strong left-to-right gradient — INCREASED opacity for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-doit-black via-doit-black/92 via-20% to-doit-black/20" />

        {/* Subtle teal + deep blue cinematic color grade */}
        <div className="absolute inset-0 bg-gradient-to-br from-doit-teal/[0.035] via-transparent to-doit-deep-blue/[0.08] mix-blend-overlay" />

        {/* Soft cinematic vignette for premium filmic quality */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.45)_92%)]" />
      </div>

      {/* Content Container — Editorial, spacious, asymmetric luxury layout */}
      <div className="relative z-20 h-full w-full max-w-[1920px] mx-auto px-6 pr-6 md:px-16 flex items-center">
        <div className="max-w-full md:max-w-[620px] lg:max-w-[680px] pt-8 md:pt-0">

          {/* Subtitle — Delivering Excellence */}
          <div className="mb-5 md:mb-6">
            <span className="font-sans uppercase tracking-[4px] text-[10px] md:text-[11px] text-doit-teal/60">
              Delivering Excellence Through Design
            </span>
          </div>

          {/* Hero Headline — Dramatic yet refined typography — Both words use font-serif (Montserrat) */}
          <h1 className="font-serif text-doit-white text-[15.5vw] md:text-[11.2vw] lg:text-[8.2vw] leading-[0.81] tracking-[-0.048em] mb-7 md:mb-8">
            Timeless<br />
            <span className="font-serif  font-light tracking-[-0.015em] text-doit-deep-blue  ml-3 md:ml-6 lg:ml-10">
              Interiors
            </span>
          </h1>

          {/* Body copy */}
          <div className="max-w-[480px] ml-0.5">
            <p className="text-doit-stone text-[15px] md:text-[16.5px] leading-[1.7] tracking-[0.012em] font-sans">
              Creating functional, elegant, and timeless spaces through innovative design and quality execution.
            </p>
          </div>

          {/* Elegant accent line — refined detail */}
          <div className="mt-9 mb-8 w-14 h-px bg-gradient-to-r from-doit-teal/50 to-transparent" />

          {/* CTA Buttons Row — Explore + Contact */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {/* Premium CTA — Minimal, tactile, high-end studio interaction */}
            <a
              href="#work"
              className="group inline-flex items-center gap-x-5 text-sm tracking-[3.5px] uppercase text-doit-white/75 hover:text-doit-white transition-colors duration-300 font-sans"
            >
              Explore the collection
              <span className="inline-block h-px w-8 bg-current transition-all duration-300 group-hover:w-14" />
              <span className="text-[17px] transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </a>

            {/* Contact / CTC Button */}
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="group inline-flex items-center gap-x-3 px-6 py-3 rounded-full border border-doit-teal/30 hover:border-doit-teal text-sm tracking-[2px] uppercase text-doit-white/80 hover:text-doit-white hover:bg-doit-teal/10 transition-all duration-500 font-sans"
            >
              {/* Phone icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Contact Us
              <span className="block w-1.5 h-1.5 bg-doit-teal rounded-full group-hover:animate-ping" />
            </a>

            {/* WhatsApp Button */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-x-3 px-6 py-3 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/20 text-sm tracking-[2px] uppercase text-[#25D366]/90 hover:text-[#25D366] transition-all duration-500 font-sans"
            >
              {/* WhatsApp icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Social Media Vertical Strip — Desktop only (hidden on mobile to prevent overlap) */}
      <div className="hidden md:flex absolute right-10 top-1/2  -translate-y-1/2 z-30 flex-col items-center gap-5">
        {/* Vertical line above */}
        <div className="h-10 w-px bg-gradient-to-b from-transparent to-doit-white/20" />

        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-9 h-9 flex items-center justify-center rounded-full border border-doit-white/15 hover:border-doit-teal/60 hover:bg-doit-teal/10 transition-all duration-400"
          aria-label="Follow us on Instagram"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-doit-white/50 group-hover:text-doit-teal transition-colors duration-300">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-9 h-9 flex items-center justify-center rounded-full border border-doit-white/15 hover:border-doit-teal/60 hover:bg-doit-teal/10 transition-all duration-400"
          aria-label="Follow us on Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-doit-white/50 group-hover:text-doit-teal transition-colors duration-300">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-9 h-9 flex items-center justify-center rounded-full border border-doit-white/15 hover:border-doit-teal/60 hover:bg-doit-teal/10 transition-all duration-400"
          aria-label="Follow us on LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-doit-white/50 group-hover:text-doit-teal transition-colors duration-300">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>

        {/* Pinterest */}
        <a
          href="https://pinterest.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-9 h-9 flex items-center justify-center rounded-full border border-doit-white/15 hover:border-doit-teal/60 hover:bg-doit-teal/10 transition-all duration-400"
          aria-label="Follow us on Pinterest"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-doit-white/50 group-hover:text-doit-teal transition-colors duration-300">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
          </svg>
        </a>

        {/* Vertical line below */}
        <div className="h-10 w-px bg-gradient-to-b from-doit-white/20 to-transparent" />
      </div>

      {/* Social Media Horizontal Strip — Mobile only (above scroll indicator, clear of floating FAB) */}
      <div className="flex md:hidden absolute left-1/2 -translate-x-1/2 z-30 items-center gap-4">
        <div className="h-px w-6 bg-gradient-to-r from-transparent to-doit-white/20" />
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group w-8 h-8 flex items-center justify-center rounded-full border border-doit-white/15 hover:border-doit-teal/60 hover:bg-doit-teal/10 transition-all duration-400" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-doit-white/50 group-hover:text-doit-teal transition-colors">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group w-8 h-8 flex items-center justify-center rounded-full border border-doit-white/15 hover:border-doit-teal/60 hover:bg-doit-teal/10 transition-all duration-400" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-doit-white/50 group-hover:text-doit-teal transition-colors">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group w-8 h-8 flex items-center justify-center rounded-full border border-doit-white/15 hover:border-doit-teal/60 hover:bg-doit-teal/10 transition-all duration-400" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-doit-white/50 group-hover:text-doit-teal transition-colors">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="group w-8 h-8 flex items-center justify-center rounded-full border border-doit-white/15 hover:border-doit-teal/60 hover:bg-doit-teal/10 transition-all duration-400" aria-label="Pinterest">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-doit-white/50 group-hover:text-doit-teal transition-colors">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
          </svg>
        </a>
        <div className="h-px w-6 bg-gradient-to-r from-doit-white/20 to-transparent" />
      </div>

      {/* Refined Scroll Indicator — Elegant & cinematic */}
      <div className="absolute bottom-3 md:bottom-11 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center text-doit-white/50">
        <div className="text-[10px] tracking-[3.5px] mb-3 font-sans">SCROLL TO BEGIN</div>
        <div className="relative h-9 w-px bg-white/25">
          <div className="absolute top-0 left-0 h-3 w-px bg-white/80 animate-[scrollIndicator_2.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}