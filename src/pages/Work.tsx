import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery/Gallery';
import ContactCTA from '../components/ContactCTA';

export default function Work() {
  return (
    <div className="min-h-screen bg-doit-black selection:bg-doit-teal/30 selection:text-white">
      <Navbar />
      
      <main className="pt-40 md:pt-60">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 mb-20 md:mb-32 text-center">
             <span className="text-xs font-sans tracking-[0.2em] uppercase text-doit-teal mb-6 block">Archive</span>
             <h1 className="text-5xl md:text-8xl font-serif text-doit-white leading-[0.9]">
                All Projects
             </h1>
        </div>

        {/* Full Gallery - No Limit */}
        <Gallery />

        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
