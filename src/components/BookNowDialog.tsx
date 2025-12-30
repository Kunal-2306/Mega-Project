import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitInquiry } from '@/services/inquiryService';


interface BookNowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookNowDialog = ({ open, onOpenChange }: BookNowDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    demand: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    demand: '',
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
    if (!email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
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

  const validateDemand = (demand: string): string => {
    if (!demand.trim()) {
      return 'Please describe your requirements';
    }
    if (demand.trim().length < 10) {
      return 'Please provide more details (at least 10 characters)';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const demandError = validateDemand(formData.demand);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      demand: demandError,
    });

    // If there are any errors, don't submit
    if (nameError || emailError || phoneError || demandError) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/[\s\-+]/g, ''),
        message: formData.demand.trim(),
      });



      toast({
        title: 'Booking Request Submitted!',
        description: "Thank you for your interest. We'll contact you soon to confirm your booking. A confirmation email has been sent.",
      });

      // Reset form
      setFormData({ name: '', email: '', phone: '', demand: '' });
      setErrors({ name: '', email: '', phone: '', demand: '' });
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit booking request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = (value: string) => {
    setFormData({ ...formData, name: value });
    if (errors.name) {
      setErrors({ ...errors, name: validateName(value) });
    }
  };

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value });
    if (errors.email) {
      setErrors({ ...errors, email: validateEmail(value) });
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
    if (errors.phone) {
      setErrors({ ...errors, phone: validatePhone(value) });
    }
  };

  const handleDemandChange = (value: string) => {
    setFormData({ ...formData, demand: value });
    if (errors.demand) {
      setErrors({ ...errors, demand: validateDemand(value) });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Book Now</DialogTitle>
          <DialogDescription>
            Fill in your details and we'll get back to you soon to confirm your booking.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="book-name">Your Name *</Label>
            <Input
              id="book-name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="book-phone">Contact Number *</Label>
            <Input
              id="book-phone"
              type="tel"
              placeholder="99960 66077"
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="book-email">Email Address *</Label>
            <Input
              id="book-email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="book-demand">Your Requirements / Demand *</Label>
            <Textarea
              id="book-demand"
              placeholder="Tell us about your requirements, preferred products, quantity, etc."
              rows={5}
              value={formData.demand}
              onChange={(e) => handleDemandChange(e.target.value)}
              className={errors.demand ? 'border-destructive' : ''}
            />
            {errors.demand && (
              <p className="text-sm text-destructive mt-1">{errors.demand}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gold hover:bg-gold-light text-accent-foreground font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Booking
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookNowDialog;

