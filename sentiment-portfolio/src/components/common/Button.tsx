// src/components/common/Button.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  ariaLabel,
}) => {
 
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-300';
  
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  

  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    outline: 'border border-primary-600 text-primary-600 bg-transparent hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-dark-200',
    ghost: 'text-primary-600 bg-transparent hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-dark-200',
  };
  
 
  const stateClasses = {
    disabled: 'opacity-50 cursor-not-allowed',
    fullWidth: 'w-full',
  };
  
  
  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    disabled ? stateClasses.disabled : '',
    fullWidth ? stateClasses.fullWidth : '',
  ].join(' ');

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel || typeof children === 'string' ? children : undefined}
      aria-disabled={disabled || isLoading}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      transition={{ duration: 0.1 }}
    >
      {isLoading ? (
        <>
          <svg className="w-4 h-4 mr-2 -ml-1 text-current animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
