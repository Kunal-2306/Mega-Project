import Header from '@/components/Header';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const About = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <AboutSection />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default About;
