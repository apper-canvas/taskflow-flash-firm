import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-3 text-sm border border-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed';
  
  const errorClasses = error ? 'border-red-300 focus:ring-red-500' : '';
  const iconPadding = icon ? (iconPosition === 'left' ? 'pl-11' : 'pr-11') : '';
  
  const classes = `${baseClasses} ${errorClasses} ${iconPadding} ${className}`;

  return (
    <div className="relative">
      {icon && (
        <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0' : 'right-0'} flex items-center ${iconPosition === 'left' ? 'pl-3' : 'pr-3'} pointer-events-none`}>
          <ApperIcon 
            name={icon} 
            className={`w-5 h-5 ${error ? 'text-red-400' : 'text-gray-400'}`} 
          />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classes}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;