import { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/products';

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Products');

  const filteredProducts =
    activeCategory === 'All Products'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">
            Our Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
            Choose Your Perfect Door
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of premium steel doors and windows designed 
            to enhance security and elevate the aesthetics of your space.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? 'default' : 'outline'}
              className={
                activeCategory === category
                  ? 'bg-gold text-accent-foreground hover:bg-gold-light'
                  : 'text-foreground hover:bg-gold/10 hover:text-gold hover:border-gold'
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={`${product.code}-${index}`}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
