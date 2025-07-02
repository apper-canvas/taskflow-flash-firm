import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-float focus:ring-primary-500',
    secondary: 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 border border-gray-200 focus:ring-gray-500',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-lg hover:shadow-float focus:ring-accent-500',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:ring-gray-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-float focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {loading && (
        <ApperIcon 
          name="Loader2" 
          className="w-4 h-4 mr-2 animate-spin" 
        />
      )}
      {icon && !loading && iconPosition === 'left' && (
        <ApperIcon 
          name={icon} 
          className="w-4 h-4 mr-2" 
        />
      )}
      {children}
      {icon && !loading && iconPosition === 'right' && (
        <ApperIcon 
          name={icon} 
          className="w-4 h-4 ml-2" 
        />
      )}
    </>
  );

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;