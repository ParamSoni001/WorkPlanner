import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50';
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-300',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-300',
    accent: 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-300',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-300',
    warning: 'bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-300',
    error: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-300',
    outline: 'bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-200',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-200',
  };
  
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${disabledClass}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;