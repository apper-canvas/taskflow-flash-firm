import React from 'react';
import Input from '@/components/atoms/Input';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search tasks...",
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        icon="Search"
        iconPosition="left"
        className="bg-white shadow-sm border-gray-200 focus:shadow-card"
      />
    </div>
  );
};

export default SearchBar;