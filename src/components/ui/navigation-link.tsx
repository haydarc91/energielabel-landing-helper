import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, children, className = "", onClick }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Force scroll to top when certain routes are visited
  useEffect(() => {
    // This effect will run on component mount and when location changes
    if (location.pathname === '/werkgebieden') {
      window.scrollTo(0, 0);
      console.log('Scrolling to top for werkgebieden page');
    }
  }, [location.pathname]);
  
  // Handle all regular page navigation links (not hash links)
  const handleRegularNavigation = () => {
    // Always scroll to top for regular page navigation
    window.scrollTo(0, 0);
    console.log(`Regular link clicked: ${to}, forcefully scrolling to top`);
    if (onClick) onClick();
  };
  
  // For regular links that aren't hash links
  if (!to.includes('#')) {
    return (
      <Link 
        to={to} 
        className={className} 
        onClick={handleRegularNavigation}
      >
        {children}
      </Link>
    );
  }
  
  // If we're on the homepage and the link is a hash link
  if (isHomePage && to.startsWith('#')) {
    return (
      <a 
        href={to} 
        className={className} 
        onClick={(e) => {
          e.preventDefault(); // Always prevent default
          // Find the element
          const targetId = to.substring(1);
          const element = document.getElementById(targetId);
          
          console.log(`Looking for element with id: ${targetId}`);
          
          if (element) {
            console.log(`Scrolling to element: ${targetId}`);
            element.scrollIntoView({ behavior: 'smooth' });
            if (onClick) onClick();
          } else {
            console.error(`Element with id "${targetId}" not found`);
          }
        }}
      >
        {children}
      </a>
    );
  }
  
  // If we're not on the homepage and the link is a hash link, prepend with /
  if (!isHomePage && to.startsWith('#')) {
    return (
      <Link 
        to={`/${to}`} 
        className={className} 
        onClick={(e) => {
          console.log(`Non-homepage hash link clicked: ${to}, navigating to homepage with hash`);
          if (onClick) onClick();
        }}
      >
        {children}
      </Link>
    );
  }
  
  // For links that start with /#, handle specially
  if (to.startsWith('/#')) {
    if (isHomePage) {
      // On homepage, just use the hash part
      const hashPart = to.substring(1); // Remove the leading /
      return (
        <a 
          href={hashPart} 
          className={className} 
          onClick={(e) => {
            e.preventDefault();
            const targetId = hashPart.substring(1);
            const element = document.getElementById(targetId);
            
            console.log(`Looking for element with id: ${targetId}`);
            
            if (element) {
              console.log(`Scrolling to element: ${targetId}`);
              element.scrollIntoView({ behavior: 'smooth' });
              if (onClick) onClick();
            } else {
              console.error(`Element with id "${targetId}" not found`);
            }
          }}
        >
          {children}
        </a>
      );
    } else {
      // Not on homepage, navigate to homepage with hash
      return (
        <Link 
          to={to} 
          className={className} 
          onClick={(e) => {
            console.log(`Navigating to homepage with hash: ${to}`);
            if (onClick) onClick();
          }}
        >
          {children}
        </Link>
      );
    }
  }
  
  // Otherwise, use regular Link with scroll to top
  return (
    <Link 
      to={to} 
      className={className} 
      onClick={handleRegularNavigation}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
