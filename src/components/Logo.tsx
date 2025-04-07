
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact';
}

const Logo = ({ className = "", variant = "full" }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <div className="h-8 w-8 md:h-10 md:w-10 bg-epa-green rounded-md flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg md:text-xl">E</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-epa-green-dark flex items-center justify-center">
            <div className="h-1 w-3/5 bg-white rounded-full mt-0.5"></div>
          </div>
        </div>
        
        {variant === "full" && (
          <div className="absolute -top-1 -right-1 h-3 w-3 md:h-4 md:w-4 flex items-center justify-center">
            <div className="h-full w-full bg-epa-green-dark rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1 w-1 md:h-2 md:w-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
      
      {variant === "full" && (
        <div className="ml-2 flex flex-col">
          <span className="font-bold text-epa-green text-sm md:text-base leading-tight">EPA</span>
          <span className="font-medium text-gray-700 text-xs md:text-sm leading-tight">Woninglabel</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
