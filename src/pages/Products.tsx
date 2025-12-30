import Header from '@/components/Header';
import ProductsSection from '@/components/ProductsSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Products = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <ProductsSection />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Products;
