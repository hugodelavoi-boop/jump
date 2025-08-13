import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  onClick
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ease-in-out min-h-[44px] min-w-[44px]';
  
  const variantClasses = {
    primary: 'bg-electric-blue text-white hover:bg-electric-blue/90 focus:ring-2 focus:ring-electric-blue/50',
    secondary: 'bg-orange text-white hover:bg-orange/90 focus:ring-2 focus:ring-orange/50',
    outline: 'bg-transparent border-2 border-electric-blue text-electric-blue hover:bg-electric-blue/10 focus:ring-2 focus:ring-electric-blue/50'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;