import { Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToProducts = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-slide-up">
            <span className="inline-block text-gold font-semibold text-sm md:text-base uppercase tracking-widest mb-4">
              Premium Steel Doors & Windows
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
              Enjoy Your <span className="text-gold">Door</span> + Window
              <br />
              With <span className="text-gold">Luxury</span> Experience
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl">
              India's trusted manufacturer of premium steel doors and aluminium windows.
              Elevate your spaces with our precision-engineered products.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={scrollToProducts}
                size="lg"
                className="bg-gold hover:bg-gold-light text-accent-foreground font-semibold px-8"
              >
                Explore Products
              </Button>
              <a href="https://wa.me/919996066077" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground/10 font-semibold px-8 bg-background"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  99960 66077
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4 border-t border-primary-foreground/20">
              <div>
                <div className="text-3xl font-bold text-gold">25+</div>
                <div className="text-sm text-primary-foreground/70">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold">10K+</div>
                <div className="text-sm text-primary-foreground/70">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold">100%</div>
                <div className="text-sm text-primary-foreground/70">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToProducts}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default HeroSection;
