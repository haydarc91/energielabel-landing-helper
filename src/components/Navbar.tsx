
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddressSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store the entered values in local storage so they can be retrieved in the contact form
    if (postcode && houseNumber) {
      localStorage.setItem('epaSearchPostcode', postcode);
      localStorage.setItem('epaSearchHouseNumber', houseNumber);
      
      // Scroll to the contact form
      const contactForm = document.getElementById('contact');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
        
        // Focus the form after scrolling
        setTimeout(() => {
          const postcodeInput = document.getElementById('postcode');
          if (postcodeInput) {
            (postcodeInput as HTMLInputElement).focus();
          }
        }, 1000);
      }
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-8 lg:px-12',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <span className="font-bold text-xl md:text-2xl text-epa-green-dark">epawoninglabel.nl</span>
        </a>

        {/* Address Search Form - Desktop */}
        <div className="hidden lg:flex items-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 px-4 py-1 flex-grow max-w-md mx-4">
          <form onSubmit={handleAddressSearch} className="flex w-full gap-2 items-center">
            <div className="flex flex-col flex-1">
              <Label htmlFor="desktop-postcode" className="sr-only">Postcode</Label>
              <Input 
                id="desktop-postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Postcode"
                className="h-8 border-0 bg-transparent px-0 focus-visible:ring-0 text-sm w-full"
              />
            </div>
            
            <div className="flex flex-col w-24">
              <Label htmlFor="desktop-housenumber" className="sr-only">Huisnummer</Label>
              <Input 
                id="desktop-housenumber"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                placeholder="Huisnr."
                className="h-8 border-0 bg-transparent px-0 focus-visible:ring-0 text-sm w-full"
              />
            </div>
            
            <button 
              type="submit" 
              className="ml-auto bg-epa-green hover:bg-epa-green-dark text-white p-2 rounded-full transition-colors"
              aria-label="Zoek energielabel"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sm font-medium hover:text-epa-green transition-colors">Voordelen</a>
          <a href="#process" className="text-sm font-medium hover:text-epa-green transition-colors">Werkwijze</a>
          <a href="#service-area" className="text-sm font-medium hover:text-epa-green transition-colors">Werkgebied</a>
          <a href="#about" className="text-sm font-medium hover:text-epa-green transition-colors">Over Ons</a>
          <a href="#faq" className="text-sm font-medium hover:text-epa-green transition-colors">FAQ</a>
          <a 
            href="#contact" 
            className="button-transition bg-epa-green hover:bg-epa-green-dark text-white px-5 py-2 rounded-md text-sm font-medium"
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus-ring rounded-md p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[4rem] bg-white shadow-lg md:hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="pt-2 pb-4 px-4 space-y-1">
          {/* Mobile Address Search */}
          <form onSubmit={handleAddressSearch} className="bg-gray-50 rounded-lg p-4 mb-2">
            <p className="text-sm font-medium mb-2 flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-epa-green" /> 
              Check uw energielabel
            </p>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="mobile-postcode" className="sr-only">Postcode</Label>
                <Input 
                  id="mobile-postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="Postcode"
                  className="h-9 text-sm"
                />
              </div>
              <div className="w-24">
                <Label htmlFor="mobile-housenumber" className="sr-only">Huisnummer</Label>
                <Input 
                  id="mobile-housenumber"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  placeholder="Huisnr."
                  className="h-9 text-sm"
                />
              </div>
              <button 
                type="submit" 
                className="bg-epa-green hover:bg-epa-green-dark text-white px-3 rounded-md transition-colors flex items-center"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
          
          <a 
            href="#features" 
            className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Voordelen
          </a>
          <a 
            href="#process" 
            className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Werkwijze
          </a>
          <a 
            href="#service-area" 
            className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Werkgebied
          </a>
          <a 
            href="#about" 
            className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Over Ons
          </a>
          <a 
            href="#faq" 
            className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </a>
          <a 
            href="#contact" 
            className="block px-3 py-3 mt-4 text-center button-transition bg-epa-green hover:bg-epa-green-dark text-white rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
