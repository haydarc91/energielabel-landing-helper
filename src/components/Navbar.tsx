
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-epa-green transition-colors">Voordelen</a>
          <a href="#process" className="text-sm font-medium hover:text-epa-green transition-colors">Werkwijze</a>
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
