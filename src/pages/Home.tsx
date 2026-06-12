import HeroSignature from '../components/HeroSignature';
import SocialBar from '../components/SocialBar';
import ServicesSection from '../components/ServicesSection';
import AboutPhilosophy from '../components/AboutPhilosophy';
import ProcessSection from '../components/ProcessSection';
import SelectedWorks from '../components/SelectedWorks';
import BlogSection from '../components/BlogSection';
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
        <SocialBar />
        <ServicesSection />
        <AboutPhilosophy />
        <ProcessSection />
        <SelectedWorks />
        <BlogSection />
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
