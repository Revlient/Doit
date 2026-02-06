import React from 'react';

export default function ContactCTA() {
  return (
    <section id="contact" className="min-h-[70vh] w-full bg-doit-black flex flex-col items-center justify-center text-doit-white px-6 border-b border-doit-white/10">
      <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-10">
        <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-stone opacity-60">Inquiry</span>
        
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-none tracking-tight">
            Let’s Create <br/> <i className="font-serif italic opacity-70">Together</i>
        </h2>

        <p className="text-doit-stone text-lg md:text-xl font-light">
            Tell us about your space.
        </p>

        <button className="mt-8 mb-16 px-12 py-4 border border-white/20 hover:bg-white hover:text-doit-black transition-all duration-500 rounded-full text-sm uppercase tracking-widest">
            Get in Touch
        </button>
      </div>
    </section>
  );
}
