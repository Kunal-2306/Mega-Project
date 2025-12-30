import { Shield, Award, Users, Factory } from 'lucide-react';


const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Precision-engineered steel and aluminum products built to last',
    },
    {
      icon: Award,
      title: '25+ Years Experience',
      description: 'Trusted expertise in door and window manufacturing since 1999',
    },
    {
      icon: Users,
      title: '10,000+ Happy Customers',
      description: 'Residential and commercial projects across India',
    },
    {
      icon: Factory,
      title: 'Advanced Manufacturing',
      description: 'State-of-the-art facilities ensuring superior quality',
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative space-y-4">

            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
                alt="Factory manufacturing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold text-accent-foreground p-6 rounded-lg shadow-xl hidden md:block">
              <div className="text-4xl font-bold">25+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-6">
              India's Trusted Steel Doors & Aluminium Windows Manufacturers
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Megastar Doors & Windows Pvt. Ltd. is redefining spaces with our
              precision-engineered steel and aluminum doors and windows. Based in
              Karnal, Haryana, we bring you a perfect fusion of durability,
              security, and aesthetic brilliance.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              From residential projects to commercial spaces, our advanced
              manufacturing facilities and expert craftsmanship ensure every
              product delivers long-lasting performance and timeless elegance.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
