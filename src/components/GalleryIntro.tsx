
export default function GalleryIntro() {
  return (
    <section id="work" className="py-24 px-6 md:px-16 bg-doit-white flex flex-col items-center text-center">
        <div className="max-w-2xl mx-auto">
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-stone mb-6 block">The Collection</span>
            <h2 className="text-4xl md:text-5xl font-serif text-doit-black mb-8 leading-tight">
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
