
export default function Footer() {
  return (
    <footer className="bg-doit-black text-doit-white pt-20 pb-10 border-t border-doit-white/10">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            
            {/* Brand Column */}
            <div className="md:col-span-4 flex flex-col justify-between h-full">
                <div>
                    <h2 className="text-[12vw] md:text-5xl font-serif font-bold tracking-tighter leading-none mb-6">Doit.</h2>
                    <p className="text-doit-stone text-sm max-w-xs leading-relaxed font-light">
                        Elevating spaces through silence, texture, and timeless proportion.
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-2 md:col-start-6">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-stone block mb-6 opacity-60">Sitemap</span>
                <ul className="flex flex-col gap-3 font-serif text-lg">
                    <li><a href="#" className="hover:text-doit-stone transition-colors bg-left-bottom bg-gradient-to-r from-doit-white to-doit-white bg-[length:0%_1px] bg-no-repeat hover:bg-[length:100%_1px] transition-all duration-500 ease-out">Home</a></li>
                    <li><a href="#work" className="hover:text-doit-stone transition-colors bg-left-bottom bg-gradient-to-r from-doit-white to-doit-white bg-[length:0%_1px] bg-no-repeat hover:bg-[length:100%_1px] transition-all duration-500 ease-out">Work</a></li>
                    <li><a href="#about" className="hover:text-doit-stone transition-colors bg-left-bottom bg-gradient-to-r from-doit-white to-doit-white bg-[length:0%_1px] bg-no-repeat hover:bg-[length:100%_1px] transition-all duration-500 ease-out">Studio</a></li>
                    <li><a href="#process" className="hover:text-doit-stone transition-colors bg-left-bottom bg-gradient-to-r from-doit-white to-doit-white bg-[length:0%_1px] bg-no-repeat hover:bg-[length:100%_1px] transition-all duration-500 ease-out">Process</a></li>
                    <li><a href="#contact" className="hover:text-doit-stone transition-colors bg-left-bottom bg-gradient-to-r from-doit-white to-doit-white bg-[length:0%_1px] bg-no-repeat hover:bg-[length:100%_1px] transition-all duration-500 ease-out">Contact</a></li>
                </ul>
            </div>

            {/* Socials */}
            <div className="md:col-span-2">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-stone block mb-6 opacity-60">Social</span>
                <ul className="flex flex-col gap-3 font-sans text-sm tracking-wide">
                    <li><a href="#" className="hover:text-doit-stone transition-colors">Instagram</a></li>
                    <li><a href="#" className="hover:text-doit-stone transition-colors">Pinterest</a></li>
                    <li><a href="#" className="hover:text-doit-stone transition-colors">LinkedIn</a></li>
                    <li><a href="#" className="hover:text-doit-stone transition-colors">Behance</a></li>
                </ul>
            </div>

            {/* Contact / Newsletter */}
            <div className="md:col-span-3">
                 <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-stone block mb-6 opacity-60">Newsletter</span>
                 <form className="flex flex-col gap-4">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="bg-transparent border-b border-doit-white/20 pb-2 text-doit-white focus:outline-none focus:border-doit-white transition-colors text-sm placeholder:text-doit-stone/50 font-sans"
                    />
                    <button type="submit" className="text-xs uppercase tracking-widest text-left hover:text-doit-stone transition-colors pt-2">
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
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-sans uppercase tracking-[0.15em] text-doit-stone/40 pt-8 border-t border-doit-white/5">
            <span className="mb-4 md:mb-0">© 2026 DOIT Interiors. All Rights Reserved.</span>
            <div className="flex gap-8">
                <a href="#" className="hover:text-doit-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-doit-white transition-colors">Terms of Use</a>
            </div>
        </div>
      </div>
    </footer>
  );
}
