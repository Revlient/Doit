import HeroSignature from '../components/HeroSignature';
import AboutPhilosophy from '../components/AboutPhilosophy';
import ProcessSection from '../components/ProcessSection';
import GalleryIntro from '../components/GalleryIntro';
import Gallery from '../components/Gallery/Gallery';
import ContactCTA from '../components/ContactCTA';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-doit-black selection:bg-doit-teal/30 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      <main>
        <HeroSignature />
        <AboutPhilosophy />
        <ProcessSection />
        <GalleryIntro />
        
        {/* Gallery modified to remove internal headers as we have an Intro section now */}
        <div className="opacity-100"> 
             {/* Limit to 6 items and show View More button */}
             <Gallery limit={6} showViewMore={true} />
        </div>

        <ContactCTA />
      </main>
      
      <Footer />
    </div>
  );
}
