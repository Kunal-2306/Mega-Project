import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { CartProvider, useCart } from "./contexts/CartContext";
import { useState } from 'react';
import Cart from './components/Cart';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const queryClient = new QueryClient();

const InnerApp = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="bg-gold text-accent-foreground shadow-lg"
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-white text-xs rounded-full px-2 py-0.5">{getTotalItems()}</span>
            )}
          </div>
        </Button>
      </div>

      <Cart open={cartOpen} onOpenChange={setCartOpen} />
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <InnerApp />
    </CartProvider>
  </QueryClientProvider>
);

export default App;
