
export default function HeroSignature() {
  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden px-4 md:px-12">
      <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center">
        
        {/* Left: Headline & Text */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full z-10 relative order-2 lg:order-1">
          <h1 className="text-[14vw] lg:text-[10vw] leading-[0.85] font-serif text-doit-black tracking-tight mb-8">
            Timeless <br />
            <span className="opacity-50 italic font-light ml-[8vw] lg:ml-[6vw]">Interiors</span>
          </h1>
          
          <div className="max-w-md ml-2 lg:ml-[8vw]">
            <p className="text-doit-charcoal/80 text-sm md:text-base font-sans tracking-wide leading-relaxed">
              Designing spaces that balance form, function, and feeling. <br/>
              Curated for those who seek quiet luxury.
            </p>
          </div>
        </div>

        {/* Right: Statement Image */}
        <div className="lg:col-span-5 h-[50vh] lg:h-[80vh] w-full relative order-1 lg:order-2 lg:pr-16 mt-24 lg:mt-5">
            <div className="absolute inset-0 bg-doit-beige/20 rounded-t-full rounded-b-[1000px] overflow-hidden">
                 {/* Masking the image with a unique shape */}
                 <div className="w-full h-full relative overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
                        alt="Signature Interior" 
                        className="w-full h-full object-cover grayscale-[0.2] contrast-[0.95]"
                    />
                 </div>
            </div>
        </div>

      </div>
    </section>
  );
}
