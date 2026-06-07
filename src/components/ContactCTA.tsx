import { WHATSAPP_URL } from '../config';

export default function ContactCTA() {
  return (
    <section id="contact" className="min-h-[70vh] w-full bg-doit-black flex flex-col items-center justify-center text-doit-white px-6 border-b border-doit-teal/10 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-doit-deep-blue/8 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-10 relative z-10">
        <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-teal">Inquiry</span>
        
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-none tracking-tight text-doit-white">
            Let's Create <br/> <i className="font-serif italic text-doit-teal/80">Together</i>
        </h2>

        <p className="text-doit-stone text-lg md:text-xl font-light">
            Tell us about your space.
        </p>

        <a 
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 mb-16 px-12 py-4 border border-doit-teal/30 hover:bg-doit-teal hover:text-doit-black hover:border-doit-teal transition-all duration-500 rounded-full text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(47,143,179,0.2)] inline-block"
        >
            Get in Touch
        </a>
      </div>
    </section>
  );
}
