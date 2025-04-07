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
  
  // If we're on the homepage and the link is a hash link
  if (isHomePage && to.startsWith('#')) {
    return (
      <a 
        href={to} 
        className={className} 
        onClick={(e) => {
          // Find the element
          const element = document.getElementById(to.substring(1));
          if (element) {
            e.preventDefault();
            element.scrollIntoView({ behavior: 'smooth' });
            if (onClick) onClick();
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
  
  // Otherwise, use regular Link
  return <Link to={to} className={className} onClick={onClick}>{children}</Link>;
};

export default NavigationLink;
