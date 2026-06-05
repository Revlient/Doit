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

      {/* Multi-layered Sophisticated Overlays — Creates depth & editorial feel */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Strong left-to-right gradient for text legibility + asymmetry */}
        <div className="absolute inset-0 bg-gradient-to-r from-doit-black via-doit-black/85 to-doit-black/25" />
        
        {/* Subtle teal + deep blue cinematic color grade */}
        <div className="absolute inset-0 bg-gradient-to-br from-doit-teal/[0.035] via-transparent to-doit-deep-blue/[0.08] mix-blend-overlay" />
        
        {/* Soft cinematic vignette for premium filmic quality */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.45)_92%)]" />
      </div>

      {/* Content Container — Editorial, spacious, asymmetric luxury layout */}
      <div className="relative z-20 h-full w-full max-w-[1920px] mx-auto px-6 md:px-16 flex items-center">
        <div className="max-w-[620px] lg:max-w-[680px] pt-8 md:pt-0">
          
          {/* Subtle pre-headline — adds exclusivity without cliché */}
          <div className="mb-5 md:mb-6">
            <span className="font-sans uppercase tracking-[4px] text-[10px] md:text-[11px] text-doit-teal/60">
              FOR THOSE WHO VALUE RESTRAINT
            </span>
          </div>

          {/* Hero Headline — Dramatic yet refined typography (Awwwards standard) */}
          <h1 className="font-serif text-doit-white text-[15.5vw] md:text-[11.2vw] lg:text-[8.2vw] leading-[0.81] tracking-[-0.048em] mb-7 md:mb-8">
            Timeless<br />
            <span className="italic font-light tracking-[-0.015em] text-doit-teal/70 ml-3 md:ml-6 lg:ml-10">
              Interiors
            </span>
          </h1>

          {/* Body copy — Elevated tracking, breathing room, quiet luxury tone */}
          <div className="max-w-[430px] ml-0.5">
            <p className="text-doit-stone text-[15px] md:text-[16.5px] leading-[1.7] tracking-[0.012em] font-sans">
              Designing spaces that balance form, function, and feeling.<br />
              Curated for those who seek quiet luxury.
            </p>
          </div>

          {/* Elegant accent line — refined detail */}
          <div className="mt-9 mb-8 w-14 h-px bg-gradient-to-r from-doit-teal/50 to-transparent" />

          {/* Premium CTA — Minimal, tactile, high-end studio interaction */}
          <a
            href="#work"
            className="group inline-flex items-center gap-x-5 text-sm tracking-[3.5px] uppercase text-doit-white/75 hover:text-doit-white transition-colors duration-300 font-sans"
          >
            Explore the collection
            <span className="inline-block h-px w-8 bg-current transition-all duration-300 group-hover:w-14" />
            <span className="text-[17px] transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </a>
        </div>
      </div>

      {/* Refined Scroll Indicator — Elegant & cinematic */}
      <div className="absolute bottom-9 md:bottom-11 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center text-doit-white/50">
        <div className="text-[10px] tracking-[3.5px] mb-3 font-sans">SCROLL TO BEGIN</div>
        <div className="relative h-9 w-px bg-white/25">
          <div className="absolute top-0 left-0 h-3 w-px bg-white/80 animate-[scrollIndicator_2.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}