
export default function HeroSignature() {
  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden px-4 md:px-12 bg-doit-black">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-doit-teal/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-doit-deep-blue/8 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center relative z-10">
        
        {/* Left: Headline & Text */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full z-10 relative order-2 lg:order-1">
          <h1 className="text-[14vw] lg:text-[10vw] leading-[0.85] font-serif text-doit-white tracking-tight mb-8">
            Timeless <br />
            <span className="italic font-light ml-[8vw] lg:ml-[6vw] text-doit-teal/70">Interiors</span>
          </h1>
          
          <div className="max-w-md ml-2 lg:ml-[8vw]">
            <p className="text-doit-stone text-sm md:text-base font-sans tracking-wide leading-relaxed">
              Designing spaces that balance form, function, and feeling. <br/>
              Curated for those who seek quiet luxury.
            </p>
          </div>
        </div>

        {/* Right: Statement Image */}
        <div className="lg:col-span-5 h-[50vh] lg:h-[80vh] w-full relative order-1 lg:order-2 lg:pr-16 mt-24 lg:mt-5">
            <div className="absolute inset-0 bg-doit-surface-alt/40 rounded-t-full rounded-b-[1000px] overflow-hidden border border-doit-teal/10">
                 {/* Masking the image with a unique shape */}
                 <div className="w-full h-full relative overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
                        alt="Signature Interior" 
                        className="w-full h-full object-cover contrast-[0.95] brightness-[0.7]"
                    />
                    {/* Teal overlay tint */}
                    <div className="absolute inset-0 bg-gradient-to-b from-doit-teal/5 to-doit-deep-blue/10 mix-blend-overlay"></div>
                 </div>
            </div>
        </div>

      </div>
    </section>
  );
}
