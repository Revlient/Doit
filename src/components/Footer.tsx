
export default function Footer() {
  return (
    <footer className="bg-doit-black text-doit-white pt-20 pb-10 border-t border-doit-teal/10">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            
            {/* Brand Column */}
            <div className="md:col-span-4 flex flex-col justify-between h-full">
                <div>
                    <div className="mb-6">
                        <img 
                          src="/images/logo.png" 
                          alt="Doit Design & Interiors" 
                          className="h-16 md:h-20 w-auto object-contain"
                        />
                    </div>
                    <p className="text-doit-stone text-sm max-w-xs leading-relaxed font-light">
                        Elevating spaces through silence, texture, and timeless proportion.
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-2 md:col-start-6">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-teal block mb-6 opacity-80">Sitemap</span>
                <ul className="flex flex-col gap-3 font-serif text-lg">
                    <li><a href="/" className="hover:text-doit-teal transition-colors duration-300">Home</a></li>
                    <li><a href="/services" className="hover:text-doit-teal transition-colors duration-300">Services</a></li>
                    <li><a href="/packages/Civil Works" className="hover:text-doit-teal transition-colors duration-300">Civil Works</a></li>
                    <li><a href="/packages/Interior Works" className="hover:text-doit-teal transition-colors duration-300">Interior Works</a></li>
                    <li><a href="/work" className="hover:text-doit-teal transition-colors duration-300">Projects</a></li>
                    <li><a href="/#about" className="hover:text-doit-teal transition-colors duration-300">Studio</a></li>
                    <li><a href="/#process" className="hover:text-doit-teal transition-colors duration-300">Process</a></li>
                </ul>
            </div>

            {/* Socials */}
            <div className="md:col-span-2">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-teal block mb-6 opacity-80">Social</span>
                <ul className="flex flex-col gap-3 font-sans text-sm tracking-wide">
                    <li><a href="https://www.facebook.com/doitdesigninteriors" target="_blank" rel="noopener noreferrer" className="hover:text-doit-teal transition-colors duration-300">Facebook</a></li>
                    <li><a href="https://www.youtube.com/@doitdesignandinteriors" target="_blank" rel="noopener noreferrer" className="hover:text-doit-teal transition-colors duration-300">YouTube</a></li>
                    <li><a href="https://www.instagram.com/doitdesigninterior" target="_blank" rel="noopener noreferrer" className="hover:text-doit-teal transition-colors duration-300">Instagram</a></li>
                </ul>
            </div>

            {/* Contact / Newsletter */}
            <div className="md:col-span-3">
                 <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-teal block mb-6 opacity-80">Newsletter</span>
                 <form className="flex flex-col gap-4">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="bg-transparent border-b border-doit-teal/20 pb-2 text-doit-white focus:outline-none focus:border-doit-teal transition-colors text-sm placeholder:text-doit-stone/50 font-sans"
                    />
                    <button type="submit" className="text-xs uppercase tracking-widest text-left hover:text-doit-teal transition-colors pt-2">
                        Subscribe
                    </button>
                 </form>

                 <div className="mt-12">
                    <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-stone block mb-2 opacity-60">Location</span>
                    <p className="text-doit-stone text-sm font-light">
                        Vaikom,<br/>
                        Kottayam
                    </p>
                 </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-sans uppercase tracking-[0.15em] text-doit-stone/40 pt-8 border-t border-doit-teal/5">
            <span className="mb-4 md:mb-0">© 2026 DOIT Interiors. All Rights Reserved.</span>
            <div className="flex gap-8">
                <a href="#" className="hover:text-doit-teal transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-doit-teal transition-colors">Terms of Use</a>
            </div>
        </div>
      </div>
    </footer>
  );
}
