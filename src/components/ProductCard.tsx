import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import ProductDetailDialog from './ProductDetailDialog';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { addToCart } = useCart();
  const { image, name, code, sizes = [], price } = product;

  return (
    <div
      className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-contain transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        
        {/* Overlay on hover - Eye button only */}
        <div
          className={`absolute inset-0 bg-charcoal/60 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button
            size="icon"
            className="bg-primary-foreground text-charcoal hover:bg-gold hover:text-accent-foreground rounded-full"
            onClick={() => setIsDetailOpen(true)}
          >
            <Eye className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Cart button - always visible */}
        <div className="absolute bottom-3 right-3">
          <Button
            size="icon"
            className="bg-gold text-accent-foreground hover:bg-gold-light rounded-full shadow-lg"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag className="w-5 h-5" />
          </Button>
        </div>

        {/* Product Code Badge */}
        <div className="absolute top-3 left-3 bg-charcoal text-primary-foreground px-3 py-1 text-xs font-semibold rounded">
          {code}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground text-lg mb-2 line-clamp-2">
          {name}
        </h3>
        
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {sizes.slice(0, 2).map((size) => (
              <span
                key={size}
                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="text-gold font-semibold text-lg">₹{price.toLocaleString('en-IN')}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-foreground hover:bg-gold hover:text-accent-foreground hover:border-gold"
            onClick={() => setIsDetailOpen(true)}
          >
            View Details
          </Button>
        </div>
      </div>

      {/* Product Detail Dialog */}
      <ProductDetailDialog
        product={product}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
};

export default ProductCard;
