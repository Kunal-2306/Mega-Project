import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitInquiry } from '@/services/inquiryService';


const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
    // Remove spaces, dashes, and plus signs for validation
    const cleanedPhone = phone.replace(/[\s\-+]/g, '');
    if (!/^\d+$/.test(cleanedPhone)) {
      return 'Phone number should only contain numbers';
    }
    if (cleanedPhone.length < 10) {
      return 'Phone number should be at least 10 digits';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
    });

    // If there are any errors, don't submit
    if (nameError || emailError || phoneError) {
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
        message: formData.message.trim(),
      });



      toast({
        title: 'Message Sent!',
        description: "Thank you for contacting us. We'll get back to you soon. A confirmation email has been sent.",
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
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

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: ['99960 66077'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@megastardoors.in', 'sales@megastardoors.in'],
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['DC Colony, Rajinder nagar', 'Karnal, Haryana'],
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed'],
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products? Get in touch with our team and
            we'll help you find the perfect door solution.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-display font-semibold text-foreground mb-6">
              Contact Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="bg-muted p-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  {item.details.map((detail) => (
                    item.title === 'Call Us' ? (
                      <a
                        key={detail}
                        href="https://wa.me/919996066077"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground text-sm hover:text-gold transition-colors block"
                      >
                        {detail}
                      </a>
                    ) : (
                      <p key={detail} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    )
                  ))}
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.123456789!2d76.9897!3d29.6857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e6a1a1a1a1a1a%3A0x1a1a1a1a1a1a1a1a!2sDC%20Colony%2C%20Rajinder%20nagar%2C%20Karnal%2C%20Haryana!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Megastar Doors Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-display font-semibold text-foreground mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Name *
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className={`bg-background ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name}</p>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`bg-background ${errors.email ? 'border-destructive' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className={`bg-background ${errors.phone ? 'border-destructive' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Message
                </label>
                <Textarea
                  placeholder="Tell us about your requirements..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="bg-background"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold-light text-accent-foreground font-semibold"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
