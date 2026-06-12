import { WHATSAPP_URL, WHATSAPP_NUMBER } from '../config';

export default function LocationSection() {
  const socials = [
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      href: 'https://pinterest.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      ),
    },
    {
      name: 'Behance',
      href: 'https://behance.net',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
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

              {/* Google Maps Embed — Vaikom, Kottayam */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31475.16!2d76.38!3d9.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07c2e0c1e2e77d%3A0x5e7e11a82e2a3e1!2sVaikom%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '420px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DOIT Interiors Location — Vaikom, Kottayam"
                className="grayscale-[0.85] contrast-[1.1] brightness-[0.7] group-hover:grayscale-[0.3] group-hover:brightness-[0.85] transition-all duration-700"
              />

              {/* Map overlay label */}
              <div className="absolute bottom-4 left-4 z-10 px-4 py-2.5 rounded-xl bg-doit-black/80 backdrop-blur-md border border-doit-border flex items-center gap-3">
                <div className="w-2 h-2 bg-doit-teal rounded-full animate-pulse" />
                <span className="text-[11px] font-sans tracking-[2px] uppercase text-doit-white/80">
                  Vaikom, Kottayam
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
                    Vaikom, Kottayam<br />
                    Kerala, India
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
                  href="mailto:hello@doitinteriors.com"
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
                    <span className="text-sm md:text-[15px] font-sans tracking-wide">hello@doitinteriors.com</span>
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
                      <span className="text-doit-white/80 tracking-wide">9:00 AM – 6:00 PM</span>
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
