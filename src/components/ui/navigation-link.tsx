
import React from 'react';
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
  
  // For regular links that aren't hash links
  if (!to.includes('#')) {
    return <Link to={to} className={className} onClick={(e) => {
      // Always scroll to top for regular page navigation
      window.scrollTo(0, 0);
      if (onClick) onClick();
    }}>{children}</Link>;
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
    return <Link to={`/${to}`} className={className} onClick={onClick}>{children}</Link>;
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
      return <Link to={to} className={className} onClick={onClick}>{children}</Link>;
    }
  }
  
  // Otherwise, use regular Link
  return <Link to={to} className={className} onClick={onClick}>{children}</Link>;
};

export default NavigationLink;
