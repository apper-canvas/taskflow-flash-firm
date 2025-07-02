import React from 'react';
import { motion } from 'framer-motion';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`custom-checkbox ${className}`}
        {...props}
      />
    </motion.div>
  );
};

export default Checkbox;