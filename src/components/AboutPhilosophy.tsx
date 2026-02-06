
export default function AboutPhilosophy() {
  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-16 bg-doit-white">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
        
        {/* Left: Philosophy Text */}
        <div className="flex flex-col gap-8">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-stone">Philosophy</span>
          <h2 className="text-3xl md:text-5xl font-serif text-doit-charcoal leading-tight">
            We believe interiors should feel lived-in, not styled.
          </h2>
          <p className="text-doit-stone text-sm md:text-base max-w-sm leading-relaxed">
            Every space is shaped by light, proportion, and intent. We strip away the unnecessary to reveal the essential character of a home.
          </p>
        </div>

        {/* Right: Supporting Image / Quote */}
        <div className="relative pt-12 md:pt-0">
            <div className="aspect-[4/5] md:aspect-[3/4] max-w-sm ml-auto bg-doit-beige overflow-hidden relative">
                 <img 
                   src="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/at%2Fhouse%20tours%2F2023-House-Tours%2F2023-October%2Fmiranda-co%2Ftours-brooklyn-miranda-co-6"
                   alt="Design Detail"
                   className="w-full h-full object-cover opacity-90"
                 />
                 <div className="absolute bottom-8 -left-8 bg-doit-white p-6 max-w-[200px] shadow-sm hidden md:block">
                     <p className="font-serif italic text-lg text-doit-charcoal">"Simplicity is the ultimate sophistication."</p>
                 </div>
            </div>
        </div>

      </div>
    </section>
  );
}
