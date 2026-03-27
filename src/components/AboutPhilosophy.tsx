
export default function AboutPhilosophy() {
  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-16 bg-doit-surface relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-doit-deep-blue/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start relative z-10">
        
        {/* Left: Philosophy Text */}
        <div className="flex flex-col gap-8">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-teal">Philosophy</span>
          <h2 className="text-3xl md:text-5xl font-serif text-doit-white leading-tight">
            We believe interiors should feel lived-in, not styled.
          </h2>
          <p className="text-doit-stone text-sm md:text-base max-w-sm leading-relaxed">
            Every space is shaped by light, proportion, and intent. We strip away the unnecessary to reveal the essential character of a home.
          </p>
        </div>

        {/* Right: Supporting Image / Quote */}
        <div className="relative pt-12 md:pt-0">
            <div className="aspect-[4/5] md:aspect-[3/4] max-w-sm ml-auto bg-doit-surface-alt overflow-hidden relative border border-doit-teal/5">
                 <img 
                   src="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/at%2Fhouse%20tours%2F2023-House-Tours%2F2023-October%2Fmiranda-co%2Ftours-brooklyn-miranda-co-6"
                   alt="Design Detail"
                   className="w-full h-full object-cover opacity-80 brightness-[0.7]"
                 />
            </div>
            {/* Quote card — positioned outside overflow-hidden so it's not clipped */}
            <div className="absolute bottom-8 right-[calc(100%-2rem)] md:right-auto md:left-[calc(50%-200px)] bg-doit-surface-elevated p-6 max-w-[220px] border border-doit-teal/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hidden md:block z-10">
                <p className="font-serif italic text-lg text-doit-white/90">"Simplicity is the ultimate sophistication."</p>
            </div>
        </div>

      </div>
    </section>
  );
}
