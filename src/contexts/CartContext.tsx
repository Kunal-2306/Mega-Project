import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/data/products';
import { toast } from '@/hooks/use-toast';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productCode: string) => void;
  updateQuantity: (productCode: string, quantity: number) => void;
  clearCart: (showNotification?: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.code === product.code);

      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.code === product.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toast({
          title: "Added to cart",
          description: `${product.name} quantity updated`,
        });
        return updatedItems;
      } else {
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
        });
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productCode: string) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.code === productCode);
      if (item) {
        toast({
          title: "Removed from cart",
          description: `${item.name} removed from your cart`,
        });
      }
      return prevItems.filter((item) => item.code !== productCode);
    });
  };

  const updateQuantity = (productCode: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productCode);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.code === productCode ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = (showNotification = true) => {
    setCartItems([]);
    if (showNotification) {
      toast({
        title: "Cart cleared",
        description: "All items removed from cart",
      });
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

