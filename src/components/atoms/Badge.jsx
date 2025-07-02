import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'sm',
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full px-2.5 py-0.5 text-xs';
  
  const variants = {
    default: 'category-default',
    primary: 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 border border-primary-200',
    success: 'bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200',
    warning: 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 border border-yellow-200',
    error: 'bg-gradient-to-r from-red-100 to-red-50 text-red-700 border border-red-200',
    info: 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200',
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low',
    work: 'category-work',
    personal: 'category-personal',
    shopping: 'category-shopping',
    health: 'category-health',
    finance: 'category-finance'
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-sm'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;