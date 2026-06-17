/**
 * SocialBar — A sleek horizontal social media strip placed below the hero section.
 * Shows social links with icons in an elegant, minimal bar.
 */
export default function SocialBar() {
  const socials = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/doitdesigninteriors',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@doitdesignandinteriors',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/doitdesigninterior',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative bg-doit-black border-b border-doit-teal/8">
      <div className="max-w-[1920px] mx-auto px-6 md:px-16 py-5 flex items-center justify-between">
        {/* Left label */}
        <span className="text-[10px] md:text-[11px] font-sans uppercase tracking-[4px] text-doit-stone/40">
          Follow Us
        </span>

        {/* Social icons row */}
        <div className="flex items-center gap-2 md:gap-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-10 h-10 flex items-center justify-center rounded-full border border-doit-white/8 hover:border-doit-teal/40 hover:bg-doit-teal/5 text-doit-stone/50 hover:text-doit-teal transition-all duration-400"
              aria-label={`Follow us on ${s.name}`}
            >
              {s.icon}
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-doit-surface-elevated text-[9px] font-sans tracking-widest uppercase text-doit-teal whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                {s.name}
              </span>
            </a>
          ))}
        </div>

        {/* Right accent line */}
        <div className="hidden md:block w-24 h-px bg-gradient-to-r from-doit-teal/15 to-transparent" />
      </div>
    </section>
  );
}
