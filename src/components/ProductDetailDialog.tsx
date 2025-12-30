import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Product } from '@/data/products';

interface ProductDetailDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDetailDialog = ({
  product,
  open,
  onOpenChange,
}: ProductDetailDialogProps) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative w-full aspect-[3/4] bg-secondary rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground">Product Code:</span>
              <span className="px-3 py-1 bg-charcoal text-primary-foreground text-sm font-semibold rounded">
                {product.code}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground">Category:</span>
              <span className="text-foreground">{product.category}</span>
            </div>
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <span className="text-sm font-semibold text-muted-foreground block mb-2">
                  Available Sizes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;

