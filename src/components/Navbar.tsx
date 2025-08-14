
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Home, ChevronRight } from 'lucide-react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import NavigationLink from './ui/navigation-link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on a landing page
  const isLandingPage = location.pathname.includes('/werkgebieden/');
  const isWerkgebiedenPage = location.pathname === '/werkgebieden';
  const isHomePage = location.pathname === '/';
  const isBlogPage = location.pathname.startsWith('/blog');
  
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

  // Reset mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 w-full px-6 md:px-8 lg:px-12',
        isScrolled
          ? 'bg-white shadow-sm'
          : 'bg-white'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavigationLink to="/" className="flex items-center">
          <span className="font-bold text-xl md:text-2xl text-epa-green-dark">epawoninglabel.nl</span>
        </NavigationLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isLandingPage && (
            <div className="flex items-center text-sm text-gray-500 mr-2">
              <NavLink to="/" className="hover:text-epa-green">Home</NavLink>
              <ChevronRight className="h-3 w-3 mx-1" />
              <NavLink to="/werkgebieden" className="hover:text-epa-green">Werkgebieden</NavLink>
              <ChevronRight className="h-3 w-3 mx-1" />
              <span className="text-epa-green-dark">{location.pathname.split('/').pop()?.charAt(0).toUpperCase() + location.pathname.split('/').pop()?.slice(1)}</span>
            </div>
          )}

          {isBlogPage ? (
            <>
              <NavigationLink to="/" className="flex items-center gap-1 text-sm font-medium hover:text-epa-green transition-colors">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </NavigationLink>
              <NavigationLink to="/#features" className="text-sm font-medium hover:text-epa-green transition-colors">
                Voordelen
              </NavigationLink>
              <NavigationLink to="/#process" className="text-sm font-medium hover:text-epa-green transition-colors">
                Werkwijze
              </NavigationLink>
              <NavigationLink to="/#faq" className="text-sm font-medium hover:text-epa-green transition-colors">
                FAQ
              </NavigationLink>
            </>
          ) : isWerkgebiedenPage ? (
            <>
               <NavigationLink to="/" className="flex items-center gap-1 text-sm font-medium hover:text-epa-green transition-colors">
                 <Home className="h-4 w-4" />
                 <span>Home</span>
               </NavigationLink>
              <NavigationLink to="/#features" className="text-sm font-medium hover:text-epa-green transition-colors">
                Voordelen
              </NavigationLink>
              <NavigationLink to="/#process" className="text-sm font-medium hover:text-epa-green transition-colors">
                Werkwijze
              </NavigationLink>
              <NavigationLink to="/#faq" className="text-sm font-medium hover:text-epa-green transition-colors">
                FAQ
              </NavigationLink>
            </>
          ) : isLandingPage ? (
            <>
               <NavigationLink to="/" className="flex items-center gap-1 text-sm font-medium hover:text-epa-green transition-colors">
                 <Home className="h-4 w-4" />
                 <span>Home</span>
               </NavigationLink>
               <NavigationLink to="/werkgebieden" className="text-sm font-medium hover:text-epa-green transition-colors">
                 Werkgebieden
               </NavigationLink>
              <NavigationLink to="/#features" className="text-sm font-medium hover:text-epa-green transition-colors">
                Voordelen
              </NavigationLink>
              <NavigationLink to="/#process" className="text-sm font-medium hover:text-epa-green transition-colors">
                Werkwijze
              </NavigationLink>
              <NavigationLink to="/#faq" className="text-sm font-medium hover:text-epa-green transition-colors">
                FAQ
              </NavigationLink>
            </>
          ) : (
            <>
              <NavigationLink to="#features" className="text-sm font-medium hover:text-epa-green transition-colors">
                Voordelen
              </NavigationLink>
              <NavigationLink to="#process" className="text-sm font-medium hover:text-epa-green transition-colors">
                Werkwijze
              </NavigationLink>
              <NavigationLink to="#service-area" className="text-sm font-medium hover:text-epa-green transition-colors">
                Werkgebied
              </NavigationLink>
              <NavigationLink to="#about" className="text-sm font-medium hover:text-epa-green transition-colors">
                Over Ons
              </NavigationLink>
               <NavigationLink to="#faq" className="text-sm font-medium hover:text-epa-green transition-colors">
                 FAQ
               </NavigationLink>
               <NavigationLink to="/blog" className="text-sm font-medium hover:text-epa-green transition-colors">
                 Blog
               </NavigationLink>
            </>
          )}
          <NavigationLink 
            to="#contact-section" 
            className="button-transition bg-epa-green hover:bg-epa-green-dark text-white px-5 py-2 rounded-md text-sm font-medium"
          >
            Contact
          </NavigationLink>
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
          {isLandingPage && (
            <div className="flex items-center flex-wrap text-sm text-gray-500 px-3 py-2">
              <NavLink 
                to="/" 
                className="hover:text-epa-green"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <ChevronRight className="h-3 w-3 mx-1" />
              <NavLink 
                to="/werkgebieden" 
                className="hover:text-epa-green"
                onClick={() => setMobileMenuOpen(false)}
              >
                Werkgebieden
              </NavLink>
              <ChevronRight className="h-3 w-3 mx-1" />
              <span className="text-epa-green-dark">{location.pathname.split('/').pop()?.charAt(0).toUpperCase() + location.pathname.split('/').pop()?.slice(1)}</span>
            </div>
          )}

          {isBlogPage ? (
            <>
               <NavigationLink 
                 to="/" 
                 className="flex items-center gap-2 px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                 onClick={() => setMobileMenuOpen(false)}
               >
                 <Home className="h-4 w-4" />
                 <span>Home</span>
               </NavigationLink>
              <NavigationLink 
                to="/#features" 
                className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Voordelen
              </NavigationLink>
              <NavigationLink 
                to="/#process" 
                className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Werkwijze
              </NavigationLink>
              <NavigationLink 
                to="/#faq" 
                className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </NavigationLink>
            </>
          ) : isWerkgebiedenPage ? (
            <>
               <NavigationLink 
                 to="/" 
                 className="flex items-center gap-2 px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                 onClick={() => setMobileMenuOpen(false)}
               >
                 <Home className="h-4 w-4" />
                 <span>Home</span>
               </NavigationLink>
              <NavigationLink 
                to="/#features" 
                className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Voordelen
              </NavigationLink>
              <NavigationLink 
                to="/#process" 
                className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Werkwijze
              </NavigationLink>
              <NavigationLink 
                to="/#faq" 
                className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </NavigationLink>
            </>
          ) : isLandingPage ? (
            <>
               <NavigationLink 
                 to="/" 
                 className="flex items-center gap-2 px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                 onClick={() => setMobileMenuOpen(false)}
               >
                 <Home className="h-4 w-4" />
                 <span>Home</span>
               </NavigationLink>
               <NavigationLink 
                 to="/werkgebieden" 
                 className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                 onClick={() => setMobileMenuOpen(false)}
               >
                 Werkgebieden
               </NavigationLink>
              <NavigationLink 
                to="/#features" 
                className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Voordelen
              </NavigationLink>
              <NavigationLink 
                to="/#process" 
                className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Werkwijze
              </NavigationLink>
              <NavigationLink 
                to="/#faq" 
                className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </NavigationLink>
            </>
          ) : (
            <>
              <NavigationLink 
                to="#features" 
                className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Voordelen
              </NavigationLink>
              <NavigationLink 
                to="#process" 
                className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Werkwijze
              </NavigationLink>
              <NavigationLink 
                to="#service-area" 
                className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Werkgebied
              </NavigationLink>
              <NavigationLink 
                to="#about" 
                className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Over Ons
              </NavigationLink>
               <NavigationLink 
                 to="#faq" 
                 className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                 onClick={() => setMobileMenuOpen(false)}
               >
                 FAQ
               </NavigationLink>
               <NavigationLink 
                 to="/blog" 
                 className="block px-3 py-3 text-base font-medium hover:bg-epa-green-light hover:text-epa-green-dark rounded-md"
                 onClick={() => setMobileMenuOpen(false)}
               >
                 Blog
               </NavigationLink>
            </>
          )}
          <NavigationLink 
            to="#contact-section" 
            className="block px-3 py-3 mt-4 text-center button-transition bg-epa-green hover:bg-epa-green-dark text-white rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </NavigationLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
