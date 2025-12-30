import Header from '@/components/Header';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Gallery = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <GallerySection />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Gallery;
