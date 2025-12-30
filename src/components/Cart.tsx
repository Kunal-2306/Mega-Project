import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { submitOrder, OrderData } from '@/services/orderService';


interface CartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Cart = ({ open, onOpenChange }: CartProps) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();
  const [isOrdering, setIsOrdering] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'upi'>('cash_on_delivery');
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return 'Name should only contain letters and spaces';
    }
    if (name.trim().length < 2) {
      return 'Name should be at least 2 characters';
    }
    return '';
  };

  const validateEmail = (email: string): string => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    const cleanedPhone = phone.replace(/[\s\-+]/g, '');
    if (!/^\d+$/.test(cleanedPhone)) {
      return 'Phone number should only contain numbers';
    }
    if (cleanedPhone.length < 10) {
      return 'Phone number should be at least 10 digits';
    }
    return '';
  };



  // ... (validation functions remain same)

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to cart before ordering",
        variant: "destructive",
      });
      return;
    }

    // Validate all fields
    const nameError = validateName(orderForm.name);
    const emailError = validateEmail(orderForm.email);
    const phoneError = validatePhone(orderForm.phone);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
    });

    // If there are any errors, don't submit
    if (nameError || emailError || phoneError) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before placing order.",
        variant: "destructive",
      });
      return;
    }

    setIsOrdering(true);

    try {
      // Prepare order data
      const orderData: OrderData = {
        name: orderForm.name.trim(),
        email: orderForm.email.trim() || undefined,
        phone: orderForm.phone.replace(/[\s\-+]/g, ''),
        address: orderForm.address.trim() || undefined,
        message: orderForm.message.trim() || undefined,
        payment_method: paymentMethod,
        items: cartItems.map((item) => ({
          name: item.name,
          code: item.code,
          category: item.category,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        total_items: getTotalItems(),
        total_price: getTotalPrice(),
      };

      // Submit order to backend
      await submitOrder(orderData);

      // Show success message
      toast({
        title: "Order placed successfully!",
        description: `Your order for ${getTotalItems()} item(s) has been received. We'll contact you soon.${orderForm.email.trim() ? ' A confirmation email has been sent.' : ''}`,
      });

      // Reset form and cart
      setOrderForm({ name: '', email: '', phone: '', address: '', message: '' });
      setErrors({ name: '', email: '', phone: '' });
      clearCart(false);
      onOpenChange(false);
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOrdering(false);
    }
  };



  const handleNameChange = (value: string) => {
    setOrderForm({ ...orderForm, name: value });
    if (errors.name) {
      setErrors({ ...errors, name: validateName(value) });
    }
  };

  const handleEmailChange = (value: string) => {
    setOrderForm({ ...orderForm, email: value });
    if (errors.email) {
      setErrors({ ...errors, email: validateEmail(value) });
    }
  };

  const handlePhoneChange = (value: string) => {
    setOrderForm({ ...orderForm, phone: value });
    if (errors.phone) {
      setErrors({ ...errors, phone: validatePhone(value) });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-display">Shopping Cart</SheetTitle>
          <SheetDescription>
            {cartItems.length === 0
              ? 'Your cart is empty'
              : `You have ${getTotalItems()} item(s) in your cart`}
          </SheetDescription>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            <p className="text-muted-foreground">No items in your cart</p>
            <Button onClick={() => onOpenChange(false)} variant="outline">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.code}
                  className="flex gap-4 p-4 border rounded-lg bg-card"
                >
                  <div className="relative w-20 h-24 flex-shrink-0 bg-secondary rounded overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.code}</p>
                        <p className="text-sm font-semibold text-gold mt-1">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.code)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.code, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.code, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-xs text-muted-foreground">₹{item.price.toLocaleString('en-IN')} each</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Form */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-lg">Order Information</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={orderForm.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={orderForm.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={orderForm.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Delivery address"
                    value={orderForm.address}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, address: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Any special requirements or notes"
                    value={orderForm.message}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, message: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-lg">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'cash_on_delivery' | 'upi')}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" />
                  <Label htmlFor="cash_on_delivery" className="cursor-pointer flex-1">
                    <div className="font-semibold">Cash on Delivery</div>
                    <div className="text-xs text-muted-foreground">Pay when you receive the product</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="cursor-pointer flex-1">
                    <div className="font-semibold">UPI Payment</div>
                    <div className="text-xs text-muted-foreground">Pay via UPI (Google Pay, PhonePe, Paytm)</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Order Summary */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Items:</span>
                <span className="font-semibold">{getTotalItems()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-gold">₹{getTotalPrice().toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        <SheetFooter className="flex-col sm:flex-row gap-2">
          {cartItems.length > 0 && (
            <>
              <Button
                variant="outline"
                onClick={() => clearCart()}
                className="w-full sm:w-auto"
              >
                Clear Cart
              </Button>
              <Button
                onClick={handleOrder}
                disabled={isOrdering}
                className="w-full sm:w-auto bg-gold hover:bg-gold-light text-accent-foreground"
              >
                {isOrdering ? 'Placing Order...' : `Place Order (${getTotalItems()} items)`}
              </Button>
            </>
          )}
        </SheetFooter>
      </SheetContent>


    </Sheet>
  );
};

export default Cart;

