import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import BookNowDialog from './BookNowDialog';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookNowOpen, setIsBookNowOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About Us', to: '/about' },
    { name: 'Products', to: '/products' },
    { name: 'Gallery', to: '/gallery' },
    { name: 'Contact', to: '/contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-display font-bold text-gold">
                MEGASTAR
              </span>
              <span className={`text-sm ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
                Doors & Windows
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    `font-medium transition-colors ${isActive ? 'text-gold' : 'text-foreground hover:text-gold'}`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* CTA & Phone */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:18008896933"
                className={`flex items-center gap-2 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'
                  }`}
              >
                <Phone className="w-4 h-4" />
                <span className="font-semibold">1800-889-6933</span>
              </a>
              <Button
                onClick={() => setIsBookNowOpen(true)}
                className="bg-gold hover:bg-gold-light text-accent-foreground font-semibold"
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'
                }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-card border-t border-border animate-fade-in">
              <nav className="flex flex-col py-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-3 text-foreground transition-colors ${isActive ? 'text-gold' : 'hover:bg-muted hover:text-gold'}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div className="px-4 py-3 border-t border-border mt-2">
                  <a
                    href="tel:18008896933"
                    className="flex items-center gap-2 text-gold font-semibold"
                  >
                    <Phone className="w-4 h-4" />
                    1800-889-6933
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <BookNowDialog open={isBookNowOpen} onOpenChange={setIsBookNowOpen} />
    </>
  );
};

export default Header;
