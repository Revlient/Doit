
export default function GalleryIntro() {
  return (
    <section id="work" className="py-24 px-6 md:px-16 bg-doit-surface flex flex-col items-center text-center relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-doit-teal/3 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-2xl mx-auto relative z-10">
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-teal mb-6 block">The Collection</span>
            <h2 className="text-4xl md:text-5xl font-serif text-doit-white mb-8 leading-tight">
                Selected Works
            </h2>
            <p className="text-doit-stone text-base md:text-lg leading-relaxed font-light">
                A curation of spaces that define our aesthetic. <br className="hidden md:block"/>
                Where silence meets texture, and luxury is felt, not just seen.
            </p>
        </div>
    </section>
  );
}
