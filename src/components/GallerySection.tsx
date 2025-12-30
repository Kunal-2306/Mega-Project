import { useState } from 'react';
import { X } from 'lucide-react';

// Import door images for gallery
import paritosh77777 from '@/assets/doors/paritosh-double-doors-pm77777.webp';
import steelDoor from '@/assets/doors/steel-door.webp';
import kutumb3003 from '@/assets/doors/kutumb-double-doors-km3003.webp';
import auraGlass11 from '@/assets/doors/aura-glass-door-au11.webp';
import paritosh99999 from '@/assets/doors/paritosh-single-doors-pm99999.webp';
import smartFilm from '@/assets/doors/smart-film-pdlc.webp';

const galleryImages = [
  { src: paritosh77777, alt: 'Paritosh Double Doors PM77777' },
  { src: steelDoor, alt: 'Premium Steel Door' },
  { src: kutumb3003, alt: 'Kutumb Double Doors KM3003' },
  { src: auraGlass11, alt: 'Aura Glass Door AU11' },
  { src: paritosh99999, alt: 'Paritosh Single Doors PM99999' },
  { src: smartFilm, alt: 'Smart Film PDLC Glass' },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">
            Gallery
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
            Our Premium Installations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a look at some of our finest door installations across India
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer shadow-lg"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain bg-secondary transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-primary-foreground font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-charcoal/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-primary-foreground hover:text-gold"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
