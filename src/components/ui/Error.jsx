import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = "Something went wrong while loading your tasks.",
  onRetry,
  title = "Oops! We hit a snag"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-600" />
        </motion.div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>

        <div className="space-y-3">
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="primary"
              icon="RefreshCw"
              className="w-full"
            >
              Try Again
            </Button>
          )}
          
          <Button
            onClick={() => window.location.reload()}
            variant="ghost"
            icon="RotateCcw"
            className="w-full"
          >
            Refresh Page
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            If the problem persists, try refreshing the page or checking your internet connection.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Error;