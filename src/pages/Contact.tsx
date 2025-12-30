import Header from '@/components/Header';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Contact = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <ContactSection />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Contact;
