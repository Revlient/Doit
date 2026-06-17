import { WHATSAPP_URL, WHATSAPP_NUMBER } from '../config';

export default function LocationSection() {
  const socials = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/doitdesigninteriors',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@doitdesignandinteriors',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/doitdesigninterior',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: WHATSAPP_URL,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
  ];

  // Format phone for display: +91 98765 43210
  const phoneDisplay = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 7)} ${WHATSAPP_NUMBER.slice(7)}`;

  return (
    <section className="relative w-full bg-doit-surface py-20 md:py-28 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-doit-teal/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-doit-deep-blue/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-teal block mb-4 opacity-80">
            Find Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-none tracking-tight text-doit-white">
            Visit Our <i className="font-serif italic text-doit-teal/80">Studio</i>
          </h2>
        </div>

        {/* Main Grid: Map + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

          {/* ── Map Column ── */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden border border-doit-border group">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-doit-teal/30 rounded-tl-2xl z-10 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-doit-teal/30 rounded-br-2xl z-10 pointer-events-none" />

              {/* Google Maps Embed — Chelakkara, Thrissur */}
              <iframe
                src="https://maps.google.com/maps?q=Do+It+Design+%26+Interiors,+Venganellur,+Chelakkara,+Kerala+680586&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '420px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DOIT Interiors Location — Chelakkara, Thrissur"
                className="grayscale-[0.85] contrast-[1.1] brightness-[0.7] group-hover:grayscale-[0.3] group-hover:brightness-[0.85] transition-all duration-700"
              />

              {/* Map overlay label */}
              <div className="absolute bottom-4 left-4 z-10 px-4 py-2.5 rounded-xl bg-doit-black/80 backdrop-blur-md border border-doit-border flex items-center gap-3">
                <div className="w-2 h-2 bg-doit-teal rounded-full animate-pulse" />
                <span className="text-[11px] font-sans tracking-[2px] uppercase text-doit-white/80">
                  Chelakkara, Thrissur
                </span>
              </div>
            </div>
          </div>

          {/* ── Details Column ── */}
          <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">

            {/* Address Card */}
            <div className="luxury-card rounded-2xl p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-doit-teal/10 border border-doit-teal/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5 text-doit-teal">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-teal block mb-2 opacity-80">
                    Studio Address
                  </span>
                  <p className="text-doit-white text-base md:text-lg font-serif leading-relaxed">
                    DOIT Design & Interiors
                  </p>
                  <p className="text-doit-stone text-sm md:text-[15px] font-light leading-relaxed mt-1">
                    Venganellur shiva kshethram road.<br />
                    Chelakkara, Thrissur (Dt)<br />
                    Kerala. Pin - 680586
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-doit-teal/10 via-doit-teal/20 to-transparent my-6" />

              {/* Contact Details */}
              <div className="space-y-5">
                {/* Phone */}
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="group flex items-center gap-4 text-doit-stone hover:text-doit-teal transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-doit-teal/10 border border-doit-teal/20 flex items-center justify-center shrink-0 group-hover:bg-doit-teal/20 transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5 text-doit-teal">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-sans tracking-[2px] uppercase text-doit-stone/50 block mb-0.5">Phone</span>
                    <span className="text-sm md:text-[15px] font-sans tracking-wide">{phoneDisplay}</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:doitdesigninterior@gmail.com"
                  className="group flex items-center gap-4 text-doit-stone hover:text-doit-teal transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-doit-teal/10 border border-doit-teal/20 flex items-center justify-center shrink-0 group-hover:bg-doit-teal/20 transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5 text-doit-teal">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-sans tracking-[2px] uppercase text-doit-stone/50 block mb-0.5">Email</span>
                    <span className="text-sm md:text-[15px] font-sans tracking-wide">doitdesigninterior@gmail.com</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-doit-stone hover:text-[#25D366] transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5 text-[#25D366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-sans tracking-[2px] uppercase text-doit-stone/50 block mb-0.5">WhatsApp</span>
                    <span className="text-sm md:text-[15px] font-sans tracking-wide">Chat with us</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="luxury-card rounded-2xl p-8 md:p-10">
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-teal block mb-6 opacity-80">
                Connect With Us
              </span>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-12 h-12 flex items-center justify-center rounded-xl border border-doit-border hover:border-doit-teal/40 hover:bg-doit-teal/10 text-doit-stone/60 hover:text-doit-teal transition-all duration-400"
                    aria-label={`Follow us on ${s.name}`}
                  >
                    {s.icon}
                    {/* Tooltip */}
                    <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-doit-surface-elevated border border-doit-border text-[9px] font-sans tracking-widest uppercase text-doit-teal whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                      {s.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours (optional elegant touch) */}
            <div className="luxury-card rounded-2xl p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-doit-teal/10 border border-doit-teal/20 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5 text-doit-teal">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-teal block mb-3 opacity-80">
                    Business Hours
                  </span>
                  <div className="space-y-1.5">
                    <div className="flex justify-between gap-8 text-sm font-sans">
                      <span className="text-doit-stone/60">Mon – Sat</span>
                      <span className="text-doit-white/80 tracking-wide">9.30 AM - 5.30 PM</span>
                    </div>
                    <div className="flex justify-between gap-8 text-sm font-sans">
                      <span className="text-doit-stone/60">Sunday</span>
                      <span className="text-doit-white/80 tracking-wide">By Appointment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
