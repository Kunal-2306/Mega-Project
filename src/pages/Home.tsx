import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Home = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <HeroSection />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Home;
